import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import type { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
        token?: JWT;
    }
}

export const authOptions = {
    providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
        },
        async authorize(credentials: any) {
            if(!credentials?.phone || !credentials?.password){
                return null
            }
            
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            } 
            const hashedPassword = await bcrypt.hash(credentials.password, 10);

            try {
                const newUser = await db.user.create({
                    data: {
                        number: credentials.phone,
                        password: hashedPassword
                    }
                });
            
                return {
                    id: newUser.id.toString(),
                    name: newUser.name,
                    email: newUser.number
                }
            } catch(e) {
                console.error(e);
                return null;
            }
        },
    })
    ],
    secret: process.env.JWT_SECRET || "_secret_",
    callbacks: {
        async jwt({ token, user }: { token: JWT, user: User }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ token, session }: { token: JWT, session: Session }) {
            if (token) {
                session.user.id = token.id as string;
                session.token = token; // Include the token in the session
            }
            return session;
        }
    }
}
