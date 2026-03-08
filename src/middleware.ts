import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Set to true to show under construction page
const UNDER_CONSTRUCTION = false;

export function middleware(request: NextRequest) {
  if (UNDER_CONSTRUCTION && !request.nextUrl.pathname.startsWith('/under-construction')) {
    return NextResponse.redirect(new URL('/under-construction', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|img).*)',
};
