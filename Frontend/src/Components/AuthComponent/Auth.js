import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function Auth() {

const navigate = useNavigate();

const location = useLocation();

useEffect(() => {

const path =
location.pathname;

const token =
localStorage.getItem("token");

const role =
localStorage.getItem("role");

const adminRoutes = [

"/admin",
"/manageusers",
"/manageorders",
"/epadmin",
"/cpadmin",
"/addcategory",
"/viewcategory",
"/addsubcategory",
"/viewsubcategory",
"/viewcharity"

];

const userRoutes = [

"/user",
"/epuser",
"/cpuser",
"/viewcategory-user",
"/searchsc",
"/addconsignment",
"/viewconsignment",
"/trackconsignment",
"/charity",
"/success",
"/cancel"

];

const isAdminRoute =
adminRoutes.includes(path);

const isUserRoute =

userRoutes.includes(path)

||

path.startsWith("/searchsc/")

||

path.startsWith("/payment/");

if (isAdminRoute) {

if (
!token
||
role !== "admin"
) {

navigate(
"/logout"
);

}

}

else if (
isUserRoute
) {

if (
!token
||
role !== "user"
) {

navigate(
"/logout"
);

}

}

else if (
path === "/"
) {

if (
role === "admin"
) {

navigate(
"/admin"
);

}

else if (
role === "user"
) {

navigate(
"/user"
);

}

}

}, [

location.pathname

]);

return null;

}

export default Auth;