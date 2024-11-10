'use server'

import { z } from 'zod'
import { getSingleStoreConnection } from '../../lib/db';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; 


const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
})

export async function loginUser(userData: unknown) {
  try {
    const { username, password } = loginSchema.parse(userData)
    const connection = await getSingleStoreConnection();
    if (!connection) {
        throw new Error('Failed to establish database connection');
    }

    const [rows]: any = await connection.execute(
        'SELECT password FROM user_table WHERE username = ? ',
        [username]
      );
    
    if(rows.length==0){
        return { error:"No user found" }
    }

    const isPasswordCorrect = await bcrypt.compare(password, rows[0].password);

    if (!isPasswordCorrect) {
        return { success: false, error: 'Invalid email or password' }
    }

      //const sessionToken = Math.random().toString(36).substring(2, 15)
      const sessionToken = jwt.sign(
        { username }, // Payload
        SECRET_KEY,   // Secret key
        { expiresIn: '1h' } // Options (e.g., expiry time)
      );
      return { 
        success: true, 
        user : username,
        sessionToken
      }
  } catch (error) {
    console.error('Login error:', error)
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: 'Login failed' }
  }
}