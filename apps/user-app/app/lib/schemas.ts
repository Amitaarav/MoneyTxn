import { z } from "zod";

export const p2pTransferSchema = z.object({
    to: z.string().min(10, "Phone number must be at least 10 digits"),
    amount: z.number().positive("Amount must be positive")
});

export const onRampSchema = z.object({
    amount: z.number().positive("Amount must be positive"),
    provider: z.string().min(1, "Provider is required")
});

export const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(10, "Phone number must be valid"),
    password: z.string().min(6, "Password must be at least 6 characters")
});
