'use server'

import { z } from 'zod'

const userSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
  card_number: z.string().min(16).max(16),
  bank_account_no: z.string()
})

export async function registerUser(userData: unknown) {
  try {
    // Validate input
    const validatedData = userSchema.parse(userData)

    // Simulate database operation
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Here you would typically:
    // 1. Check if the user already exists
    // 2. Hash the password
    // 3. Store the user in the database
    // 4. Create a session or token

    console.log('User registered:', validatedData.username)

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors }
    }
    return { success: false, error: 'Registration failed' }
  }
}