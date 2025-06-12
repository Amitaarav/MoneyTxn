import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
    try {
        const { number, password } = await req.json();

        if (!number || !password) {
            return NextResponse.json(
                { message: "Number and password are required" },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        const user = await prisma.user.findUnique({
            where: { number },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        const token = await new SignJWT({ userId: user.id })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("24h")
            .sign(new TextEncoder().encode(JWT_SECRET));

        const response = NextResponse.json(
            { message: "Signed in successfully" },
            { status: StatusCodes.OK }
        );

        // Set the token in an HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 24 hours
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Sign in error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
} 