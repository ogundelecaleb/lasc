import React from "react";
import { useState } from "react";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { MdOutlineContactSupport } from "react-icons/md";
import { BiBookAlt } from "react-icons/bi";
import { BsBoxArrowUpRight } from "react-icons/bs";

const Sidebar = ({ isSidebarOpen, onClose }) => {
  const router = useLocation();

  const [openUsers, setOpenUsers] = useState(false);
  const [settings, setSettings] = useState(true);
  const [openOption, setOpenOption] = useState(false);
  const [openBiller, setOpenBiller] = useState(false);
  const [openStock, setOpenStock] = useState(false);
  console.log(router.pathname);
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
            <svg
              class="mr-[12px]"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.8248 19.4584H5.17484C2.8915 19.4584 1.0415 17.6001 1.0415 15.3167V9.14173C1.0415 8.00839 1.7415 6.58339 2.6415 5.88339L7.13317 2.38339C8.48317 1.33339 10.6415 1.28339 12.0415 2.26673L17.1915 5.87506C18.1832 6.56673 18.9582 8.05006 18.9582 9.25839V15.3251C18.9582 17.6001 17.1082 19.4584 14.8248 19.4584ZM7.89984 3.36673L3.40817 6.86673C2.8165 7.33339 2.2915 8.39173 2.2915 9.14173V15.3167C2.2915 16.9084 3.58317 18.2084 5.17484 18.2084H14.8248C16.4165 18.2084 17.7082 16.9167 17.7082 15.3251V9.25839C17.7082 8.45839 17.1332 7.35006 16.4748 6.90006L11.3248 3.29173C10.3748 2.62506 8.80817 2.65839 7.89984 3.36673Z"
                fill="currentColor"
              />
              <path
                d="M10 16.125C9.65833 16.125 9.375 15.8417 9.375 15.5V13C9.375 12.6583 9.65833 12.375 10 12.375C10.3417 12.375 10.625 12.6583 10.625 13V15.5C10.625 15.8417 10.3417 16.125 10 16.125Z"
                fill="currentColor"
              />
            </svg>
            Dashboard
          </Link>

          {/* My settlements */}
          <Link
            to="/settlement"
            className={`mx-[24px] py-[13px] px-[16px]  flex tracking-[0.2px] font-medium text-[14px] leading-[21px] items-end mb-[12px] ${
              window.location.pathname === "/settlement"
                ? "bg-[#124072] text-[white] rounded-xl"
                : "text-[#718096]"
            }`}
          >
            <svg
              class="mr-[12px]"
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 5.1333H18.3333"
                stroke="#718096"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M11.85 2.16663H16.4833C17.9667 2.16663 18.3333 2.53329 18.3333 3.99996V7.42496C18.3333 8.89163 17.9667 9.25829 16.4833 9.25829H11.85C10.3667 9.25829 10 8.89163 10 7.42496V3.99996C10 2.53329 10.3667 2.16663 11.85 2.16663Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M1.6665 14.7167H9.99984"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M3.5165 11.75H8.14984C9.63317 11.75 9.99984 12.1167 9.99984 13.5833V17.0083C9.99984 18.475 9.63317 18.8417 8.14984 18.8417H3.5165C2.03317 18.8417 1.6665 18.475 1.6665 17.0083V13.5833C1.6665 12.1167 2.03317 11.75 3.5165 11.75Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M18.3333 13C18.3333 16.225 15.725 18.8333 12.5 18.8333L13.375 17.375"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M1.6665 7.99996C1.6665 4.77496 4.27484 2.16663 7.49984 2.16663L6.62485 3.62496"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            Settlements
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

          {/* Users */}
          <Link
            to="/merchant"
            className={`mx-[24px] py-[13px] px-[16px]  flex tracking-[0.2px] font-medium text-[14px] leading-[21px] items-end mb-[12px] ${
              window.location.pathname === "/merchant"
                ? "bg-[#124072] text-[white] rounded-xl"
                : "text-[#718096]"
            }`}
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
            My Team
          </Link>

          {/* Settings */}

          <button
            onClick={() => setSettings(!settings)}
            // to="/dashboard"
            className={`mx-[24px]  px-[16px] py-[13px] flex tracking-[0.2px] font-medium text-[14px] leading-[21px] items-end  mb-[12px] ${
              window.location.pathname === "/businessProfile" ||
              window.location.pathname === "/settlementAccount" ||
              window.location.pathname === "/apikey"
                ? "bg-[#124072] text-[white] rounded-xl"
                : "text-[#718096]"
            }`}
          >
            <FiSettings className="mr-[12px] text-xl" />
            Settings
          </button>
          {settings && (
            <div className={`ml-[50px] mb-3 `}>
              <div className="border-l border-[#E2E8F0]">
                <Link
                  to="/apikey"
                  className={` px-[16px]  flex tracking-[0.2px] text-[14px] leading-[21px]  mb-[8px] hover:text-[#124072] ${
                    window.location.pathname === "/apikey"
                      ? " text-[#124072] font-extrabold  "
                      : "text-[#718096] font-medium "
                  }`}
                >
                  API Key
                </Link>
                <Link
                  to="/businessProfile"
                  className={` px-[16px]  flex tracking-[0.2px] text-[14px] leading-[21px]  mb-[8px] hover:text-[#124072] ${
                    window.location.pathname === "/businessProfile"
                      ? " text-[#124072] font-extrabold"
                      : "text-[#718096] font-medium"
                  }`}
                >
                  Bussiness Profile
                </Link>
                <Link
                  to="/settlementAccount"
                  className={` px-[16px]  flex tracking-[0.2px] text-[14px] leading-[21px]  mb-[8px] hover:text-[#124072] ${
                    window.location.pathname === "/settlementAccount"
                      ? " text-[#124072] font-extrabold"
                      : "text-[#718096] font-medium"
                  }`}
                >
                  Settlement Account
                </Link>
              </div>
            </div>
          )}

          {/* more option */}
          <div className="absolute bottom-5">
            {openOption && (
              <div className={`ml-[50px] mb-1 `}>
                <div className="border-l border-[#E2E8F0]">
                  <Link
                    to="https://paylodeservices.com/support"
                    target="_blank"
                    className={` px-[16px]  flex tracking-[0.2px] text-[14px] leading-[21px]  mb-[5px] hover:text-[#124072] ${
                      window.location.pathname === "/CustomerSupport"
                        ? " text-[#124072] font-extrabold"
                        : "text-[#718096] font-medium"
                    }`}
                  >
                    Customer Support
                  </Link>
                  <Link
                    to="/faq"
                    className={` px-[16px]  flex tracking-[0.2px] text-[14px] leading-[21px]  hover:text-[#124072] ${
                      window.location.pathname === "/faq"
                        ? " text-[#124072] font-extrabold"
                        : "text-[#718096] font-medium"
                    }`}
                  >
                    FAQ
                  </Link>
                </div>
              </div>
            )}
            <button
              onClick={() => setOpenOption(!openOption)}
              className={`mx-[24px]  px-[16px] py-[8px] flex tracking-[0.2px] font-medium text-[14px] leading-[21px] items-end   ${
                window.location.pathname === "/faq" ||
                window.location.pathname === "/customersupport"
                  ? "bg-[#124072] text-[white] rounded-xl"
                  : "text-[#718096]"
              }`}
            >
              <MdOutlineContactSupport className="mr-[12px] text-xl" />
              Support
            </button>

            <Link to="http://94.229.79.27:65123/" target="_blank">
              <button
                onClick={() => setSettings(!settings)}
                // to="/dashboard"
                className={`mx-[24px]  px-[16px] py-[13px] flex tracking-[0.2px] font-medium text-[14px] leading-[21px] items-center  mb-[12px] ${
                  window.location.pathname === "/businessProfile" ||
                  window.location.pathname === "/settlementAccount" ||
                  window.location.pathname === "/apikey"
                    ? "bg-[#124072] text-[white] rounded-xl"
                    : "text-[#718096]"
                }`}
              >
                <BiBookAlt className="mr-[12px] text-xl" />
                Developer Docs{" "}
                <BsBoxArrowUpRight className="ml-[6px] text-md" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
