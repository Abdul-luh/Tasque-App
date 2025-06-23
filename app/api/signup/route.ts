import { NextRequest, NextResponse } from "next/server";
// Example: import Prisma client
import { PrismaClient } from "@prisma/client";
// import bcrypt for hashing passwords
import bcrypt from "bcrypt";
// import zod for validation
import { z } from "zod";
import { userSchema } from "@/formSchema";
const prisma = new PrismaClient();
// import database

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request data
    const validatedData = userSchema.parse(body);

    const { firstName, lastName, email, password } = validatedData;

    // Check if user already exists
    const existingUser = await prisma.tasqueUser.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user in the database
    await prisma.tasqueUser.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      // Validation error
      return NextResponse.json(
        { message: error.errors.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
