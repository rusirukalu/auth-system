import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { apiResponse } from '@/lib/utils/apiResponse';
import { generateToken, setTokenCookie } from '@/lib/utils/jwt';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    // Parse request body
    const { name, email, password } = await request.json();
    
    // Validate input
    if (!name || !email || !password) {
      return apiResponse.error('Please provide all required fields');
    }
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return apiResponse.error('User with this email already exists', 409);
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });
    
    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    
    // Set token in HTTP-only cookie
    setTokenCookie(token);
    
    // Return user data (excluding password)
    return apiResponse.success(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      'User registered successfully'
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return apiResponse.serverError('Failed to register user', error.message);
  }
}
