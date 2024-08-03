// import { mongooseConnect } from "../lib/mongoose";
// import { Category } from "../models/category";

// async function getCategoryId(categoryName) {
//   await mongooseConnect();
//   try {
//     const category = await Category.findOne({ name: categoryName });
//     if (!category) {
//       console.error(`Category ${categoryName} not found.`);
//       return [];
//     }

//     return category._id;
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//   }
// }
