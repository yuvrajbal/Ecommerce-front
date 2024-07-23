import Page from "../../components/Page";
import { mongooseConnect } from "../../lib/mongoose";
import { Category } from "../../models/category";
import { Product } from "../../models/Product";
import { getCategoryProducts } from "../../components/GetCategoryProducts";
import "./globals.css";

// async function getFeaturedProduct(featuredProductId) {
//   await mongooseConnect();
//   try {
//     const product = await Product.findById(featuredProductId);
//     // const product = await Product.find({}, null, { sort });
//     return product;
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//   }
// }

// async function getBestSellers() {
//   await mongooseConnect();
//   try {
//     const bestSellerCategory = await Category.findOne({ name: "Best Sellers" });
//     if (!bestSellerCategory) {
//       console.error("Best Sellers category not found.");
//       return [];
//     }

//     const products = await Product.find({ categories: bestSellerCategory._id });
//     return products;
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//   }
// }

export default async function Home() {
  // const featuredProductId = "667cbdd2f7354c50941b58b1";
  // const featuredProduct = await getFeaturedProduct(featuredProductId);
  // const bestSellers = await getBestSellers();
  const bestSellers = await getCategoryProducts("Best Sellers");
  return (
    <>
      <Page products={bestSellers} />
    </>
  );
}
