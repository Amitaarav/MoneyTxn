import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.JWT_SECRET || "_secret_" });

    // List of paths that require authentication
    const protectedPaths = ["/dashboard", "/transfer", "/transaction", "/p2p", "/profile"];
    const isProtectedPath = protectedPaths.some(path =>
        request.nextUrl.pathname.startsWith(path)
    );

    if (isProtectedPath) {
        if (!token) {
            return NextResponse.redirect(new URL("/signin", request.url));
        }
    }

    // Redirect to dashboard if user is already logged in and tries to access authentication pages
    if (token && (request.nextUrl.pathname.startsWith("/signin") || request.nextUrl.pathname.startsWith("/signup"))) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/transfer/:path*",
        "/transaction/:path*",
        "/p2p/:path*",
        "/profile/:path*",
        "/signin",
        "/signup"
    ]
};