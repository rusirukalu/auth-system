import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { authMiddleware } from '@/lib/middleware/authMiddleware';
import { apiResponse } from '@/lib/utils/apiResponse';

async function handler(request: NextRequest, userId: string) {
  try {
    await dbConnect();
    
    // Find user by ID
    const user = await User.findById(userId);
    
    if (!user) {
      return apiResponse.notFound('User not found');
    }
    
    // Return user data
    return apiResponse.success({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error: any) {
    console.error('Get user error:', error);
    return apiResponse.serverError('Failed to get user data', error.message);
  }
}

export async function GET(request: NextRequest) {
  return authMiddleware(request, handler);
}
