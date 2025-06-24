// /app/api/auth/verify-email/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ message: "Token is required" }, { status: 400 });
  }

  const user = await prisma.tasqueUser.findFirst({
    where: {
      emailVerificationToken: token,
      emailVerificationTokenExpiry: {
        gte: new Date(),
      },
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 400 }
    );
  }

  await prisma.tasqueUser.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      emailVerificationToken: null,
      emailVerificationTokenExpiry: null,
    },
  });

  if (!user.isVerified) {
    return NextResponse.json(
      { message: "Please verify your email before logging in." },
      { status: 403 }
    );
  }

  return NextResponse.redirect(`${process.env.DOMAIN}/login?verified=true`);
}
