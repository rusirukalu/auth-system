import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the path
  const path = request.nextUrl.pathname;
  
  // Define paths that are considered public
  const isPublicPath = path === '/' || 
                      path === '/login' || 
                      path === '/register' || 
                      path === '/about' ||
                      path.startsWith('/api');
  
  // Get the token from cookie
  const token = request.cookies.get('auth_token')?.value;
  
  // Prevent redirect loops - only redirect if not already on login page
  if (!isPublicPath && !token && path !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If trying to access login/register while authenticated, redirect to dashboard
  if ((path === '/login' || path === '/register') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// See https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /static (static files)
     * 4. All files in the /public folder
     */
    '/((?!api|_next|static|.*\\..*|_vercel).*)',
  ],
};
