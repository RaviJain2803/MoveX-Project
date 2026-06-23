import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";

import dotenv from "dotenv";
dotenv.config();

// app config
const app = express();
const PORT = process.env.PORT || 4001;

//to link routers
import UserRouter from "./routes/user.router.js";
import CategoryRouter from "./routes/category.router.js";
import SubCategoryRouter from "./routes/subcategory.route.js";
import ConsignmentRouter from "./routes/ConsignmentRoute.js";
import PaymentdoneRouter from "./routes/PaymentRouter.js";
import Gateway from "./controllers/paymentController.js";
// import Gateway from "./controllers/PaymentdoneController.js";

// app.use(cors());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File Upload Middleware
app.use(fileUpload());

// ADD THIS ↓↓↓
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

//config to load routers
app.use("/user", UserRouter);

//category Api base url
app.use("/category", CategoryRouter);

// SubCategory Api base url
app.use("/subcategory", SubCategoryRouter);

// consignment api base url
app.use("/consignment", ConsignmentRouter);

//method to load Gateway
app.post("/payment", Gateway);
app.use("/paymentdone", PaymentdoneRouter);

/*
app.use("/user",(req,res)=>{
    console.log("Api working");
    res.send("Api working");
})
*/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
