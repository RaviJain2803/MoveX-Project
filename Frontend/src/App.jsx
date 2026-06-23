import { Routes, Route } from "react-router-dom";
import About from "./Components/About/About";
import Contact from "./Components/Contect/Contact";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Services from "./Components/Services/Services";
import Home from "./Components/Visitor/Home/Home";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import AdminHome from "./Components/AdminComponents/AdminHome/AdminHome";
import Logout from "./Components/Logout/Logout";
import UserHome from "./Components/UserComponents/UserHome/UserHome";
import ManageUsers from "./Components/AdminComponents/ManageUsers/ManageUsers";
import EPAdmin from "./Components/AdminComponents/EditProfileAdmin/EPAdmin";
import CPAdmin from "./Components/AdminComponents/CPAdmin/CPAdmin";
import AddCategory from "./Components/AdminComponents/AddCategory/AddCategory";
import ViewCategory from "./Components/AdminComponents/ViewCategory/ViewCategory";
import AddSubCategory from "./Components/AdminComponents/AddSubCategory/AddSubCategory";
import ViewSubCategory from "./Components/AdminComponents/ViewSubCategory/ViewSubCategory";
import CPUser from "./Components/UserComponents/CPUser/CPUser";
import EPUser from "./Components/UserComponents/EPUser/EPUser";
import ViewCategoryUser from "./Components/UserComponents/ViewCategory/ViewCategory";
import ViewSubCategoryUser from "./Components/UserComponents/ViewSubCategory/ViewSubCategory";
import AddConsignment from "./Components/UserComponents/AddConsignment/AddConsignment";
import {ToastContainer}from "react-toastify";
import"react-toastify/dist/ReactToastify.css";
import ViewConsignment from "./Components/UserComponents/ViewConsignment/ViewConsignment";
import TrackConsignment from "./Components/UserComponents/TrackConsignment/TrackConsignment";
import ManageOrder from "./Components/AdminComponents/ManageOrder/ManageOrder";
import Charity from "./Components/UserComponents/CharityComponent/Charity";
import Success from "./Components/UserComponents/SuccessComponent/Success";
import Cancel from "./Components/UserComponents/CancelComponent/Cancel";
import Payment from "./Components/UserComponents/PaymentComponent/Payment";
import ViewCharity from "./Components/AdminComponents/ViewCharity/ViewCharity";
import Auth from "./Components/AuthComponent/Auth";
import Verifyuser from "./Components/VerifyuserEmail/Verifyuser"

function App() {
  return (
    <div className="container">
      <ToastContainer
position="top-right"
autoClose={3000}
/>
<Auth/>
      <Navbar />  

      <main>
        <Routes>
          //visitor routes
          <Route path="" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/vemail/:email" element={<Verifyuser/>} />
          <Route path="/login" element= {<Login/>} />
          <Route path="/logout" element= {<Logout/>} />
          {/* <Route path="/forgot-password" element= {<ForgotPassword/>} /> */}



          //admin
          <Route path="/admin" element={<AdminHome/>} />
          <Route path="/manageusers" element={<ManageUsers/>} />
          <Route path="/manageorders" element={<ManageOrder/>} />
          <Route path="/epadmin" element={<EPAdmin/>} />
          <Route path="/cpadmin" element={<CPAdmin/>} />
          <Route path="/addcategory" element={<AddCategory/>} />
          <Route path="/viewcategory" element= {<ViewCategory/>} />
          <Route path="/addsubcategory" element= {<AddSubCategory/>} />
          <Route path="/viewsubcategory" element= {<ViewSubCategory />} />
          <Route path="/viewcharity" element= {<ViewCharity/>} />

          //user
          <Route path="/user" element={<UserHome/>} />
          <Route path="/cpuser" element={<CPUser/>} />
          <Route path="/epuser" element={<EPUser/>} />
          <Route path="/viewcategory-user" element={<ViewCategoryUser/>} />
          <Route path='/searchsc/:cnm' element={<ViewSubCategoryUser/>}></Route>
          <Route path="/addconsignment" element={<AddConsignment/>} />
          <Route path="/viewconsignment" element={<ViewConsignment/>}/>
          <Route path="/trackconsignment"element={<TrackConsignment/>}/>
          <Route path='/charity' element={<Charity />}></Route>
          <Route path='/payment/:uid/:amt' element={<Payment />} ></Route>
          <Route path='/success' element={<Success />}></Route>
          <Route path='/cancel' element={<Cancel />}></Route>



        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
