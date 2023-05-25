import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import api from "../../api";
import { enqueueSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import Modal from "../../components/Modal";
import { useEffect } from "react";

const SettlementAccount = () => {
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
    setMerchantData(id);
    setIsOpen(true);
  };

  const handleUpdateModalClose = () => {
    setIsOpen(false);
  };



  async function createSettlementAcct(e) {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await api.createSettlementAcct({
        bankCode: bank,
        countryCode:country,
        accountName,
        accountNumber,
      });
      console.log("res of transactionAcess==>>>>>", response);
      enqueueSnackbar("Default Currency Created Successfully 😃", {
        variant: "success",
      });
      setLoading(false);
      // refetch();
      // handleModalClose();
      // clearForm();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setLoading(false);
    }
  }

 const handleModalOpen = () => {
  setIsCreateOpen(true);
 }

 const handleModalClose = () => {
  setIsCreateOpen(false);
 }

  useEffect(() => {
    console.log(merchantData);
  });

  const getSettlementAcctQuery = useQuery(
    ["getSettlementAcct"],
    () => getSettlementAcct(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  // function clearForm() {
  //   setBankCode("");
  //   setBankName(" ");
  //   setBankSortCode("");
  //   setCountryId("");
  //   setSwiftCode("");
  //   setIbanCode("");
  // }

  async function getSettlementAcct() {
    try {
      const response = await api.getSettlementAcct();
      console.log("merchant profile", response);
      console.log(merchantData);
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
        countryCode:country,
        accountName,
        accountNumber,
        id: merchantData,
      });
      console.log("res of vendors==>>>>>", response);
      enqueueSnackbar("Business Profile Created Successfully 😃", {
        variant: "success",
      });
      setUpdateLoading(false);
      getSettlementAcctQuery.refetch();
      // handleModalClose();
      // clearForm();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setUpdateLoading(false);
    }
  }
  // handle toggle

  return (
    <div>
      {" "}
      <div className="px-[40px] py-[20px] overflow-hidden ">
        <h2 className="text-[24px] text-dark font-bold mb-[32px]">
          Settlement Account
        </h2>
        {/* <h2 className="text-[16px] text-grey-600 font-bold mb-3">
          Set Default Currency
        </h2> */}
        <button
          onClick={handleModalOpen}
          className="px-6 py-2 bg-[#124072] text-[white] text-[14px] h-[48px] leading-[21px] tracking-[0.2px] font-extrabold rounded-xl flex items-center mr-4 "
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
          Create Settlement Account
        </button>

        {getSettlementAcctQuery.data && (
          <table>
            <tr className="my-2">
              <th className="text-grey-600 font-bold text-left ">
                 Country:
              </th>
              <td className="py-6 md:pl-3 text-gray-600">
                <p className="md:px-10 ">
                  {getSettlementAcctQuery.data?.data?.countryName}
                </p>
              </td>
            </tr>
            <tr className="my-2">
              <th className="text-grey-600 font-bold text-left ">
                Bank:
              </th>
              <td className="py-6 md:pl-3 text-gray-600">
                <p className="md:px-10 ">
                  {getSettlementAcctQuery.data?.data?.bankName}
                </p>
              </td>
            </tr>
            <tr className="my-2">
              <th className="text-grey-600 font-bold text-left ">Account Number</th>
              <td className="py-6 md:pl-3 text-gray-600">
                <p className="md:px-10 ">
                  {getSettlementAcctQuery.data?.data?.accountNumber}
                </p>
              </td>
            </tr>
            <tr className="my-2">
              <th className="text-grey-600 font-bold text-left ">
               Account Name
              </th>
              <td className="py-6 md:pl-3 text-gray-600">
                <p className="md:px-10 ">
                  {getSettlementAcctQuery.data?.data?.accountName}
                </p>
              </td>
            </tr>
            <tr className="my-2">
              <th className="text-grey-600 font-bold "></th>
              <td className="py-6 md:pl-3 text-grey-600 text-right">
                <button
                  onClick={() =>
                    handleUpdateModalOpen(
                      getSettlementAcctQuery.data?.data?.userId
                    )
                  }
                  className="bg-[blue] text-[white] px-4 py-2 rounded-lg shadow "
                >
                  Edit
                </button>
                {/* <p className="md:px-10 ">{getMerchantProfilenQuery.data?.data?.businessName}</p> */}
              </td>
            </tr>
          </table>
        )}
      </div>
     
      
      {/* create account */}
      <Modal isOpen={isCreateOpen} onClose={handleModalClose}>
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-[white] rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="mt-6 flex justify-between mx-5">
            <h3 className="text-[24px] leading-[31px]  text-[#1A202C] font-extrabold">
              Create Settlement Account
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
                  <div className="grid grid-cols-6 gap-6 pt-4">
                    <div className="col-span-12 sm:col-span-6 ">
                      <p className="text-[#718096] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
                        Country
                      </p>
                      <select
                        type="text"
                        className="block w-full   px-4 py-[9px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        autofocus
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value="">Select Country </option>
                        <option value="NG">Nigeria</option>
                        <option value="GH">Ghana</option>
                      </select>
                    </div>
                    <div className="col-span-12 sm:col-span-6 ">
                      <p
                        // htmlFor="firstName"
                        className="text-[#718096] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]"
                      >
                        Bank
                      </p>
                      <select
                        type="text"
                        className="block w-full   px-4 py-[9px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        autofocus
                        required
                        value={bank}
                        onChange={(e) => setBank(e.target.value)}
                      >
                        <option value="">Select Bank </option>
                        <option value="FBN">First Bank</option>
                        <option value="GTB">GTBank PLC</option>
                      </select>
                    </div>
                    <div className="col-span-12 sm:col-span-6 ">
                      <p className="text-[#718096] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
                        Account Number
                      </p>
                      <input
                        type="text"
                        className="block w-full  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        placeholder="account number"
                        autofocus
                        required
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6 ">
                      <p className="text-[#718096] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
                        Account Name
                      </p>
                      <input
                        type="text"
                        className="block w-full  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        placeholder="account Name"
                        autofocus
                        required
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                      />
                    </div>

                    <div className="col-span-12 sm:col-span-6 mb- mt-6">
                      <button
                        type="submit"
                        className="py-4 items-center rounded-[24px] w-full bg-[#124072] text-[white] text-[16px] leading-[24px] tracking-[0.2px] font-extrabold flex justify-center "
                      >
                        Create Account{" "}
                        {updateLoading && (
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
      {/* {update account} */}
      <Modal isOpen={isOpen} onClose={handleUpdateModalClose}>
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-[white] rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="mt-6 flex justify-between mx-5">
            <h3 className="text-[24px] leading-[31px]  text-[#1A202C] font-extrabold">
              Update Settlement Account
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
                  <div className="grid grid-cols-6 gap-6 pt-4">
                    <div className="col-span-12 sm:col-span-6 ">
                      <p className="text-[#718096] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
                        Country
                      </p>
                      <select
                        type="text"
                        className="block w-full   px-4 py-[9px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        autofocus
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value="">Select Country </option>
                        <option value="NG">Nigeria</option>
                        <option value="GH">Ghana</option>
                      </select>
                    </div>
                    <div className="col-span-12 sm:col-span-6 ">
                      <p
                        // htmlFor="firstName"
                        className="text-[#718096] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]"
                      >
                        Bank
                      </p>
                      <select
                        type="text"
                        className="block w-full   px-4 py-[9px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        autofocus
                        required
                        value={bank}
                        onChange={(e) => setBank(e.target.value)}
                      >
                        <option value="">Select Bank </option>
                        <option value="FBN">First Bank</option>
                        <option value="GH">GTBank PLC</option>
                      </select>
                    </div>
                    <div className="col-span-12 sm:col-span-6 ">
                      <p className="text-[#718096] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
                        Account Number
                      </p>
                      <input
                        type="text"
                        className="block w-full  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        placeholder="account number"
                        autofocus
                        required
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6 ">
                      <p className="text-[#718096] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
                        Account Name
                      </p>
                      <input
                        type="text"
                        className="block w-full  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        placeholder="account Name"
                        autofocus
                        required
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                      />
                    </div>

                    <div className="col-span-12 sm:col-span-6 mb- mt-6">
                      <button
                        type="submit"
                        className="py-4 items-center rounded-[24px] w-full bg-[#124072] text-[white] text-[16px] leading-[24px] tracking-[0.2px] font-extrabold flex justify-center "
                      >
                        Update Account{" "}
                        {updateLoading && (
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
