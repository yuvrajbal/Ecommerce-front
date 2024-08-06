import { NextResponse } from 'next/server';
import { clerkClient } from "@clerk/nextjs/server";

export async function POST() {
  const { cart, userId } = await body.json();
  await clerkClient.users.updateUserMetadata(userId, {
    unsafeMetadata: {
      "birthday": "11-30-1969"
    }
  });
  return NextResponse.json({ success: true });
}