import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { apiResponse } from '@/lib/utils/apiResponse';
import { generateToken, setTokenCookie } from '@/lib/utils/jwt';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    // Parse request body
    const { email, password } = await request.json();
    
    // Validate input
    if (!email || !password) {
      return apiResponse.error('Please provide email and password');
    }
    
    // Find user by email with password included
    const user = await User.findOne({ email }).select('+password');
    
    // Check if user exists
    if (!user) {
      return apiResponse.error('Invalid email or password', 401);
    }
    
    // Validate password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return apiResponse.error('Invalid email or password', 401);
    }
    
    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    
    // Set token in HTTP-only cookie
    await setTokenCookie(token);
    
    // Return user data (excluding password)
    return apiResponse.success(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      'Login successful'
    );
  } catch (error: any) {
    console.error('Login error:', error);
    return apiResponse.serverError('Failed to login', error.message);
  }
}
