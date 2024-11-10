'use server'

import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { getSingleStoreConnection } from '../../lib/db';

const userSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
  card_number: z.string().min(16).max(16),
  cvv: z.string(),
  card_expiry: z.string(),
  bank_account_no: z.string(),
  crypto_percentage: z.number(),
  charity_percentage: z.number()
})

export async function registerUser(userData: unknown) {
  try {
    // Validate input
    const validatedData = userSchema.parse(userData)

    // Simulate database operation
    const connection = await getSingleStoreConnection();
    if (!connection) {
        throw new Error('Failed to establish database connection');
    }

    // Here you would typically:
    // 1. Check if the user already exists
    // 2. Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(validatedData.password, salt)
   
    const [result]: any = await connection.execute(
      'INSERT INTO user_table (username, email, password, card_no, CVV, card_expiry, bank_account_no, crypto_percentage, charity_percentage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [validatedData.username, validatedData.email, hashedPassword,validatedData.card_number,validatedData.cvv,validatedData.card_expiry,validatedData.bank_account_no,validatedData.crypto_percentage,validatedData.charity_percentage]
    )

    return { success: true, userId: result.insertId }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: 'Registration failed' }
  }
}