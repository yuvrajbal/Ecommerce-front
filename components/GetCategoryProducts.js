import mongoose from "mongoose";
import { mongooseConnect } from "../lib/mongoose";
import { Category } from "../models/category";
import { Product } from "../models/Product";

export async function getCategoryProducts(categoryIdentifier) {
  await mongooseConnect();
  try {
    let category;
    if (mongoose.Types.ObjectId.isValid(categoryIdentifier)) {
      category = await Category.findById(categoryIdentifier);
    } else {
      category = await Category.findOne({ name: categoryIdentifier });
    }
    if (!category) {
      console.error(`Category ${categoryIdentifier} not found.`);
      return [];
    }

    const products = await Product.find({ categories: category._id });
    return products;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
