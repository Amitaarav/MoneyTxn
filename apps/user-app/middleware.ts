import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    // List of paths that require authentication
    const protectedPaths = ["/dashboard", "/transfer", "/transaction", "/p2p"];
    const isProtectedPath = protectedPaths.some(path => 
        request.nextUrl.pathname.startsWith(path)
    );

    if (isProtectedPath) {
        if (!token) {
            return NextResponse.redirect(new URL("/signin", request.url));
        }

        try {
            // Verify the token
            await jwtVerify(
                token,
                new TextEncoder().encode(JWT_SECRET)
            );
            return NextResponse.next();
        } catch (error) {
            // Token is invalid or expired
            return NextResponse.redirect(new URL("/signin", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/transfer/:path*",
        "/transaction/:path*",
        "/p2p/:path*"
    ]
}; 