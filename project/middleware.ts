import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;
  
  // Handle spaces in URLs
  if (path.includes('%20')) {
    const cleanPath = path.replace(/%20/g, '');
    url.pathname = cleanPath;
    return NextResponse.redirect(url);
  }
  
  // Handle admin route
  if (path.toLowerCase() === '/admin') {
    return NextResponse.rewrite(new URL('/admin/page', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/:path*',
    '/admin/:path*'
  ]
};