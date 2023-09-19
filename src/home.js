import React, { useState, useEffect } from "react";
import Topbar from "./scene/global/Topbar";
import Sidebar from "./scene/global/Sidebar";
import {  useNavigate, Outlet, redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import posthog from "posthog-js"; // new
import CookieBanner from "./components/cookieBanner";


const Home = () => {
  const navigate = useNavigate();

  const [isSidebar, setIsSidebar] = useState(true);
  let userData = localStorage.getItem("userData");
  // console.log(userData)

  // const decodedData = JSON.parse(userData);
  
  // console.log("token expiry time:", decodedData?.exp);

  // console.log("token expiry time:",  decodedData?.data?.tokenExpiryTime);
  // console.log("current time:", currentDate.getTime());

  useEffect(()=>{
    let userData = localStorage.getItem("userData");
    if(userData){
       const decodedData = JSON.parse(atob(userData?.split(".")[1]));
    let currentDate = new Date(); 
    if(decodedData?.exp * 1000 < currentDate.getTime()){
      navigate("/login")
    }
    }
     
    if (!userData) {
      // return <Navigate to="/login"  />;
      navigate("/login")
  
    } else {
      console.log("Valid token");
   
    }
  

  }, [])

  // JWT exp is in seconds
  // if (decodedToken.exp * 1000 < currentDate.getTime()) {
  //   return <Navigate to="/login" replace />;
  // } else {
  //   console.log("Valid token");
  // }

  // function isTokenExpired(token) {
  //   const decodedToken = JSON.parse(atob(token.split(".")[1]));
  //   const expirationDate = new Date(decodedToken.exp * 1000);
  //   return expirationDate < new Date();
  // }
  // if (!userData || decodedData?.data?.tokenExpiryTime > currentDate ) {
  // if (!userData || decodedData?.exp * 1000 < currentDate.getTime()) {
  //   // return <Navigate to="/login"  />;
  //   navigate("/login")

  // } else {
  //   console.log("Valid token");
  // }
  userData = JSON.parse(userData);

  var decoded = jwtDecode(userData?.data?.accessToken);
  console.log("decoded", decoded);
  const handleSideBarClose = () => {
    setIsSidebar(false);
  };
  const toggleSidebar = () => {
    setIsSidebar(!isSidebar);
  };
  return (
    <div id="popup-root" className="app bg-[#ffffff] flex ">
      <Sidebar isSidebarOpen={isSidebar} onClose={handleSideBarClose} />
      <main className="bg-[white] w-full overflow-x-hidden">
        <Topbar setIsSidebar={toggleSidebar} userData={decoded} />

        <Outlet context={[decoded]} />

        {/* <div className="absolute top-4 right-3">
          {" "}
          {posthog.has_opted_out_capturing() || // new
          posthog.has_opted_in_capturing() ? null : (
            <CookieBanner />
          )}
        </div> */}
      </main>
    </div>
  );
};

export default Home;
