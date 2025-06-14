import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client";
import type { NextAuthOptions } from "next-auth";
import type { User, Account, Profile } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    callbacks: {
      async signIn({
        user,
        account,
        profile,
        email,
        credentials,
      }: {
        user: User | AdapterUser;
        account: Account | null;
        profile?: Profile;
        email?: { verificationRequest?: boolean };
        credentials?: Record<string, unknown>;
      }) {
        if (!user || !user.email) {
          return false;
        }

        await db.merchant.upsert({
          select: {
            id: true
          },
          where: {
            email: user.email
          },
          create: {
            email: user.email,
            name: user.name || "",
            auth_type: account?.provider === "google" ? "Google" : "Github"
          },
          update: {
            name: user.name || "",
            auth_type: account?.provider === "google" ? "Google" : "Github"
          }
        });

        return true;
      }
    },
    secret: process.env.NEXTAUTH_SECRET || "secret"
}