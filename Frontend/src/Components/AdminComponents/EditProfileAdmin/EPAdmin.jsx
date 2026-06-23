import { useNavigate } from "react-router-dom";
import "./EPAdmin.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { __userapiurl } from "../../../API_URL";


const EPAdmin = () => {

    const navigate = useNavigate();
    const [output , setOutput] = useState()
    const [isSuccess , setIsSuccess] = useState(false);
    const [originalUser,setOriginalUser]=useState({});

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [gender, setGender] = useState("");

useEffect(()=>{

    const user=JSON.parse(
localStorage.getItem("user")
);
        axios.get(__userapiurl+"fetch" , {
            params : {email:user.email}
        }).then((result)=>{
            // console.log("fetch edit",result);

            let users = result.data.userList[0];
            // console.log("edit user",users);
            setOriginalUser(users);

            setName(users.name);
            setEmail(users.email);
            setMobile(users.mobile);
            setAddress(users.address)
            setCity(users.city);  
            setGender(users.gender);

        }).catch((error)=>{
            console.log(error);            
        })
    },[]);

const handleSubmit=(e)=>{
e.preventDefault(); 
if(name===originalUser.name &&
mobile===originalUser.mobile &&
address===originalUser.address &&
city===originalUser.city &&
gender===originalUser.gender
){
setOutput(
"No changes detected"
);

setIsSuccess(false);
setTimeout(()=>{
setOutput("");
},3000);
return;
}        
        axios.patch(__userapiurl+"update" , { "condition" : {"email":email} , "data":{"name":name,
            "mobile" : mobile,
            "address" : address,
            "city" : city,
            "gender" : gender
        }}).then(()=>{
            setOutput("Profile update successfully...")
            setIsSuccess(true)
            // alert ("Profile update successfully...");
            setTimeout(()=>{
            setOutput("")
        },3000)

            // navigate("/epadmin")
        }).catch((error)=>{
            console.log(error);  
            setOutput("Profile not updated...")
            setIsSuccess(false)

            setTimeout(()=>{
            setOutput("")
        },3000)
        })
    }

  return (
    <>
    <div className="edit-register">
        <h1> Edit Profile here !!!</h1>

        <form className="edit-register-form">

{ output && ( <p style={{color:isSuccess?"green":"red", marginBottom:"15px"}}> {output} </p> ) }

        <div className="input-groupss">
          <label htmlFor="name"> Name : </label>
          <input
            className="input-fields"
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className="input-groupss">
          <label htmlFor="email"> Email : </label>
          <input
            className="input-fields"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email} readOnly
          />
        </div>

        <div className="input-groupss">
          <label htmlFor="mobile"> Mobile : </label>
          <input
            className="input-fields"
            type="text"
            placeholder=" Enter your mobile number"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
          />
        </div>
        
        <div className="input-groupss">
          <label htmlFor="address"> Address : </label>
          <textarea
          className="input-fields"
            placeholder="Enter yor Address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          ></textarea>
        </div>


        
        <div className="input-groupss">
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


        <div className="input-groupss">
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

export default EPAdmin
