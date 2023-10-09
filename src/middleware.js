import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(request) {
        console.log(request.nextauth.token);

        if (
            request.nextUrl.pathname.startsWith('/dashboard') &&
            request.nextauth.token?.role !== 'Admins'
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
