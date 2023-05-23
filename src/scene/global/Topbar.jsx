import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api";
import Modal from "../../components/Modal";

const Topbar = ({ setIsSidebar, userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleIsModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleIsModalClose = () => {
    setIsModalOpen(false);
  };

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
            : location.pathname === "/bank"
            ? "Bank"
            : location.pathname === "/channel"
            ? "Channel"
            : location.pathname === "/wallet"
            ? "Wallet"
            : location.pathname === "/country"
            ? "Country"
            : location.pathname === "/merchant"
            ? "Merchant"
            : location.pathname === "/name"
            ? "Name"
            : location.pathname === "/userAdmin"
            ? "User Admin"
            : location.pathname === "/isActive"
            ? "IsActive"
            : location.pathname === "/accountDetails"
            ? "Account Details"
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
              <svg
                class="mr-[12px]"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="16" r="16" fill="#C4C4C4" />
              </svg>
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

          {/* <img
            src="./profile-pic.png"
            alt="profile-pic"
            className="h-[32px] rounded-full "
          />
          <h3>Emmanuel .O</h3>
          <button
            onClick={() => {
              if (isOpen === false) {
                setIsOpen(true);
              } else {
                setIsOpen(false);
              }
            }}
          >
            <img
              src="./dropdown.png"
              alt="dropdown icon"
              className="h-[16px]"
            />
          </button> */}
        </div>

        {/* Create filter Modal */}
        <Modal isOpen={isModalOpen} onClose={handleIsModalClose}>
          <div className="inline-block absolute px-4 pb-3 right-4 top-10 overflow-hidden text-left align-bottom transition-all transform bg-[white] rounded-2xl shadow-xl sm:my-8 sm:align-middle ">
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
                  setIsOpen(false);
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
                  setIsOpen(false);
                }}
                className="flex flex-row gap-[12px] pt-[23px] cursor-pointer mb-3"
              >
                <img src="./logout.png" alt="" />
                <p className=" text-[#1a202c] text-[14px] ">Log out</p>
              </div>
            </div>
          </div>
        </Modal>

        {/* {isOpen ? (
          <div className="border-[#edf2f7] py-[17px] px-[16px] w-[200px] max-w-[200px]  rounded-[10px] absolute bg-[#ffffff] right-[20px] top-[70px] drop-shadow-lg z-10 ">
            <div className=" border-b-[#edf2f7] border-b pb-[17px]">
              <h3 className="text-[16px] font-bold text-[#1a202c] pb-[4px]">
                {userData.fullName}
              </h3>
            </div>
            <div
              onClick={() => {
                navigate("/client");
                setIsOpen(false);
              }}
              className="flex flex-row gap-[12px] pt-[17px] cursor-pointer"
            >
              <svg
                className="mr-[12px]"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 9.16667C11.841 9.16667 13.3334 7.67428 13.3334 5.83333C13.3334 3.99238 11.841 2.5 10 2.5C8.15907 2.5 6.66669 3.99238 6.66669 5.83333C6.66669 7.67428 8.15907 9.16667 10 9.16667Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5 17.5V15.8333C5 14.9493 5.35119 14.1014 5.97631 13.4763C6.60143 12.8512 7.44928 12.5 8.33333 12.5H11.6667C12.5507 12.5 13.3986 12.8512 14.0237 13.4763C14.6488 14.1014 15 14.9493 15 15.8333V17.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p className=" text-[#1a202c] text-[14px] ">My Profile</p>
            </div>
            <div
              onClick={() => {
                navigate("/accountDetails");
                setIsOpen(false);
              }}
              className="flex flex-row gap-[12px] pt-[17px] cursor-pointer"
            >
              <img src="./profile.png" alt="" />
              <p className=" text-[#1a202c] text-[14px] ">Update Profile</p>
            </div>
            <div
              onClick={() => {
                // navigate("/login");
                api.logout();
                navigate("/login");
                setIsOpen(false);
              }}
              className="flex flex-row gap-[12px] pt-[23px] cursor-pointer"
            >
              <img src="./logout.png" alt="" />
              <p className=" text-[#1a202c] text-[14px] ">Log out</p>
            </div>
          </div>
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
};

export default Topbar;
