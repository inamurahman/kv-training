import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    if(pathname.startsWith('/employees')) {
        const authToken = request.cookies.get("auth_token");
        if(!authToken) {
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/employees/:path*'],
};