import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../../lib/mongoose";
import { Product } from "../../../../models/Product";

export async function POST(req) {
  try {
    const cartItems = await req.json();
    // console.log("cart items in post req body ", cartItems);
    await mongooseConnect();

    if (!cartItems || !cartItems.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }
    //  extract product ids
    // const ids = cartItems.map((item) => item.productId);
    // console.log("ids in route.js", ids);
    // const product = await Product.find({ _id: { $in: ids } });
    return NextResponse.json(cartItems);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
