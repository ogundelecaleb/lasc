import React, { useState } from "react";
import Topbar from "./scene/global/Topbar";
import Sidebar from "./scene/global/Sidebar";
import { Navigate, Outlet, redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Home = () => {

  const [isSidebar, setIsSidebar] = useState(true);
  let userData = localStorage.getItem('userData');
  // console.log(userData)
  console.log(userData)

  function isTokenExpired(token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(decodedToken.exp * 1000);
    return expirationDate < new Date();
  }
  if (!userData) {
    return <Navigate to="/login" replace />;
  }
  userData = JSON.parse(userData);

  var decoded = jwtDecode(userData?.data?.accessToken);
  console.log("decoded", decoded)
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

        <Outlet />
      </main>
    </div>
  );
};

export default Home;
