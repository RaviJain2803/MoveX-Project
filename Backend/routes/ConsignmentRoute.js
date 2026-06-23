import express from "express";

import {save,fetch,deleteOrder,update} from "../controllers/ConsignmentController.js";

const ConsignmentRouter = express.Router();

// CREATE ORDER

ConsignmentRouter.post("/save", save);

// FETCH ORDER

ConsignmentRouter.get("/fetch", fetch);

// DELETE ORDER

ConsignmentRouter.delete("/delete", deleteOrder);

// UPDATE ORDER

ConsignmentRouter.patch("/update", update);

export default ConsignmentRouter;
