import express from 'express'
import * as PaymentdoneController from '../controllers/PaymentdoneController.js'

const Paymentrouter=express.Router();

Paymentrouter.post("/save",PaymentdoneController.save)
Paymentrouter.get("/fetch",PaymentdoneController.fetch)
export default Paymentrouter;