import { Webhook } from "svix";
import { headers } from "next/headers";
import { UserAccount } from "../../../../../models/UserAccount";
import { mongooseConnect } from "../../../../../lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Missing svix headers" },
      { status: 400 }
    );
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  if (eventType === "user.created") {
    const { id, email_addresses } = evt.data;
    if (!id || !email_addresses) {
      return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
    }

    const user = {
      clerkUserId: id,
      email: email_addresses[0].email_address,
      phone: "1234567890", // Placeholder, update as needed
    };

    try {
      await mongooseConnect();
      const userDoc = await UserAccount.create(user);
      console.log("User created:", userDoc);
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "Success" }, { status: 200 });
}
