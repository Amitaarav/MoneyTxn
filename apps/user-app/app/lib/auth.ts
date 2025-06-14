import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { User, Account, Profile } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";

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

  interface User {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) return null;

        const existingUser = await db.user.findFirst({
          where: { number: credentials.phone },
        });

        if (existingUser) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (isPasswordValid) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.number,
            };
          }
          return null;
        }

        // Register new user if not found
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        try {
          const newUser = await db.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword,
            },
          });

          return {
            id: newUser.id.toString(),
            name: newUser.name,
            email: newUser.number,
          };
        } catch (err) {
          console.error("User creation failed:", err);
          return null;
        }
      },
    }),
  ],

  secret: process.env.JWT_SECRET || "_secret_",

  callbacks: {
    async signIn({
        user,
        account,
        profile,
        email,
        credentials,
        }: {
        user: User | AdapterUser;
        account?: Account | null;
        profile?: Profile;
        email?: { verificationRequest?: boolean };
        credentials?: Record<string, unknown>;
        }): Promise<boolean> {
        return !!user;
        }
        ,
    async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
    }
    return token;
  },
  async session({ token, session }) {
    if (token) {
      session.user.id = token.id as string;
      session.token = token;
    }
    return session;
  }
}

};
