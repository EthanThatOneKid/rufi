import { NextResponse } from 'next/server'
import { registerUser } from './actions'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await registerUser(body)

    if (result.success) {
      return NextResponse.json({ message: 'User registered successfully' }, { status: 201 })
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}