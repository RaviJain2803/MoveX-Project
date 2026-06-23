import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Stripe from "stripe";
import Payment from "../models/Payment.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log("Webhook error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      try {
        await Payment.create({
          email: session.customer_email,
          amount: session.amount_total / 100,       // Stripe stores in smallest currency unit
          currency: session.currency,
          stripeSessionId: session.id,
          stripePaymentIntent: session.payment_intent,
          status: "paid"
        });

        console.log("Payment saved to DB:", session.id);
      } catch (err) {
        console.log("DB save error:", err);
      }
    }

    res.json({ received: true });
  }
);

export default router;
