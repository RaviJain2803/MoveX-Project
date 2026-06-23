import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { __userapiurl } from "../../API_URL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const Login = () => {
  const navigate = useNavigate();

  const [output, setOutput] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setOutput("All fields are required");
      setIsSuccess(false);

      setTimeout(() => setOutput(""), 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setOutput("Invalid email format");
      setIsSuccess(false);

      setTimeout(() => setOutput(""), 3000);
      return;
    }

    if (password.length < 6) {
      setOutput("Password must be at least 6 characters");
      setIsSuccess(false);

      setTimeout(() => setOutput(""), 3000);
      return;
    }

    const userDetails = { email, password };

    axios.post(__userapiurl + "login", userDetails)

      .then((response) => {
        console.log("Login response:", response.data);

        const user = response.data.user;

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        // ADD THIS
        localStorage.setItem(
        "email",
        user.email
        );

        localStorage.setItem(
          "role",
          user.role
        );

        setOutput("Login successful");
        setIsSuccess(true);

        setEmail("");
        setPassword("");

        setTimeout(() => {
          setOutput("");
        }, 3000);

        user.role === "admin"
          ? navigate("/admin")
          : navigate("/user");
      })

      .catch((error) => {
        setOutput(
          error.response?.data?.message ||
          "Login failed"
        );

        setIsSuccess(false);

        setTimeout(() => {
          setOutput("");
        }, 3000);
      });
  };

  return (
    <div className="login">
      <h1>Login Here !!!</h1>

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        {output && (
          <p
            style={{
              color: isSuccess ? "green" : "red",
              marginBottom: "15px"
            }}
          >
            {output}
          </p>
        )}

        <div className="input-groups">
          <label htmlFor="email">Email :</label>

          <input
            type="email"
            id="email"
            className="input-field"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

       <div className="input-groups password-box">
  <label htmlFor="password">Password :</label>

  <div className="password-wrapper">
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      className="input-field"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <span
      className="toggle-eye"
      onClick={() => setShowPassword(!showPassword)}
    >
      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
    </span>
  </div>
</div>

        <div className="forgot-password">
          <Link to="/forgot-password">
            Forgot Password?
          </Link>
        </div>

        <button type="submit">
          Login
        </button>

        <div className="register-link">
          Don't have account?

          <Link to="/register">
            Register
          </Link>
        </div>

      </form>
    </div>
  );
};

export default Login;





// import React, { useState } from 'react'
// import "./Login.css";
// import {Link, useNavigate} from "react-router-dom"
// import axios from 'axios';
// import { __userapiurl } from '../../API_URL';

// const Login = () => {

//   const navigate = useNavigate();
//   const [output , setOutput] = useState();
//   const [isSuccess , setIsSuccess] = useState(false);

//   const [email , setEmail] = useState("");
//   const [password , setPassword] = useState("")

//   const handleSubmit = (e)=>{
//     e.preventDefault();

//     if(!email || !password){
//     setOutput(
//     "All fields required"
//     );
//     setIsSuccess(false);
//     return;
//     }


//     const emailRegex=
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


//     if(!emailRegex.test(email)){
//     setOutput(
//     "Invalid email format"
//       );
//     setIsSuccess(false);
//     return;
//     }


//     if(password.length<6){
//     setOutput(
//     "Password must be at least 6 characters"
//     );
//     setIsSuccess(false);
//     return;
//     }

//     const userDetails = {
//       email:email,
//       password:password
//     };

//     axios.post(__userapiurl+"login",userDetails).then((response)=>{
//         console.log("Login response frontend",response);

//         const user = response.data.user;

//         localStorage.setItem("token",response.data.user);
//         localStorage.setItem("name", user.name);
//         localStorage.setItem("email",user.email);
//         localStorage.setItem("mobile",user.mobile);
//         localStorage.setItem("address",user.address);
//         localStorage.setItem("city",user.city);
//         localStorage.setItem("gender",user.gender);
//         localStorage.setItem("role",user.role);

//         user.role=="admin"?navigate("/admin") : navigate("/user");

//         setOutput("Login successfull...");
//         setIsSuccess(true);

//         setTimeout(()=>{
//           setOutput("");
//         },3000)

//     }).catch(()=>{
//       setOutput("Invalid user or please verify your account");
//       setIsSuccess(false);

//       // setEmail("");
//       // setPassword("");

//       setTimeout(()=>{
//         setOutput("");
//       },3000)
//     })
//   }
//   return (
//     <>
//     <div className='login'>

//         <h1>Login Here !!!</h1>



//         <form className='login-form'>
//         { output && ( <p style={{color:isSuccess?"green":"red", marginBottom:"15px"}}> {output} </p> ) }
//             <div className='input-groups'>
//                 <label htmlFor="email"> Email : </label>
//                 <input type="email" onChange={(e)=>{ setEmail(e.target.value)}} value={email} placeholder='Enter your email ' id='email' className='input-field' required/>
//             </div>

//             <div className='input-groups'>
//               <label htmlFor="password"> Password : </label>
//               <input type="password" onChange={(e)=>{ setPassword(e.target.value)}} value={password} placeholder='Enter your password' id='password' className='input-field' required/>
//             </div>


//       <div className='forgot-password'>
//       <Link to="/forgot-password">
//       Forgot Password ?
//       </Link>
//       </div>

//       <button type='submit' onClick={handleSubmit}>Login</button>

//     <div className="register-link">
//     Don't have account?
//     <Link to="/register">
//     Register
//     </Link>
//     </div>
//         </form>

//     </div>
//     </>
//   )
// }

// export default Login
