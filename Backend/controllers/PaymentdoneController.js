
import "../models/connection.js";
import PaymentSchemaModel from "../models/PaymentSchemaModel.js";

export const save=async(req,res)=>{
 var PaymentList=await PaymentSchemaModel.find();
 var l=PaymentList.length;
 var _id=l==0?1:PaymentList[l-1]._id+1;
 var PaymentDetails={...req.body,"_id":_id};
 try{
  console.log(PaymentDetails)
    await PaymentSchemaModel.create(PaymentDetails);
  
    res.status(201).json({"status":true});
 }catch(error){
  console.log(error);
    res.status(500).json({"status":false});        
 };
};

export const fetch = async (req,res)=>{
  const CharityDetails= await PaymentSchemaModel.find(req.query);
  if(CharityDetails.length!=0){
    res.status(200).json(CharityDetails);
  }
  else{
    res.status(404).json({"status":"resource not found"})
  }
} 
