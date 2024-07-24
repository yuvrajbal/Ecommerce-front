import mongoose from "mongoose";

const { Schema } = mongoose;

const CartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  flavour: { type: String },
  weight: { type: String },
  price: { type: Number, required: true },
  title: { type: String, required: true },
  imageLink: { type: String, required: true },
});

const CartSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    items: [CartItemSchema],
    totalAmount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

// Calculate total amount before saving
CartSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  next();
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export { Cart };
