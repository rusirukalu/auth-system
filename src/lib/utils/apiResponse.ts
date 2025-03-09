import { NextResponse } from 'next/server';

type ApiResponseData = {
  success: boolean;
  message?: string;
  data?: any;
  errors?: any;
};

export const apiResponse = {
  success: (data: any = null, message: string = 'Success'): NextResponse => {
    const responseData: ApiResponseData = {
      success: true,
      message,
      data,
    };
    return NextResponse.json(responseData);
  },

  error: (
    message: string = 'An error occurred',
    status: number = 400,
    errors: any = null
  ): NextResponse => {
    const responseData: ApiResponseData = {
      success: false,
      message,
      errors,
    };
    return NextResponse.json(responseData, { status });
  },

  unauthorized: (message: string = 'Unauthorized'): NextResponse => {
    return apiResponse.error(message, 401);
  },

  forbidden: (message: string = 'Forbidden'): NextResponse => {
    return apiResponse.error(message, 403);
  },

  notFound: (message: string = 'Not Found'): NextResponse => {
    return apiResponse.error(message, 404);
  },

  serverError: (
    message: string = 'Internal Server Error',
    errors: any = null
  ): NextResponse => {
    return apiResponse.error(message, 500, errors);
  },
};
