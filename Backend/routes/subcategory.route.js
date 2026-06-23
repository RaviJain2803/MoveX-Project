import express from 'express';

import * as subcategoryController from '../controllers/subcategory.controller.js';

const router = express.Router();

router.post("/save",subcategoryController.save);
router.get("/fetch", subcategoryController.fetch);
router.delete("/delete" , subcategoryController.deleteSubCategory);
router.patch("/update",subcategoryController.update);
  
export default router;


