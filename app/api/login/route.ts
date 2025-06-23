import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate that body contains email and password
    if (!body || !body.email || !body.password) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }
    const { email, password } = body;

    // TODO: Implement actual authentication logic here.
    // This always returns "Login successful" as a placeholder.

    // Dummy user data - replace with real database lookup
    const user = {
      email: "user@example.com",
      // hashed password for 'password123'
      passwordHash:
        "$2b$10$EIXChwD9vKGJ3KX9/axfNez6f4IobYTIxK/vIVuVThFqGk7XhfB4O",
    };

    // Check if user exists
    if (email !== user.email) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error processing login request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
