import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { apiResponse } from '@/lib/utils/apiResponse';
import { generateToken, setTokenCookie } from '@/lib/utils/jwt';

// Specify Node.js runtime for more consistent behavior
export const config = {
  runtime: 'nodejs'
};

export async function POST(request: NextRequest) {
  console.log('Registration endpoint called');
  
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Database connected successfully');
    
    // Parse request body
    let body;
    try {
      body = await request.json();
      console.log('Request body parsed:', { ...body, password: '[REDACTED]' });
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return apiResponse.error('Invalid request format');
    }
    
    const { name, email, password } = body;
    
    // Validate input
    if (!name || !email || !password) {
      console.log('Missing required fields');
      return apiResponse.error('Please provide all required fields');
    }
    
    // Check if user already exists
    console.log('Checking if user exists:', email);
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      console.log('User already exists:', email);
      return apiResponse.error('User with this email already exists', 409);
    }
    
    // Create new user
    console.log('Creating new user...');
    let user;
    try {
      user = await User.create({
        name,
        email,
        password,
      });
      console.log('User created successfully:', user._id.toString());
    } catch (createError) {
      console.error('Error creating user:', createError);
      
      if ('code' in createError && createError.code === 11000) {
        return apiResponse.error('User with this email already exists', 409);
      }
      
      return apiResponse.serverError(`Failed to create user: ${createError.message || 'Unknown error'}`);
    }
    
    // Generate JWT token
    console.log('Generating token...');
    let token;
    try {
      token = generateToken({
        userId: user._id.toString(),
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
      console.log('Token generated successfully');
    } catch (tokenError) {
      console.error('Error generating token:', tokenError);
      return apiResponse.serverError('Failed to generate authentication token');
    }
    
    // Set token in HTTP-only cookie
    console.log('Setting auth cookie...');
    try {
      setTokenCookie(token);
      console.log('Auth cookie set successfully');
    } catch (cookieError) {
      console.error('Error setting cookie:', cookieError);
      return apiResponse.serverError('Failed to set authentication cookie');
    }
    
    // Return user data (excluding password)
    console.log('Registration completed successfully');
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
    console.error('Registration error details:', error);
    console.error('Stack trace:', error.stack);
    
    if (error.code === 11000) {
      return apiResponse.error('User with this email already exists', 409);
    }
    
    return apiResponse.serverError(`Failed to register user: ${error.message || 'Unknown error'}`);
  }
}
