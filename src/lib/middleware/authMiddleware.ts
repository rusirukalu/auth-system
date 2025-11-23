import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromCookies, verifyToken } from '@/lib/utils/jwt';
import { apiResponse } from '@/lib/utils/apiResponse';

export async function authMiddleware(
  request: NextRequest,
  handler: (req: NextRequest, userId: string) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    // Get token from cookies
    const token = await getTokenFromCookies();

    if (!token) {
      return apiResponse.unauthorized('Authentication required');
    }

    // Verify token
    const decoded = verifyToken(token);

    if (!decoded) {
      return apiResponse.unauthorized('Invalid or expired token');
    }

    // Call the handler with the authenticated user's ID
    return handler(request, decoded.userId);
  } catch (error: any) {
    console.error('Auth middleware error:', error);
    return apiResponse.serverError(error.message);
  }
}
