import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {assets} from "../../assets/assets";
import {Link,NavLink,useLocation} from "react-router-dom";
import "./Navbar.css";

function Navbar(){

const [menuOpen,setMenuOpen]=useState(false);

useLocation();

const token=localStorage.getItem("token");
const role=localStorage.getItem("role");

return( 

<nav className="navbar">

<div className="logo-section">
<img src={assets.logo} alt="logo"/>

<div>
<h2>MoveXpress</h2>
<p>Fast & Safe Delivery...</p>
</div>

</div>

<div className={`nav-menu ${menuOpen?"active":""}`}>

{token && role==="admin" ? (

<ul>

<li>
<NavLink to="/admin">Admin Home</NavLink>
</li>

<li>
<NavLink to="/viewcharity">View Charity</NavLink>
</li>

<li className="dropdown">

<div className="dropdown-title">
Manage ▾
</div>

<ul className="dropdown-content">

<li>
<NavLink to="/manageusers">
Manage Users
</NavLink>
</li>

<li>
<NavLink to="/manageorders">
Manage Orders
</NavLink>
</li>

</ul>

</li>

<li className="dropdown">

<div className="dropdown-title">
Category ▾
</div>

<ul className="dropdown-content">

<li>
<NavLink to="/addcategory">
Add Category
</NavLink>
</li>


<li>
<NavLink to="/viewcategory">
View Categories
</NavLink>
</li>

<li>
<NavLink to="/addsubcategory">
Add Sub Category
</NavLink>
</li>


<li>
<NavLink to="/viewsubcategory">
View Sub Category
</NavLink>
</li>

</ul>

</li>

<li className="dropdown">

<div className="dropdown-title">
Account ▾
</div>

<ul className="dropdown-content">

<li>
<NavLink to="/epadmin">
Edit Profile
</NavLink>
</li>

<li>
<NavLink to="/cpadmin">
Change Password
</NavLink>
</li>

</ul>

</li>

<li>
<NavLink className="logout-btn" to="/logout">
Logout
</NavLink>
</li>

</ul>

):token && role==="user" ? (

<ul>

<li>
<NavLink to="/user">
Home
</NavLink>
</li>

<li>
<NavLink to="/viewcategory-user">
ViewCategory
</NavLink>
</li>

<li>
<NavLink to="/charity">
Charity
</NavLink>
</li>

<li className="dropdown">

<div className="dropdown-title">
Consignment ▾
</div>

<ul className="dropdown-content">

<li>
<NavLink to="/addconsignment">
Add Consignment
</NavLink>
</li>

<li>
<NavLink to="/viewconsignment">
View Consignment
</NavLink>
</li>

<li>
<NavLink to="/trackconsignment">
Track Consignment
</NavLink>
</li>

</ul>

</li>

<li className="dropdown">

<div className="dropdown-title">
Account ▾
</div>

<ul className="dropdown-content">

<li>
<NavLink to="/epuser">
Edit Profile
</NavLink>
</li>

<li>
<NavLink to="/cpuser">
Change Password
</NavLink>
</li>

</ul>

</li>

<li>
<NavLink className="logout-btn" to="/logout">
Logout
</NavLink>
</li>

</ul>

):(

<ul>

<li><NavLink to="">Home</NavLink></li>
<li><NavLink to="/about">About</NavLink></li>
<li><NavLink to="/services">Services</NavLink></li>
<li><NavLink to="/contact">Contact</NavLink></li>
<li><NavLink to="/register">Register</NavLink></li>

<li>
<NavLink className="login-btn" to="/login">
Login
</NavLink>
</li>

</ul>

)}

</div>

<div
className="hamburger"
onClick={()=>setMenuOpen(!menuOpen)}
>
<FontAwesomeIcon icon={faBars}/>
</div>

</nav>

)

}

export default Navbar;