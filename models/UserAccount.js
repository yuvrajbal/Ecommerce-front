import mongoose from "mongoose";
import { Order } from "./Order";
import CartItem from "@/app/cart/CartItem";

const { Schema } = mongoose;

const Userschema = new Schema(
  {
    clerkUserId: { type: String, required: true },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: [
      {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true },
      },
    ],
    // cart: [CartItem],
    // orders: [Order],
  },
  { timestamps: true }
);

const UserAccount =
  mongoose.models.UserAccount || mongoose.model("UserAccount", Userschema);

export { UserAccount };
