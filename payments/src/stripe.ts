import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: "2022-11-15",
});
