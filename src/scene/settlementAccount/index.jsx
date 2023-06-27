import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import api from "../../api";
import { enqueueSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import Moment from "moment";
import Modal from "../../components/Modal";
import { useEffect } from "react";

const SettlementAccount = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [bank, setBank] = useState("");
  const [country, setCountry] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");

  const [merchantData, setMerchantData] = useState("");

  const handleUpdateModalOpen = (id) => {
    setAccountNumber(id.accountNumber);
    setAccountName(id.accountName);
    setBank(id.bankCode);
    setCountry(id.countryCode);
    setMerchantData(id.id);
    setIsOpen(true);
  };

  // const clearForm = () => {
  //   setAccountNumber("")
  //   setAccountName("")
  //   setBank("")
  //   setCountry("")
  // }

  const handleUpdateModalClose = () => {
    setIsOpen(false);
  };

  function formatTime(date) {
    const datetime = Moment(date);
    const formattedTime = datetime.format("hh.mm A");
    return formattedTime;
  }
  function formatDate(datetimeStr) {
    const date = Moment(datetimeStr);
    const formattedDate = date.format("MMM DD, YYYY");

    return formattedDate;
  }

  async function createSettlementAcct(e) {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await api.createSettlementAcct({
        bankCode: bank,
        countryCode: country,
        accountName,
        accountNumber,
      });
      console.log("res of transactionAcess==>>>>>", response);
      enqueueSnackbar("Settlement Account Created Successfully 😃", {
        variant: "success",
      });
      setLoading(false);
      refetch();
      handleModalClose();
      clearForm();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setLoading(false);
    }
  }

  const handleModalOpen = () => {
    setIsCreateOpen(true);
  };

  const handleModalClose = () => {
    setIsCreateOpen(false);
  };

  useEffect(() => {
    console.log(merchantData);
  });

  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(
    ["getSettlementAcct"],
    () => getSettlementAcct(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  const countryQuery = useQuery(["getContries"], () => getContries(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  async function getContries() {
    try {
      const response = await api.getContries();
      console.log("All Countries", response);
      // console.log(merchantData);
      return response;
    } catch (error) {
      return error;
    }
  }

  function clearForm() {
    setBank("");
    setCountry(" ");
    setAccountName("");
    setAccountNumber("");
    // setSwiftCode("");
    // setIbanCode("");
  }

  async function getSettlementAcct() {
    try {
      const response = await api.getSettlementAcct();
      console.log("settlement account", response);
      // console.log(merchantData);
      return response;
    } catch (error) {
      return error;
    }
  }

  async function updateSettlementAcct(e) {
    e.preventDefault();

    setUpdateLoading(true);
    try {
      const response = await api.updateSettlementAcct({
        bankCode: bank,
        countryCode: country,
        accountName,
        accountNumber,
        Id: merchantData,
      });
      console.log("res of vendors==>>>>>", response);
      enqueueSnackbar("Settlement Account Updated Successfully 😃", {
        variant: "success",
      });
      setUpdateLoading(false);
      refetch();
      handleModalClose();
      clearForm();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setUpdateLoading(false);
    }
  }

  return (
    <div className="mt-2  mx-6">
      {/* search and filter button */}
      <div className="lg:flex lg:justify-between items-center mb-8 ">
        <div className="flex items-center">
          <button
            onClick={handleModalOpen}
            className="px-6 py-2 bg-[#124072]  text-[white] text-[14px] h-[48px] leading-[21px] tracking-[0.2px] font-extrabold rounded-xl flex items-center mr-4 "
          >
            <svg
              className="mr-1"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3.33331V12.6666"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.33331 8H12.6666"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            New Account
          </button>
        </div>
      </div>
      {/* end search and filter button */}

      {/* table */}

      <div className="flex flex-col break-words overflow-x-auto bg-white  mb-6">
        <table className="min-w-full mb-6">
          <thead>
            <tr className="mb-2">
              <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                Account Name
              </th>

              <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                Bank Account
              </th>
              <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                Bank Name
              </th>
              <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                Country
              </th>
              <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && !isPreviousData && <div>Loading...</div>}
            {!isLoading && data?.data?.length === 0 && (
              <tr>
                <td className="text-center" colspan="6">
                  <img src="./nodata.gif" className="mx-auto mt-6 " alt="" />
                  <h3 className="text-[30px] leading-[35px]  text-[#1A202C] font-extrabold mb-[6px]">
                    No Data
                  </h3>
                </td>
              </tr>
            )}
            {data && data?.data && (
              <tr className="mb-2">
                <td className=" py-[24px] pr-3 border-t border-[#EDF2F7]  lg:flex items-center  ">
                  {data.data?.accountName}
                </td>
                <td className=" py-[28px] pr-3 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                  {data.data?.accountNumber}
                </td>
                <td className=" py-[28px] pr-3 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                  {data.data?.bankName}
                </td>
                <td className=" py-[28px] pr-3 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                  {data.data?.countryCode}
                </td>

                <td className=" py-[24px] border-t border-[#EDF2F7]  ">
                  <button
                    onClick={() => handleUpdateModalOpen(data.data)}
                    className=" text-sm border border-[#E2E8F0] hover:bg-[#CBD5E0] px-[6px] py-[6px] rounded-[8px] "
                  >
                    Edit
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* {data && data.data && data?.data?.results.length > 0 && (
          <div className="flex justify-between items-center">
            <div className="mt-4 flex justify-center text-gray-500 text-sm">
              <span className="mr-2">
                Showing {data.data.firstRowOnPage} - {data.data.lastRowOnPage}{" "}
                of {data.data.rowCount} results
              </span>
              <span className="mr-2">|</span>
              <span className="mr-2">
                Page {data.data.currentPage} of {data.data.pageCount}
              </span>
              <span className="mr-2">|</span>
              <span className="mr-2">Page Size: {data.data.pageSize}</span>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                className="mr-2 px-4 py-2 flex gap-1 disabled:opacity-75 border bg-[#124072] border-transparent text-sm font-medium rounded-md text-[white]  hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#124072]"
                onClick={handlePrevPage}
                disabled={currentPage === 1 || isPreviousData}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 5L7.5 10L12.5 15"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Prev
              </button>
              <button
                className="mr-2 px-4 py-2 flex gap-1 disabled:opacity-75 border bg-[#124072] border-transparent text-sm font-medium rounded-md text-[white]  hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#124072]"
                // onClick={handleNextPage}
                // disabled={currentPage === data.data.pageCount || isPreviousData}
              >
                Next
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 5L12.5 10L7.5 15"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        )} */}
      </div>

      {/* Create New Admin Modal */}
      <Modal isOpen={isCreateOpen} onClose={handleModalClose}>
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-[white] rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="mt-6 flex justify-between mx-5">
            <h3 className="text-[24px] leading-[31px]  text-[#1A202C] font-extrabold">
              Add New Account
            </h3>
            <svg
              onClick={handleModalClose}
              className="cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.9497 7.05032L7.05021 16.9498"
                stroke="#171717"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.05029 7.05032L16.9498 16.9498"
                stroke="#171717"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={createSettlementAcct}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-1 gap-6 pt-4">
                    <div className="flex flex-row gap-2 items-center w-full">
                      <p
                        // htmlFor="firstName"
                        className="text-[#718096] w-[35%] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]"
                      >
                        Bank Name
                      </p>

                      <select
                        type="text"
                        className="block w-[65%]  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        autofocus
                        required
                        value={bank}
                        onChange={(e) => setBank(e.target.value)}
                      >
                        <option value="">select banks </option>
                        <option value="032">Union Bank</option>
                        <option value="001">First Bank of Nigeria</option>
                      </select>
                    </div>
                    <div className="flex flex-row gap-5 items-center w-full">
                      <p className="text-[#718096] w-[35%] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
                        Bank Account
                      </p>
                      <input
                        type="text"
                        className="block w-[65%]  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        placeholder="account number"
                        autofocus
                        required
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-row gap-5 items-center w-full">
                      <p className="text-[#718096] w-[35%] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
                        Account Name
                      </p>
                      <input
                        type="text"
                        className="block w-[65%]  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        placeholder="Account Name"
                        autofocus
                        required
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-row gap-5 items-center w-full">
                      <p className="text-[#718096] w-[35%] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
                        Country
                      </p>
                      <select
                        type="text"
                        className="block w-[65%]  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        autofocus
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value="">select Country </option>

                        {countryQuery.data &&
                          countryQuery.data?.data?.results.map((country) => (
                            <option key={country.id} value={country.countryCode}>{country.countryName}</option>
                          ))}

                        {/* <option value="USA">United State of America</option> */}
                      </select>
                    </div>

                    <div className="">
                      <button
                        type="submit"
                        className="py-4 items-center rounded-[24px] w-full bg-[#124072] text-[white] text-[16px] leading-[24px] tracking-[0.2px] font-extrabold flex justify-center "
                      >
                        Submit{" "}
                        {loading && (
                          <svg
                            className="ml-4 w-6 h-6 text-[white] animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              stroke-width="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      {/* update settlement account*/}
      <Modal isOpen={isOpen} onClose={handleUpdateModalClose}>
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-[white] rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="mt-6 flex justify-between mx-5">
            <h3 className="text-[24px] leading-[31px]  text-[#1A202C] font-extrabold">
              Update Account
            </h3>
            <svg
              onClick={handleUpdateModalClose}
              className="cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.9497 7.05032L7.05021 16.9498"
                stroke="#171717"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.05029 7.05032L16.9498 16.9498"
                stroke="#171717"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={updateSettlementAcct}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-1 gap-6 pt-4">
                    <div className="flex flex-row gap-2 items-center w-full">
                      <p
                        // htmlFor="firstName"
                        className="text-[#718096] w-[35%] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]"
                      >
                        Bank Name
                      </p>

                      <select
                        type="text"
                        className="block w-[65%]  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        autofocus
                        required
                        value={bank}
                        onChange={(e) => setBank(e.target.value)}
                      >
                        <option value="">select banks </option>
                        <option value="032">Union Bank</option>
                        <option value="001">First Bank of Nigeria</option>
                      </select>
                    </div>
                    <div className="flex flex-row gap-5 items-center w-full">
                      <p className="text-[#718096] w-[35%] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
                        Bank Account
                      </p>
                      <input
                        type="text"
                        className="block w-[65%]  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        placeholder="account number"
                        autofocus
                        required
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-row gap-5 items-center w-full">
                      <p className="text-[#718096] w-[35%] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
                        Account Name
                      </p>
                      <input
                        type="text"
                        className="block w-[65%]  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        placeholder="account name "
                        autofocus
                        required
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-row gap-5 items-center w-full">
                      <p className="text-[#718096] w-[35%] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
                        Country
                      </p>

                      <select
                        type="text"
                        className="block w-[65%]  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        autofocus
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value="">select Country </option>
                       
                        {countryQuery.data &&
                          countryQuery.data?.data?.results.map((country) => (
                            <option key={country.id} value={country.countryCode}>{country.countryName}</option>
                          ))}
                       
                      </select>
                    </div>

                    <div className="">
                      <button
                        type="submit"
                        className="py-4 items-center rounded-[24px] w-full bg-[#124072] text-[white] text-[16px] leading-[24px] tracking-[0.2px] font-extrabold flex justify-center "
                      >
                        Submit{" "}
                        {loading && (
                          <svg
                            className="ml-4 w-6 h-6 text-[white] animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              stroke-width="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SettlementAccount;
