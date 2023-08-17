import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const AccountDetails = () => {
  const navigate = useNavigate();
  const router = useLocation();
  return (
    <div className="flex flex-col md:flex-row  border-t border-t-faint w-full">
      <div className="max-w-[367px] w-[367px] flex flex-row md:flex-col left-0 border-r border-r-faint  ">
        <div
          onClick={() => navigate("/accountDetails/personalInfo")}
          className={`flex  flex-row items-center cursor-pointer gap-3 py-[24px] px-[20px]  ${
            router.pathname === "/accountDetails/personalInfo"
              ? "bg-[#fafafa] rounded-lg border-l-dark-blue border-l-[5px]"
              : router.pathname === "/accountDetails"
              ? "bg-[#fafafa] rounded-lg border-l-[5px] border-l-dark-blue"
              : ""
          }`}
        >
          <div className="py-[15px] px-[18px] bg-[#ffff] rounded-full">
            <img src="../profile.png" alt="" className="h-[24px] " />
          </div>

          <div>
            <p className="text-[14px] font-bold text-dark ">
              Personal Information
            </p>
            <p className="text-[12px] text-grey-600 ">
              Edit Name and Email Address{" "}
            </p>
          </div>
        </div>

        <div
          onClick={() => navigate("/accountDetails/loginSecurity")}
          className={`flex  flex-row items-center cursor-pointer gap-3 py-[24px] px-[20px] ${
            router.pathname === "/accountDetails/loginSecurity"
              ? "bg-[#fafafa] rounded-lg border-l-dark-blue border-l-[5px]"
              : ""
          }`}
        >
          <div className="py-[15px] px-[18px] bg-[#f7fafc] rounded-full">
            <img src="../shield.png" alt="" className="h-[24px] " />
          </div>

          <div>
            <p className="text-[14px] font-bold text-dark ">
              Login and Security
            </p>
            <p className="text-[12px] text-grey-600 ">Manage Password </p>
          </div>
        </div>
        </div>
       

      <Outlet />
    </div>
  );
};

export default AccountDetails;
