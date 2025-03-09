import { NextRequest, NextResponse } from 'next/server';
import { apiResponse } from '@/lib/utils/apiResponse';
import { removeTokenCookie } from '@/lib/utils/jwt';

export async function POST(request: NextRequest) {
  try {
    // Remove the auth token cookie
    removeTokenCookie();
    
    // Return response with cache control headers
    return NextResponse.json(
      {
        success: true,
        message: 'Logged out successfully',
        data: null
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error: any) {
    console.error('Logout error:', error);
    return apiResponse.serverError('Failed to logout', error.message);
  }
}
