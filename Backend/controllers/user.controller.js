import '../models/connection.js';
import userSchemaModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import rs from 'randomstring';
import bcrypt from "bcrypt"
import sendMail from "./emailcontroller.js"

export const save = async(req,res)=>{
try {
    // console.log("request form",req.body);

   const {name,email,password,mobile,address,city,gender} = req.body;

   if( !name || !email || !password || !mobile || !address || !city || !gender)
   {
    return res.status(400).json({success : false, message : "All fields are required"});
   }

   const existingUser = await userSchemaModel.findOne({$or:[{email},{mobile}]});

   if(existingUser){
    return res.status(409).json({success:false, message:"Email or mobile already exists"})
   }

   const hashedPassword = await bcrypt.hash(password,10);

   const newUser = await userSchemaModel.create({
    name, email, password:hashedPassword, mobile, address, city, gender});

    sendMail(newUser.email );
    return res.status(201).json({success:true, message:"Registration successful"});

} catch (error) {
    console.log(error);
    res.status(500).json({"status":false ,message:"Internal server error"})

}   
}

export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({success:false, message:"Email and Password are required"})
        }

        const user = await userSchemaModel.findOne({email});

        if(!user)
        {
            return res.status(404).json({success:false, message:"Invalid Email"})
        }

        if(user.status===0){
            return res.status(403).json({success:false, message:"Please verify your account or wait for admin approval"})
        }

        const match = await bcrypt.compare(password,user.password);


    if(!match){
    return res.status(401).json({
    success:false,
    message:"Invalid Password"
    });
    }

    const token = jwt.sign({
        id:user._id,
        email:user.email,
        role:user.role
    },
    process.env.JWT_SECRET
)

    return res.status(200).json({
        success:true, message:"Login successful", token:token, user
    });

    } catch (error) {        
        console.log("LOGIN ERROR =>",error);
        res.status(500).json({success:false,message:"internal server error"});
    }
} 


export const verifyPassword = async(req,res)=>{

try{

const {email,password}=req.body;

const user=
await userSchemaModel.findOne({
email
});

if(!user){

return res.status(404).json({
message:"User not found"
});

}


const isMatch=
await bcrypt.compare(
password,
user.password
);


if(!isMatch){

return res.status(401).json({
message:"Invalid Password"
});

}


res.status(200).json({
success:true
});

}
catch(error){

res.status(500).json({
message:"Internal Server Error"
});

}

}





export const fetch = async (req,res)=>{
    try {
        let userList = await userSchemaModel.find(req.query);
        if(userList.length!=0)
        {
            res.status(200).json({"status":true, userList})
        }
        else{
            res.status(404).json({"status":"Resource not found"});
        }
    } catch (error) {
        res.status(500).json({"status":"internal server error"})
    }
}


export const deleteUser = async(req,res)=>{
    try {
        let userDetails = await userSchemaModel.findOne(req.body);
        if(userDetails)
        {
            let user = await userSchemaModel.deleteOne(req.body);
            if(user)
            {
                res.status(200).json({"status":"user delete successfully"})
            }
            else{
                res.status(500).json({"status":"server error"});
            }
        }
        else{
            res.status(404).json({"status":"request resource not found"});
        }
    } catch (error) {
        res.status(500).json({"status":"internal server error"});
    }
}

    // export const update = async (req,res)=>{
    //     try {
    //         let userDetails = await userSchemaModel.findOne(req.body.condition);
    //         if(userDetails)
    //         {
    //             let user = await userSchemaModel.updateMany(req.body.condition,{$set:req.body.data});

    //             if(user)
    //             {
    //                 res.status(200).json({"status":"data update successfully"});
    //             }
    //             else{
    //                 res.status(500).json({"status":"internal server error"});
    //             }
    //         }
    //         else
    //         {
    //             res.status(404).json({"status":"request resource not available"});
    //         }
    //     } catch (error) {
    //         res.status(500).json({"status":"internal server error"});
    //     }
    // }




export const update = async (req,res)=>{
    try {
        // 👇 NEW: baar baar req.body likhne ke bajaye destructure kar liya
        const condition = req.body.condition;
        const data = req.body.data;
        // 👇 NEW: agar password update ho raha ho tabhi hash karo
        // Profile update (name, city etc.) me ye code run nahi hoga
        if(data.password)
        {
            data.password = await bcrypt.hash(
                data.password,
                10
            );

            // Example:
            // 123456
            // ↓
            // $2b$10$asdkjashdkjash...
        }
        let userDetails =
        await userSchemaModel.findOne(
            condition
        );
        if(userDetails)
        {
            // 👇 CHANGED:
            // updateMany → updateOne
            // Kyuki email/_id unique hota hai
            // ek hi user update karna hai
            let user =
            await userSchemaModel.updateOne(
                condition,
                {
                    $set:data
                }
            );
            if(user)
            {
                res.status(200).json({
                    "status":
                    "data update successfully"
                });
            }
            else
            {
                res.status(500).json({
                    "status":
                    "internal server error"
                });
            }
        }
        else
        {
            res.status(404).json({
                "status":
                "request resource not available"
            });
        }
    }
    catch(error)
    {
        console.log(error);

        res.status(500).json({
            "status":
            "internal server error"
        });
    }
}
