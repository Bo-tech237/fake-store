import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(request) {
        if (
            request.nextUrl.pathname.startsWith('/dashboard') &&
            request.nextauth.token?.role !== 'Admin'
        ) {
            return NextResponse.rewrite(
                new URL('/user-auth/login', request.url)
            );
        }

        if (
            request.nextUrl.pathname.startsWith('/account') &&
            request.nextauth.token?.role !== 'User'
        ) {
            return NextResponse.rewrite(
                new URL('/user-auth/login', request.url)
            );
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ['/dashboard/:path*', '/account'],
};
