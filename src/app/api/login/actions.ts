'use server'

import { z } from 'zod'
import { getSingleStoreConnection } from '../../lib/db';
import bcrypt from 'bcryptjs'


const loginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
})

export async function loginUser(userData: unknown) {
  try {
    // Validate input
    const { username, password } = loginSchema.parse(userData)
    const connection = await getSingleStoreConnection();
    if (!connection) {
        throw new Error('Failed to establish database connection');
    }
    
    // Simulate database lookup and password verification
    const [rows]: any = await connection.execute(
        'SELECT COUNT(*) as count FROM users WHERE username = ? and password = ?',
        [username,password]
      );
  
     
    if (username === 'user@example.com' && password === 'password123') {
      // Generate a session token (in a real app, use a secure method to generate tokens)
      const sessionToken = Math.random().toString(36).substring(2, 15)

      return { 
        success: true, 
        user: { 
          id: '1', 
          email:'user@example.com', 
          name: 'John Doe' 
        },
        sessionToken // Return the session token to be set in the cookie
      }
    } else {
      return { success: false, error: 'Invalid email or password' }
    }
  } catch (error) {
    console.error('Login error:', error)
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: 'Login failed' }
  }
}