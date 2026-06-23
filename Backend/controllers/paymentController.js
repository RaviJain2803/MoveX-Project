import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";

// console.log(process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function Gateway(req, res) {
  try {
    const product = await stripe.products.create({
      name: "funds",

      description: "payment for charity",
    });

    const price = await stripe.prices.create({
      product: product.id,

      unit_amount: req.body.amount * 100,

      currency: "inr",
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price.id,

          quantity: 1,
        },
      ],

      mode: "payment",

      success_url: `${process.env.CLIENT_URL}/payment/${req.body.email}/${req.body.amount}`,

      cancel_url: `${process.env.CLIENT_URL}/cancel`,

      customer_email: "check@gmail.com",
    });

    res.json({
      url: session.url,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

export default Gateway;
