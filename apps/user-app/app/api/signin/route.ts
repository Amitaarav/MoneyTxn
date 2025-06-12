import { NextResponse } from "next/server";
import prisma from "@repo/db/client";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { number, password } = body;

        const user = await prisma.user.findUnique({
            where: {
                number: number
            }
        });

        if (!user || user.password !== password) {
            return NextResponse.json({
                message: "Invalid credentials"
            }, { status: 401 });
        }

        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return NextResponse.json({
            message: "Signed in successfully",
            token,
            user: {
                id: user.id,
                name: user.name,
                number: user.number
            }
        });

    } catch (error) {
        console.error("Error in signin:", error);
        return NextResponse.json({
            message: "Error signing in"
        }, { status: 500 });
    }
} 