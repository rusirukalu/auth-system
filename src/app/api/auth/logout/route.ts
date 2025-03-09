import { NextRequest } from 'next/server';
import { apiResponse } from '@/lib/utils/apiResponse';
import { removeTokenCookie } from '@/lib/utils/jwt';

export async function POST(request: NextRequest) {
  try {
    // Remove the auth token cookie
    removeTokenCookie();
    
    return apiResponse.success(null, 'Logged out successfully');
  } catch (error: any) {
    console.error('Logout error:', error);
    return apiResponse.serverError('Failed to logout', error.message);
  }
}
