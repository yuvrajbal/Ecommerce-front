import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../../lib/mongoose";
import { Product } from "../../../../models/Product";
import { Order } from "../../../../models/Order";
import Stripe from "stripe";

// if (!process.env.STRIPE_TEST_SECRET_KEY) {
//   throw new Error(
//     "STRIPE_SECRET_KEY is missing. Please set the environment variable"
//   );
// }

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const {
      email,
      country,
      name,
      zipcode,
      street,
      city,
      state,
      number,
      products,
    } = await req.json();

    const productIds = products.split(",");
    const uniqueProductIds = [...new Set(productIds)];
    await mongooseConnect();
    const productInfos = await Product.find({ _id: { $in: uniqueProductIds } });
    const line_items = [];

    for (const productId of uniqueProductIds) {
      const productInfo = productInfos.find(
        (product) => product._id.toString() === productId
      );
      const quantity = productIds.filter((id) => id === productId).length;
      if (quantity > 0 && productInfo) {
        
        line_items.push({
          quantity,
          price_data: {
            currency: "usd",
            product_data: {
              name: productInfo.title,
              id: productInfo._id.toString(),
            },
            unit_amount: quantity * productInfo.price,
          },
        });
      }
    }
    const orderDoc = await Order.create({
      line_items,
      email,
      name,
      zipcode,
      street,
      city,
      state,
      number,
      paid: false,
    });

    return NextResponse.json(orderDoc);
    // return NextResponse.json(orderDoc);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
