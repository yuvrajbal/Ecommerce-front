import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../../lib/mongoose";
import { Product } from "../../../../models/Product";

export async function POST(req) {
  try {
    const { ids } = await req.json();
    console.log("ids from post", ids);
    await mongooseConnect();

    if (!ids || !ids.length) {
      return NextResponse.json([]);
    }
    const product = await Product.find({ _id: { $in: ids } });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
