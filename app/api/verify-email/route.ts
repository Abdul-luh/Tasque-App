// /app/api/auth/verify-email/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ message: "Token is required" }, { status: 400 });
  }

  // Find the user with the provided token and check if it's still valid
  // The token should be valid for 48 hours, so we check if the expiry date
  const user = await prisma.tasqueUser.findFirst({
    where: {
      emailVerificationToken: token,
      emailVerificationTokenExpiry: {
        gte: new Date(),
      },
    },
  });

  // If no user is found or the token is invalid/expired, return an error
  if (!user) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 400 }
    );
  }

  // If the user is found, update their verification status
  // and clear the verification token and expiry date
  // This marks the user as verified
  // and allows them to log in

  // ✅ Separate updated user into verifiedUser
  const verifiedUser = await prisma.tasqueUser.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      emailVerificationToken: null,
      emailVerificationTokenExpiry: null,
    },
  });

  // check if the user is already verified
  if (!verifiedUser.isVerified) {
    return NextResponse.json(
      { message: "Please verify your email before logging in." },
      { status: 403 }
    );
  }

  return NextResponse.json({
    status: "success",
    message: "Email verified successfully. You can now log in.",
    user: {
      isVerified: verifiedUser.isVerified,
    },
  });
}
