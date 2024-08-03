import mongoose from "mongoose";

const { Schema } = mongoose;

const Userschema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    number: { type: String },
    referral: { type: String },
  },
  { timestamps: true }
);

const UserAccount =
  mongoose.models.UserAccount || mongoose.model("UserAccount", Userschema);

export { UserAccount };
