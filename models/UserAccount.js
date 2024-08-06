import mongoose from "mongoose";

const { Schema } = mongoose;

const Userschema = new Schema(
  {
    clerkUserId: {type: String, required: true, unique: true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const UserAccount =
  mongoose.models.UserAccount || mongoose.model("UserAccount", Userschema);

export { UserAccount };
