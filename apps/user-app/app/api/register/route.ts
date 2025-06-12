import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@repo/db/client";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, number, password} = body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                number: number
            }
        });

        if (existingUser) {
            return NextResponse.json({
                message: "User already exists"
            }, { status: 400 });
        }

        const hashedPassword = await hash(password, 10);
        // Create user and balance in a transaction
        const result = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    name,
                    number,
                    email,
                    password: hashedPassword
                }
            });

            await tx.balance.create({
                data: {
                    userId: user.id,
                    amount: 0,
                    locked: 0
                }
            });

            return user;
        });

        return NextResponse.json({
            message: "User registered successfully",
            user: {
                id: result.id,
                name: result.name,
                number: result.number
            }
        });

    } catch (error) {
        console.error("Error in registration:", error);
        return NextResponse.json({
            message: "Error registering user"
        }, { status: 500 });
    }
} 