// import { NextResponse } from "next/server";
// import { mongooseConnect } from "../../../../../lib/mongoose";
// import { Product } from "../../../../../models/Product";

// export async function GET(req, { params }) {
//   const { id } = params;
//   console.log("typeof=", typeof id);
//   try {
//     await mongooseConnect();
//     let idsArray = id[0].split(",");
//     console.log("idsArray=", idsArray);
//     const products = await Product.find({ _id: { $in: idsArray } });
//     console.log("products=", products);
//     let totalPrice = 0;

//     const cartItemsTotal = products.map((product) => {
//       const quantity = idsArray.filter((id) => id === product._id).length;
//       console.log("quantity (API)=", quantity);
//       totalPrice += product.price * quantity;
//       return totalPrice;
//     });
//     console.log("Total(API)", cartItemsTotal);

//     return NextResponse.json("done");
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
