"use server"

import db from "@repo/db/client";
import bcrypt from "bcrypt";

import { signupSchema } from "../schemas";

export async function createAccount(name: string, phone: string, password: string) {
    const { success } = signupSchema.safeParse({ name, phone, password });
    if (!success) {
        return {
            error: "Invalid input"
        }
    }

    const existingUser = await db.user.findFirst({
        where: {
            number: phone
        }
    });

    if (existingUser) {
        return {
            error: "User with this phone number already exists"
        }
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.user.create({
            data: {
                number: phone,
                password: hashedPassword,
                name: name
            }
        });

        return {
            success: true,
            message: "Account created successfully"
        }
    } catch (e) {
        return {
            error: "Error while creating account"
        }
    }
}
