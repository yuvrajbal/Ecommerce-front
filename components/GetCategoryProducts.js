import { mongooseConnect } from "../lib/mongoose";
import { Category } from "../models/category";
import { Product } from "../models/Product";

export async function getCategoryProducts(categoryName) {
  await mongooseConnect();
  try {
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      console.error(`Category ${categoryName} not found.`);
      return [];
    }

    const products = await Product.find({ categories: category._id });
    return products;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
