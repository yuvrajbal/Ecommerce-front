import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../../lib/mongoose";
import { Product } from "../../../../models/Product";
import { auth, User } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

async function getUserId() {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  return userId;
}

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  try {
    const user = await clerkClient.users.getUser(userId);
    const cart = user.unsafeMetadata.cart || [];
    return NextResponse.json({ cart });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const cartItems = await req.json();
    await mongooseConnect();
    console.log("cartItems in post ", cartItems);
    // send cart items to unsafeMetadata of the user

    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ success: "User not found" }, { status: 200 });
    } else {
      const user = await clerkClient.users.getUser(userId);
      const existingCart = user.unsafeMetadata.cart || [];
      const mergedCart = [...existingCart, ...cartItems];

      // Update the user's metadata
      await clerkClient.users.updateUserMetadata(userId, {
        unsafeMetadata: {
          cart: cartItems,
        },
      });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
