import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "STRIPE_TEST_SECRET_KEY is missing. Please set the environment variable"
  );
}

const stripe = new Stripe(process.env.local.STRIPE_TEST_SECRET_KEY);

export default stripe;
