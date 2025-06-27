// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      const { name, email, image } = user;
      const provider = account?.provider ?? "google";

      try {
        const existingUser = await prisma.tasqueUser.findUnique({
          where: { email: email! },
        });

        if (!existingUser) {
          const [firstName = "", lastName = ""] = name?.split(" ") ?? [];

          await prisma.tasqueUser.create({
            data: {
              email: email!,
              image,
              firstName,
              lastName,
              password: "", // No password from Google
              provider, // <-- ✅ store the provider: 'google'
              isVerified: true,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
  },

  pages: {
    signIn: "/register/login", // Optional: Your custom login page
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
