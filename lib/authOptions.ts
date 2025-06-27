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

          // ✅ redirect to /register/signup?msg=Account created successfully!
          throw new Error(
            "NEXT_REDIRECT:/register/signup?msg=User created successfully!"
          );
        }

        throw new Error("NEXT_REDIRECT:/register/signup?msg=Login successful!");

        // return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        throw new Error(
          "NEXT_REDIRECT:/register/signup?msg=Something went wrong"
        );
        // return false;
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
