import { Product } from "../../../../models/Product";
import { mongooseConnect } from "../../../../lib/mongoose";
import { NextResponse } from "next/server";
import { Category } from "../../../../models/category";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  try {
    await mongooseConnect();
    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).limit(10);

    return NextResponse.json({ products });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
