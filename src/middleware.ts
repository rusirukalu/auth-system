import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the path and full URL for logging
  const path = request.nextUrl.pathname;
  const fullUrl = request.nextUrl.toString();
  
  // Define paths that are considered public
  const isPublicPath = path === '/' || 
                      path === '/login' || 
                      path === '/register' || 
                      path === '/about' ||
                      path.startsWith('/api');
  
  // Get the token from cookie
  const token = request.cookies.get('auth_token')?.value;
  
  // Safety mechanism to prevent redirect loops
  // Check for a special query parameter that indicates we've already redirected once
  const hasRedirectedBefore = request.nextUrl.searchParams.has('_redirected');
  
  // If we've already redirected, don't redirect again
  if (hasRedirectedBefore) {
    return NextResponse.next();
  }
  
  // If trying to access a protected path without a token, redirect to login with special param
  if (!isPublicPath && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('_redirected', 'true');
    return NextResponse.redirect(loginUrl);
  }
  
  // If trying to access login/register while authenticated, redirect to dashboard with special param
  if ((path === '/login' || path === '/register') && token) {
    const dashboardUrl = new URL('/dashboard', request.url);
    dashboardUrl.searchParams.set('_redirected', 'true');
    return NextResponse.redirect(dashboardUrl);
  }
  
  return NextResponse.next();
}

// Update matcher to be more specific
export const config = {
  matcher: [
    '/(dashboard|profile|login|register)',
    '/'
  ],
};
