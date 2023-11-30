import React, { useEffect, useState } from "react";
import Topbar from "./scene/global/Topbar";
import Sidebar from "./scene/global/Sidebar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";


const Home = () => {
  const navigate = useNavigate();
  const [isSidebar, setIsSidebar] = useState(true);

  

  useEffect(() => {
    // let userData = localStorage.getItem("userData");
    // if (userData) {
    //   const decodedData = JSON.parse(atob(userData?.split(".")[1]));
    //   let currentDate = new Date();
    //   if (decodedData?.exp * 1000 < currentDate.getTime()) {
    //     navigate("/login");
    //     localStorage.removeItem("userData")

    //   }
    // }
    const userData = localStorage.getItem("developerData");

    if (!userData) {
      return <Navigate to="/login"  />;
    } else {
      console.log("Valid token");
    }
  }, );
  // userData = JSON.parse(userData);

  // var decoded = jwtDecode(userData?.data?.accessToken);
  var decoded = "hello"
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
        <Outlet context={[decoded]} />
      </main>
    </div>
  );
};

export default Home;
