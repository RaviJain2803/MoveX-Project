import express from "express";
import * as categoryController from "../controllers/category.controller.js"

const router = express.Router();

router.post("/save" ,categoryController.save);
router.get("/fetch",categoryController.fetch);
router.patch("/update", categoryController.update);
router.delete("/delete", categoryController.deleteCategory);

export default router;