import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { loginUser } from './actions';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await loginUser(body);

    if (result.success) {
      // Set the cookie using the cookies() object
      cookies().set('session_token', result.sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      return NextResponse.json(
        { message: 'Login successful', user: result.user },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
