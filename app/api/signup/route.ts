import { NextRequest, NextResponse } from "next/server";
// import database

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // const {email, password, name} = body
    console.log(body);

    // database actions of user creation

    return NextResponse.json({});
  } catch (error) {
    console.log(error);
  }
}
