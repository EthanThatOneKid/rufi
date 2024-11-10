import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Replace with your environment variable

export function decodeToken(token: string) {
  try {
    // Verify the token and decode the payload
    const decoded = jwt.verify(token, SECRET_KEY);
    
    // The decoded payload contains user information (e.g., username)
    return { success: true, decoded };
  } catch (error) {
    console.error('Token verification error:', error);
    return { success: false, error: 'Invalid or expired token' };
  }
}
