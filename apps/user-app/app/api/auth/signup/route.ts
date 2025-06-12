import { NextResponse } from "next/server";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

export async function POST(req: Request) {
    try {
        const { name,email, number, password } = await req.json();

        if (!name || !email || !number || !password) {
            return NextResponse.json(
                { message: "Name, number and password are required" },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { number },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user and balance in a transaction
        const result = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    name,
                    number,
                    email,
                    password: hashedPassword,
                },
            });

            await tx.balance.create({
                data: {
                    userId: user.id,
                    amount: 0,
                    locked: 0,
                },
            });

            return user;
        });

        return NextResponse.json({
            message: "User registered successfully",
            user: {
                id: result.id,
                name: result.name,
                number: result.number,
            },
        });
    } catch (error) {
        console.error("Error in registration:", error);
        return NextResponse.json(
            { message: "Error registering user" },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
} 