import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../../lib/mongoose";
import { Product } from "../../../../models/Product";
import { Order } from "../../../../models/Order";
import Stripe from "stripe";

export async function POST(req) {
  function calculateTotal(lineItems) {
    let totalPrice = 0;

    lineItems?.forEach((item) => {
      const unitPrice = Number(item.price_data.unit_amount);
      const quantity = Number(item.quantity);
      totalPrice += quantity * unitPrice;
    });

    return totalPrice;
  }
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

    const uniqueProductIds = [...new Set(products.map((p) => p.productId))];
    await mongooseConnect();
    // product info from the database
    const productInfos = await Product.find({ _id: { $in: uniqueProductIds } });

    // list of products in the cart
    const line_items = [];

    for (const cartItem of products) {
      const { productId, flavour, weight, quantity } = cartItem;
      let unitPrice = 0;
      const productInfo = productInfos.find(
        (product) => product._id.toString() === productId
      );

      if (productInfo) {
        console.log("productInfo", productInfo.categoryProperties);

        // Find the correct category properties array (usually the first one)
        const relevantProperties = productInfo.categoryProperties.find(
          (propArray) =>
            propArray.some(
              (prop) => prop.name === "Weight" || prop.name === "Price"
            )
        );

        if (relevantProperties) {
          const weightProperty = relevantProperties.find(
            (prop) => prop.name === "Weight"
          );
          const priceProperty = relevantProperties.find(
            (prop) => prop.name === "Price"
          );

          if (weightProperty && priceProperty) {
            const weightIndex = weightProperty.values.findIndex(
              (value) => value === weight
            );
            unitPrice = priceProperty.values[weightIndex];

            console.log("weightIndex", weightIndex);
            console.log("unitPrice", unitPrice);
          } else {
            // unitPrice = productInfo.price;
            console.error(
              "Weight or Price property not found for product:",
              productInfo.title
            );
          }
        } else {
          unitPrice = productInfo.price;

          console.error(
            "Relevant properties not found for product:",
            productInfo.title
          );
        }

        if (quantity > 0 && unitPrice) {
          line_items.push({
            quantity,
            price_data: {
              currency: "usd",
              product_data: {
                name: productInfo.title,
                id: productInfo._id.toString(),
                flavour: flavour || "",
                weight: weight || "",
              },
              unit_amount: unitPrice, // Stripe expects amount in cents
            },
          });
        }
      } else {
        console.error("Product not found for productId:", productId);
      }
    }

    // calculate total price
    const CartTotal = calculateTotal(line_items);
    console.log("CartTotal in route.js", CartTotal);
    // order doc in the database
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
      cartTotal: CartTotal,
    });

    return NextResponse.json(orderDoc);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
