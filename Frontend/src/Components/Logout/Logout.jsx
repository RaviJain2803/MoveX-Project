import { Navigate } from "react-router-dom";

const Logout=()=>{

localStorage.clear();

return <Navigate to="/login"/>

}

export default Logout;



// import React from 'react'
// import { Navigate } from 'react-router-dom'

// const Logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("_id");
//     localStorage.removeItem("email");
//     localStorage.removeItem("name");
//     localStorage.removeItem("mobile");
//     localStorage.removeItem("address");
//     localStorage.removeItem("city");
//     localStorage.removeItem("gender");
//     localStorage.removeItem("role");
    
//   return (
//     <>
//     <Navigate to="/login" />
//     </>
//   )
// }

// export default Logout
