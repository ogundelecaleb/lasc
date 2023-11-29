import React from "react";
import { useState } from "react";
// import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import { CgToolbox } from "react-icons/cg";
import { MdOutlineContactSupport, MdOutlineDashboard } from "react-icons/md";
import { TbTransferOut } from "react-icons/tb";
import { HiUserGroup } from "react-icons/hi";


const Sidebar = ({ isSidebarOpen, onClose }) => {
  const [settings, setSettings] = useState(false);
  const [openOption, setOpenOption] = useState(false);

  return (
    <div
      className={` lg:block lg:relative ${
        isSidebarOpen ? "block z-20 fixed inset-0 transition-opacity" : "hidden"
      }`}
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#29292980]  transition-opacity lg:relative"
      ></div>
      <div class="absolute top-0 right-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
        <button
          onClick={onClose}
          type="button"
          class="rounded-md text-gray-700 hover:text-[white] focus:outline-none focus:ring-2 focus:ring-[white]"
        >
          <span class="sr-only">Close panel</span>

          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="max-w-[250px] min-h-screen bg-[#E2E8F0]   pt-5 pb-4 sticky top-0  ">
        <div className="relative">
          <div className="relative min-h-screen overflow-y-visible">
            <img
              class="ml-[37px] mr-[81px] mb-[48px] pb-[18px] border-b border-[#E2E8F0] "
              src="./logo.svg"
              alt="logo"
            />

            <Link
              to="/dashboard"
              className={`mx-[24px] py-[13px] pl-[17px] pr-[77px] flex tracking-[0.2px] font-medium text-[14px] leading-[21px] items-end mb-[12px] ${
                window.location.pathname === "/dashboard"
                  ? "bg-[#124072] text-[white] rounded-xl"
                  : "text-[#718096]"
              }`}
            >
              <MdOutlineDashboard className="mr-[12px] text-xl" />
              Dashboard
            </Link>
             {/* transaction */}
             <Link
              to="/transaction"
              className={`mx-[24px] py-[13px] px-[16px]  flex tracking-[0.2px] font-medium text-[14px] leading-[21px] items-end mb-[12px] ${
                window.location.pathname === "/transaction"
                  ? "bg-[#124072] text-[white] rounded-xl"
                  : "text-[#718096]"
              }`}
            >
              <svg
                // className="h-[22px] w-[22px]"
                className="mr-[12px]"
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.25 13.3333L13.75 7.83333L8.25 13.3333ZM8.70834 8.29167H8.7175H8.70834ZM13.2917 12.875H13.3008H13.2917ZM17.4167 19.75V5.08333C17.4167 4.5971 17.2235 4.13079 16.8797 3.78697C16.5359 3.44315 16.0696 3.25 15.5833 3.25H6.41667C5.93044 3.25 5.46412 3.44315 5.12031 3.78697C4.77649 4.13079 4.58334 4.5971 4.58334 5.08333V19.75L7.79167 17.9167L11 19.75L14.2083 17.9167L17.4167 19.75ZM9.16667 8.29167C9.16667 8.41322 9.11838 8.5298 9.03243 8.61576C8.94647 8.70171 8.82989 8.75 8.70834 8.75C8.58678 8.75 8.4702 8.70171 8.38425 8.61576C8.29829 8.5298 8.25 8.41322 8.25 8.29167C8.25 8.17011 8.29829 8.05353 8.38425 7.96758C8.4702 7.88162 8.58678 7.83333 8.70834 7.83333C8.82989 7.83333 8.94647 7.88162 9.03243 7.96758C9.11838 8.05353 9.16667 8.17011 9.16667 8.29167ZM13.75 12.875C13.75 12.9966 13.7017 13.1131 13.6158 13.1991C13.5298 13.285 13.4132 13.3333 13.2917 13.3333C13.1701 13.3333 13.0535 13.285 12.9676 13.1991C12.8816 13.1131 12.8333 12.9966 12.8333 12.875C12.8333 12.7534 12.8816 12.6369 12.9676 12.5509C13.0535 12.465 13.1701 12.4167 13.2917 12.4167C13.4132 12.4167 13.5298 12.465 13.6158 12.5509C13.7017 12.6369 13.75 12.7534 13.75 12.875Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Transactions
            </Link>

            {/* My settlements */}
            <Link
              to="/merchant"
              className={`mx-[24px] py-[13px] px-[16px]  flex tracking-[0.2px] font-medium text-[14px] leading-[21px] items-end mb-[12px] ${
                window.location.pathname === "/merchant"
                  ? "bg-[#124072] text-[white] rounded-xl"
                  : "text-[#718096]"
              }`}
            >
             <CgToolbox  className="mr-[12px] text-xl" />
              Merchants
            </Link>

           

            {/* Payment Link */}
            <Link
              to="/withdraw"
              className={`mx-[24px] py-[13px] px-[16px]  flex tracking-[0.2px] font-medium text-[14px] leading-[21px] items-center mb-[12px] ${
                window.location.pathname === "/withdraw"
                  ? "bg-[#124072] text-[white] rounded-xl"
                  : "text-[#718096]"
              }`}
            >
              <TbTransferOut  className="mr-[12px] text-xl"/>
              Withdrawal
            </Link>

            {/* Users */}
            <Link
              to="/referral"
              className={`mx-[24px] py-[13px] px-[16px]  flex tracking-[0.2px] font-medium text-[14px] leading-[21px] items-end mb-[12px] ${
                window.location.pathname === "/referral"
                  ? "bg-[#124072] text-[white] rounded-xl"
                  : "text-[#718096]"
              }`}
            >
              <HiUserGroup className="mr-[12px] text-xl"  />
              Refferal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
