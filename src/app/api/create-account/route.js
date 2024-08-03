import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../../lib/mongoose";
import { UserAccount } from "../../../../models/UserAccount";
import bcrypt from "bcrypt";
export async function POST(req) {
  try {
    await mongooseConnect();
    const { name, email, password, number, referral } = await req.json();
    const existingUser = await UserAccount.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserAccount.create({
      name,
      email,
      password: hashedPassword,
      number,
      referral,
    });
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user", error);
    return NextResponse.json(
      { error: "An error occured while creating the account" },
      { status: 500 }
    );
  }
}
