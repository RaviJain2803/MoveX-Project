import { useState } from "react";
import "./Register.css";
import axios from "axios"
import { __userapiurl } from "../../API_URL";

function Register()
{   
    // for output display
    const [output, setOutput] = useState();
    const [isSuccess , setIsSuccess] = useState(false);

    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [mobile , setMobile] = useState("");
    const [address , setAddress] = useState("");
    const [city , setCity] = useState("");
    const [gender , setGender] = useState("");

    const handleSubmit = (e)=>{  
        e.preventDefault(); 
        
        if(!name.trim()){
        setOutput("Name is required");
        setIsSuccess(false);
        return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(email))
        {
            setOutput("Enter valid email");
            isSuccess(false);
            return;
        }


        if(password.length<6){
        setOutput(
        "Password minimum 6 characters"
        );
        setIsSuccess(false);
        return;
        }


        const mobilePattern=/^[0-9]{10}$/;

        if(!mobilePattern.test(mobile)){
        setOutput("Mobile must be 10 digits");
        setIsSuccess(false);
        return;
        }


        if(address.trim().length<5){
        setOutput(
        "Enter proper address"
        );
        setIsSuccess(false);
        return;
        }


        if(!city){
        setOutput(
        "Please select city"
        );
        setIsSuccess(false);
        return;
        }


        if(!gender){
        setOutput(
        "Please select gender"
        );
        setIsSuccess(false);
        return;
        }

        const userDetails = {
            name : name,
            email : email,
            password : password,
            mobile : mobile,
            address : address,
            city : city,
            gender : gender,
        }
        // console.log("userDetails",userDetails );
        // http://localhost:4001/user/save
        
       axios.post(__userapiurl+"save",userDetails)
       .then(()=>{
        setOutput("Form submitted successfully...");
        setIsSuccess(true);

        setName("");
        setEmail("");
        setPassword("");
        setMobile("");
        setAddress("");
        setCity("");
        setGender("");

        setTimeout(()=>{
            setOutput("")
        },3000)
       })

       .catch(()=>{
        setOutput("User register failed...")
        setIsSuccess(false)

        setTimeout(()=>{
        setOutput("");
        },3000);
       }) 
    }

    return(
        <>
        <div className="register">
            <h1>Register here !!!</h1>
            
        <form className="register-form">

{ output && ( <p style={{color:isSuccess?"green":"red", marginBottom:"15px"}}> {output} </p> ) }

        <div className="input-group">
            <label htmlFor="name"> Name : </label>
            <input type="text" onChange={(e)=> setName(e.target.value)} value={name} placeholder="Enter your name" className="input-fields" id="name" required/>
        </div>

        <div className="input-group">
            <label htmlFor="email"> Email : </label>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter your email" className="input-fields" id="email" required/>
        </div>

        <div className="input-group">
            <label htmlFor="password"> Password : </label>
            <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter your password" className="input-fields" id="password" required/>
        </div>

        <div className="input-group">
            <label htmlFor="mobile"> Mobile : </label>
            <input type="text" onChange={(e)=>setMobile(e.target.value)} value={mobile} placeholder="Enter your number" className="input-fields" id="mobile" required/>
        </div>

        <div className="input-group">
            <label htmlFor="address"> Address : </label>
            <textarea onChange={(e)=>setAddress(e.target.value)} value={address} placeholder="Enter your address" className="input-fields" id="address" required>
            </textarea>
        </div>

        <div className="input-group">
            <label htmlFor="city"> City : </label>
            <select  onChange={(e)=>setCity(e.target.value)} value={city} id="city" className="input-fields" required>
                <option value="" disabled>Select City</option>
                <optgroup label="MP">
                    <option>Indore</option>
                    <option>Ujjain</option>
                    <option>Dewas</option>
                    <option>Bhopal</option>
                </optgroup>
                <optgroup label="MH">
                    <option> Mumbai </option>
                    <option> Pune </option>
                    <option> Nasik </option>
                </optgroup>
                <optgroup label="RJ">
                    <option> Udaipur </option>
                    <option> Jaipur </option>
                    <option> Banswara </option>
                </optgroup>
            </select>
        </div>

        <div className="input-group">
            <label htmlFor="gender"> Gender : </label>
            <div className="radio-group">
                <label htmlFor="male"> Male </label>
                <input type="radio" name="gender" onChange={(e)=>setGender(e.target.value)} value="male" id="male"  />

                <label htmlFor="female"> Female </label>
                <input type="radio" name="gender" id="female" onChange={(e)=>setGender(e.target.value)} value="female" />
            </div>
        </div>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
        </div>
        </>
    )
}

export default Register;