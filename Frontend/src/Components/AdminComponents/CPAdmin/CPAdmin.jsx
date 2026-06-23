import { useNavigate } from "react-router-dom";
import "./CPAdmin.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { __userapiurl } from "../../../API_URL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


function CPAdmin(){

   const user=
JSON.parse(
localStorage.getItem("user")
);

const [email,setEmail]=useState(
user?.email || ""
); 

    const navigate = useNavigate();
    const [output , setOutput ] = useState("");
    const [isSuccess , setIsSuccess ] = useState(false);

    const [showOld , setShowOld] = useState(false);
    const [showNew , setShowNew] = useState(false);
    const [showConfirm , setShowConfirm] = useState(false);

    // const [email , setEmail] = useState(localStorage.getItem("email"));
    // console.log("my email",email)
    const [oldPassword ,setOldPassword] = useState("");
    const [newPassword ,setNewPassword] = useState("");
    const [confirmNewPassword ,setConfirmNewPassword] = useState("");

    // useEffect(()=>{
    //      axios.get(__userapiurl+"fetch" , {
    //         params:{"email" :email, "password":oldPassword}
    //     }).then((result)=>{
    //         console.log("password",result);    
    //     }).catch((error)=>{
    //         console.log(error);
            
    //     })
    // },[])

    const handleSubmit = (e)=>{
        e.preventDefault();

if(!oldPassword || !newPassword || !confirmNewPassword){
setOutput(
"All fields are required"
);
setIsSuccess(false);
setTimeout(()=>{
setOutput("");
},3000);
return;
}



if(oldPassword===newPassword){
setOutput(
"Old and New Password cannot be same"
);
setIsSuccess(false);
setNewPassword("");
setConfirmNewPassword("");
setTimeout(()=>{
setOutput("");
},3000);
return;
}



if(newPassword!==confirmNewPassword){
setOutput(
"New & Confirm Password Mismatch"
);
setIsSuccess(false);
setConfirmNewPassword("");
setTimeout(()=>{
setOutput("");
},3000);
return;
}

        axios.post(__userapiurl+"verify-password" , 
            {email, "password":oldPassword}
        ).then((result)=>{
            // console.log("password result",result); 
            
            if(newPassword === confirmNewPassword)
            {
                axios.patch(__userapiurl+"update" , {condition :{"email" : email} , data:{"password":confirmNewPassword}}).then(()=>{
                    setOutput("Password Change Successfully...");
                    setIsSuccess(true);

                    setTimeout(()=>{
                    navigate("/logout");
                    },1000);
                })
            }
            else{
                setOutput("New & Confirm New Password Mismatch...");
                setIsSuccess(false);
                setNewPassword("");
                setConfirmNewPassword("")
            }
        }).catch((error)=>{
            console.log(error);
            setOutput("Invalid Old Password");
            setIsSuccess(false);
            setOldPassword("")

            setTimeout(()=>{
                setOutput("")
            })
        });
    }


    return(
        <>
        <main className="change-password-main">
        <section  className="change-password-section">
            <h2>Change Password Here !!!</h2>
            <form action=""  className="change-password-form">

{ output && <p style={{color:isSuccess?"green":"red"}}>{output}</p>}

            <div className="password-box">
                <label htmlFor=""> Old Password :</label>
                <input type={showOld?"text":"password"} 
                onChange={(e)=>setOldPassword(e.target.value)}
                value={oldPassword} 
                placeholder="Enter Old Password"/>
                <FontAwesomeIcon icon={showOld ? faEyeSlash : faEye }  onClick={()=> setShowOld(!showOld)} className="eye-icon"/>
            </div>


            <div className="password-box">

                <label htmlFor=""> New Password : </label>
                <input type={showNew ?"text":"password"}
                onChange={(e)=>setNewPassword(e.target.value)} 
                value={newPassword} placeholder="Enter New Password" />
                <FontAwesomeIcon icon={showNew ? faEyeSlash : faEye} onClick={()=> setShowNew(!showNew)} className="eye-icon" />
            </div>


            <div className="password-box">
                <label htmlFor=""> Confirm New Password : </label>
                <input type={showConfirm ?"text":"password"} 
                onChange={(e)=>setConfirmNewPassword(e.target.value)} 
                value={confirmNewPassword} placeholder="Confirm New Password" />
                <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} onClick={()=> setShowConfirm(!showConfirm)} className="eye-icon" />
            </div>
                <button type="submit" onClick={handleSubmit}> Submit </button>
            </form>
        </section>
        </main>
        </>
    )
}

export default CPAdmin;