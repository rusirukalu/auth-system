import { NextRequest } from 'next/server';
import { apiResponse } from '@/lib/utils/apiResponse';
import dbConnect from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    await dbConnect();
    
    return apiResponse.success(
      { message: 'API is working' },
      'Backend connection successful'
    );
  } catch (error: any) {
    console.error('API test error:', error);
    return apiResponse.serverError('Failed to connect to the database', error.message);
  }
}
