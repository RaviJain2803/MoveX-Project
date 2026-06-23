
import { Navigate , useParams } from 'react-router-dom';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { __paymentdoneapiurl } from '../../../API_URL';

function Payment()
{
    const params = useParams(); 
        
    useEffect(()=>{
        console.log("UserId : ",params.uid);
        console.log("Amount : ",params.amt);
    },[]);
     const PaymentDetails={"UserId":params.uid,"amount":params.amt}
    axios.post(__paymentdoneapiurl+"save",PaymentDetails).then((response)=>{
       console.log("Succesfully added to the database");
    }).catch((err)=>{
        console.log(err);
    })
    return(
        <>
        <div>
            <Navigate to='/success' />
        </div>
        </>
    )
}

export default Payment;
