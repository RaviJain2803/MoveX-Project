import express from 'express';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

router.post("/save",userController.save);
router.post("/login",userController.login);
router.post("/verify-password",userController.verifyPassword)
router.get("/fetch",userController.fetch);
router.delete("/delete",userController.deleteUser);
router.patch("/update",userController.update);

export default router;



/*
router.post("/save",(req,res)=>{
    res.send("router working i am browser");
    console.log(req.body); 
    console.log("router working  i am console"); 
})

*/