import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key';
const JWT_EXPIRES_IN = '7d'; // 7 days

export interface JwtPayload {
  userId: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

// Generate JWT Token
export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

// Verify JWT Token
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
};

// Set JWT Token in HTTP-only cookie
export const setTokenCookie = (token: string) => {
  const cookieStore = cookies();
  
  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: true, // Always use secure in production
    sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    path: '/',
  });
};

// Remove JWT Token from cookies
export const removeTokenCookie = () => {
  const cookieStore = cookies();
  
  cookieStore.set('auth_token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 0, // Set to 0 to expire immediately
    path: '/',
  });
};

// Get JWT Token from cookies
export const getTokenFromCookies = (): string | undefined => {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;
  return token;
};
