import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api";
import Modal from "../../components/Modal";
import Dropdown from "../../components/dropdown";
import { useQuery } from "@tanstack/react-query";
import {IoMdInformationCircleOutline} from "react-icons/io"
// import {IoMdInformationCircleOutline} from "react-icons/io"

const Topbar = ({ setIsSidebar, userData }) => {
  const [logo, setLogo] = useState("")
  // const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

 
  const handleIsModalClose = () => {
    setIsModalOpen(false);
  };

  useQuery(
    ["getMerchantProfile"],
    () => getMerchantProfile(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  async function getMerchantProfile() {
    try {
      const response = await api.getMerchantProfile();
      console.log("merchant profile", response);
      setLogo(response.data?.logoUrl);
      // console.log(document.getElementById("profile"));
      console.log("logo", response.data?.logoUrl);
      return response;
    } catch (error) {
      return error;
    }
  }

  return (
    <div className="flex w-full items-center justify-between px-6 gap-[16px] pt-6">
      <div className="flex items-center">
        <button
          class="h-12 w-12 bg-[#FAFAFA] px-3 py-3 rounded-full lg:hidden mr-2"
          onClick={setIsSidebar}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20"
              stroke="#1A202C"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 12H20"
              stroke="#1A202C"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 18H20"
              stroke="#1A202C"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <h4 className="text-[24px] text-[#1a202c] font-bold hidden md:block">
          {location.pathname === "/dashboard"
            ? "Dashboard"
            : location.pathname === "/transaction"
            ? "Transactions"
            : location.pathname === "/settlement"
            ? "Settlements"
            : location.pathname === "/merchant"
            ? "Mercahnts"
            : location.pathname === "/apikey"
            ? "API Credentials"
            : location.pathname === "/businessProfile"
            ? "Business Profile"
            : location.pathname === "/settlementAccount"
            ? "Settlement Account"
            : location.pathname === "/name"
            ? "Name"
            : location.pathname === "/userAdmin"
            ? "User Admin"
            : location.pathname === "/isActive"
            ? "IsActive"
            : location.pathname === "/accountDetails"
            ? "Account Details"
            : location.pathname === "/withdraw"
            ? "Withdrawal"
            : location.pathname === "/currency"
            ? "Currency"
            : ""}
        </h4>{" "}
      </div>
      <div className="flex flex-row gap-3">
        <div className="flex  gap-[12px] p-[8px] bg-gray-100/50  items-center rounded-[18px]">
          <div class="bg-[#FAFAFA] rounded-full h-[48px] w-[48px] px-3 py-3 hidden lg:block ">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.6665 5.83333C11.6665 5.21449 11.9123 4.621 12.3499 4.18342C12.7875 3.74583 13.381 3.5 13.9998 3.5C14.6187 3.5 15.2122 3.74583 15.6498 4.18342C16.0873 4.621 16.3332 5.21449 16.3332 5.83333C17.673 6.46687 18.8151 7.45305 19.6372 8.68618C20.4593 9.91932 20.9304 11.3529 20.9998 12.8333V16.3333C21.0876 17.0587 21.3445 17.7532 21.7498 18.3611C22.1551 18.9691 22.6974 19.4733 23.3332 19.8333H4.6665C5.30227 19.4733 5.84461 18.9691 6.24989 18.3611C6.65516 17.7532 6.91204 17.0587 6.99984 16.3333V12.8333C7.06932 11.3529 7.54036 9.91932 8.36245 8.68618C9.18454 7.45305 10.3267 6.46687 11.6665 5.83333"
                stroke="#1A202C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.5 19.8334V21C10.5 21.9283 10.8687 22.8185 11.5251 23.4749C12.1815 24.1313 13.0717 24.5 14 24.5C14.9283 24.5 15.8185 24.1313 16.4749 23.4749C17.1313 22.8185 17.5 21.9283 17.5 21V19.8334"
                stroke="#1A202C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
         {/* <Dropdown
          button={
            <p className="cursor-pointer">
              <IoMdInformationCircleOutline className="h-4 w-4 text-gray-600 dark:text-white" />
            </p>
          }
          children={
            <div className="flex flex-col w-[200px] max-w-[200px] justify-between mx-0 mt-4 bg-[white] shadow">
            <div className=" border-b-[#edf2f7] border-b pb-[17px]">
              <h3 className="text-[16px] font-bold text-[#1a202c] pb-[4px]">
                {userData.fullName}
              </h3>
              <p className="text-[12px] text-[#718096]">
                {userData.role} account
              </p>
            </div>

            <div
              onClick={() => {
                handleIsModalClose();
                navigate("/accountDetails");
                // setIsOpen(false);
              }}
              className="flex flex-row gap-[12px] pt-[17px] mb-3 cursor-pointer"
            >
              <img src="./profile.png" alt="" />
              <p className=" text-[#1a202c] text-[14px] ">My Profile</p>
            </div>
            <div
              onClick={() => {
                // navigate("/login");
                handleIsModalClose();
                api.logout();
                navigate("/login");
                localStorage.removeItem("userData");
                // setIsOpen(false);
              }}
              className="flex flex-row gap-[12px] pt-[23px] cursor-pointer mb-3"
            >
              <img src="./logout.png" alt="" />
              <p className=" text-[#1a202c] text-[14px] ">Log out</p>
            </div>
          </div>
          }
          classNames={"py-2 top-6 -left-[250px] md:-left-[330px] w-max"}
          animation="origin-[75%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
        /> */}
          <div
            class="bg-[#FAFAFA] rounded-[1000px]  items-center lg:pl-[8px] lg:pr-[16px] pl-[6px] pr-[14px] py-2 flex cursor-pointer "
            onClick={() => {
              if (isModalOpen === false) {
                setIsModalOpen(true);
              } else {
                setIsModalOpen(false);
              }
            }}
          >
            <div class="flex items-center lg:mr-[14px] mr-[12px]">
            <img
            src={logo || "../avatar.png"}
            alt=""
            className="border object-contain  w-[30px] md:w-[40px]  lg:w-[40px]  h-[30px] md:h-[40px]  lg:h-[40px] bg-[#b3c2d6] border-dark-blue rounded-full p-1 mr-2  lg:mr-4"
          />
              <h4 class="text-[#1A202C] lg:text-[16px] lg:leading-[24px] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold ">
                {userData.fullName}
              </h4>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#718096"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

       
        </div>

        {/* Create filter Modal */}
        <Modal isOpen={isModalOpen} onClose={handleIsModalClose}>
          <div className="inline-block absolute px-4 pb-3 right-4 top-10 overflow-hidden text-left align-bottom transform bg-[white] rounded-2xl shadow-xl sm:my-8 sm:align-middle  origin-top-right transition-all duration-300 ease-in-out">
            <div className="flex flex-col w-[200px] max-w-[200px] justify-between mx-0 mt-4">
              <div className=" border-b-[#edf2f7] border-b pb-[17px]">
                <h3 className="text-[16px] font-bold text-[#1a202c] pb-[4px]">
                  {userData.fullName}
                </h3>
                <p className="text-[12px] text-[#718096]">
                  {userData.role} account
                </p>
              </div>

              <div
                onClick={() => {
                  handleIsModalClose();
                  navigate("/accountDetails");
                  // setIsOpen(false);
                }}
                className="flex flex-row gap-[12px] py-[17px] rounded-lg px-2  cursor-pointer hover:bg-[#b3c2d6]"
              >
                <img src="./profile.png" alt="" />
                <p className=" text-[#1a202c] text-[14px] ">My Profile</p>
              </div>
              <div
                onClick={() => {
                  // navigate("/login");
                  handleIsModalClose();
                  api.logout();
                  navigate("/login");
                  // setIsOpen(false);
                }}
                className="flex flex-row gap-[12px]  py-[17px] rounded-lg px-2 cursor-pointer mb-3 hover:bg-[#b3c2d6]"
              >
                <img src="./logout.png" alt="" />
                <p className=" text-[#1a202c] text-[14px] ">Log out</p>
              </div>
            </div>
          </div>
        </Modal>

     
      </div>
    </div>
  );
};

export default Topbar;
