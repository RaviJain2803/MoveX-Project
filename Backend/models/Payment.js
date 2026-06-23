import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String },
  stripeSessionId: { type: String },
  stripePaymentIntent: { type: String },
  status: { type: String }, // paid, failed
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Payment", paymentSchema);
