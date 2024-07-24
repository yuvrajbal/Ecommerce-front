import { Product } from "../../../../../models/Product";
import { mongooseConnect } from "../../../../../lib/mongoose";
import { NextResponse } from "next/server";
import { Category } from "../../../../../models/category";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    await mongooseConnect();
    const product = await Product.findById(id);
    const categories = await Category.find({
      _id: { $in: product.categories },
    });
    const categoryProperties = categories.flatMap(
      (category) => category.properties
    );
    const responseData = {
      ...product.toObject(),
      categoryProperties: categoryProperties,
    };
    return NextResponse.json(responseData);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
