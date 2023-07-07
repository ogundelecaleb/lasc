import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import api from "../../api";
import { enqueueSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import Modal from "../../components/Modal";
import { useEffect } from "react";

const BusinessProfile = () => {
  const BaseApiUrl = "http://94.229.79.27:55412/api/v1";
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keyloading, setKeyLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [merchantFullName, setMerchantFullName] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [bvn, setBvn] = useState("");
  const [pin, setPin] = useState("");
  const [businessAddresss, setBusinessAddresss] = useState("");
  const [defaultCurrency, setDefualtCurrency] = useState("");
  const [merchantData, setMerchantData] = useState("");
  const [logo, setLogo] = useState("");
  const [file, setFile] = useState("");
  const [logoLoading, setLogoLoading] = useState(false);
  const [publicCopySuccess, setPublicCopySuccess] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const handleUpdateModalOpen = (id) => {
    setMerchantData(id.userId);
    setBusinessAddresss(id.businessAddresss);
    setBusinessName(id.businessName);
    setBvn(id.bvn);
    setIsOpen(true);
  };

  const handleUpdateModalClose = () => {
    setIsOpen(false);
  };





  async function createTransactionAccess(e) {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await api.createTransactionAccess({
        defaultCurrency: defaultCurrency,
      });
      console.log("res of transactionAcess==>>>>>", response);
      enqueueSnackbar("Default Currency Created Successfully", {
        variant: "success",
      });
      setLoading(false);
      // refetch();
      // handleModalClose();
      clearForm();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setLoading(false);
    }
  }

  const handlePinSubmit = (e) => {
    createTransactionAccess(e);
  };

  const handleSubmit = (e) => {
    createTransactionAccess(e);
  };
  useEffect(() => {
    console.log(merchantData);
  });

  const getMerchantProfilenQuery = useQuery(
    ["getMerchantProfile"],
    () => getMerchantProfile(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  function clearForm() {
    setBusinessName("");
    setBusinessAddresss(" ");
    setBvn("");
   
  }

  async function getMerchantProfile() {
    try {
      const response = await api.getMerchantProfile();
      console.log("merchant profile", response);
      setLogo(response.data?.logoUrl);
      console.log(merchantData);
      return response;
    } catch (error) {
      return error;
    }
  }

  async function createProfile(e) {
    e.preventDefault();

    setUpdateLoading(true);
    try {
      const response = await api.createProfile({
        // industryType,
        bvn,
        // merchantFullName,
        businessName,
        businessAddresss,
        id: merchantData,
      });
      console.log("res of vendors==>>>>>", response);
      enqueueSnackbar("Business Profile Created Successfully 😃", {
        variant: "success",
      });
      setUpdateLoading(false);
      getMerchantProfilenQuery.refetch();
      handleUpdateModalClose();
      // clearForm();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setUpdateLoading(false);
    }
  }
  // handle toggle

  async function upload(e) {
    let userData = localStorage.getItem("userData");

    userData = JSON.parse(userData);
    const token = "Bearer " + userData.data.accessToken;
    console.log(userData.data.accessToken, "header");

    const profile = document.getElementById("profile");
    const formData = new FormData();
    formData.append("Image", profile.files[0]);
    console.log("imagefile", formData.get("Image").name);
    console.log("imagefile", formData.get("Image").type);
    e.preventDefault();
    setLogoLoading(true);
    const response = await fetch(`${BaseApiUrl}/merchant/upload`, {
      method: "POST",
      headers: {
        Authorization: token,
        accept: "application/json",
        // 'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
    const data = await response.json();
    if (data.isSuccessful && data.data) {
      setLogoLoading(false);
      getMerchantProfilenQuery.refetch()
      enqueueSnackbar("Image uploaded successfully", { variant: "success" });
    } else {
      setLogoLoading(false);
      console.log("error message: not successful");
    }
  }

  return (
    <div>
      {" "}
      <div className="px-[40px] py-[20px] ">
        <div className="w-full pb-1 mb-[28px] border-b border-b-[#EDF2F7]">
          <h2 className="text-[24px] text-dark font-bold">
            Bussiness Details
          </h2>
        </div>
        <div className="flex flex-row items-center mb-[30px] ">
          <img
            src={logo || "../avatar.png"}
            alt=""
            className="border object-contain  w-[30px] md:w-[48px]  lg:w-[78px]  h-[30px] md:h-[48px]  lg:h-[78px] bg-[#b3c2d6] border-dark-blue rounded-full p-1 mr-2 lg:p-2 lg:mr-4"
          />

          <button
            onClick={upload}
            className="py-[7px] px-[12px] flex items-center   lg:py-[11px] lg:px-[20px] bg-dark-blue text-[#fafafa] text-[12px] font-bold mr-3 rounded-lg"
          >
            Upload Logo
            {logoLoading && (
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
          <input
            type="file"
            id="profile"
            name="profile"
            onChange={(e) => setFile(e.target.value)}
          />
        </div>

        {getMerchantProfilenQuery.data && (
          <table>
            <tr className="my-2 rounded-xl ">
              <th className="text-grey-600 font-bold text-left ">
                Business Name:
              </th>
              <td className="py-3 w-full md:w-[65%] lg:w-[72%]">
                <p className="py-3 md:pl-3 text-left text-gray-600 border border-grey-600 rounded-lg">
                  {getMerchantProfilenQuery.data?.data?.businessName}
                </p>
              </td>
            </tr>
            <tr className="my-2">
              <th className="text-grey-600 font-bold text-left ">
                Business Address:
              </th>
              <td className="py-3 w-full md:w-[65%] lg:w-[72%]">
                <p className="py-3 md:pl-3 text-left text-gray-600 border border-grey-600 rounded-lg">
                  {getMerchantProfilenQuery.data?.data?.businessAddresss}
                </p>
              </td>
            </tr>
            <tr className="my-2">
              <th className="text-grey-600 font-bold text-left ">BVN:</th>
              <td className="py-3 w-full md:w-[65%] lg:w-[72%]">
                <p className="py-3 md:pl-3 text-left text-gray-600 border border-grey-600 rounded-lg">
                  {getMerchantProfilenQuery.data?.data?.bvn}</p>
              </td>
            </tr>
            {/* <tr className="space-y-9">
              <th className="text-grey-600 font-bold text-left ">
                Industry Type:
              </th>
              <td className="py-3 w-full md:w-[65%] lg:w-[72%]">
                <p className="py-3 md:pl-3 text-left text-gray-600 border border-grey-600 rounded-lg">
                  {getMerchantProfilenQuery.data?.data?.industryType}
                </p>
              </td>
            </tr> */}
            <tr className="my-2">
              <th className="text-grey-600 font-bold "></th>
              <td className="py-6 md:pl-3 text-grey-600 text-right">
                <button
                  onClick={() =>
                    handleUpdateModalOpen(
                      getMerchantProfilenQuery.data?.data
                    )
                  }
                  className="py-[7px] px-[12px]   lg:py-[11px] lg:px-[20px] bg-dark-blue text-[#fafafa] text-[12px] font-bold mr-3 rounded-lg "
                >
                  Edit
                </button>
                {/* <p className="md:px-10 ">{getMerchantProfilenQuery.data?.data?.businessName}</p> */}
              </td>
            </tr>
          </table>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={handleUpdateModalClose}>
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-[white] rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="mt-6 flex justify-between mx-5">
            <h3 className="text-[24px] leading-[31px]  text-[#1A202C] font-extrabold">
              Update Profile
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
            <form onSubmit={createProfile}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6 pt-4">
                    {/* <div className="col-span-12 sm:col-span-6 ">
                      <p className="text-[#718096] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
                        Full Name
                      </p>
                      <input
                        type="text"
                        className="block w-full  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        placeholder="full name"
                        autofocus
                        required
                        value={merchantFullName}
                        onChange={(e) => setMerchantFullName(e.target.value)}
                      />
                    </div> */}
                    <div className="col-span-12 sm:col-span-6 ">
                      <p
                        // htmlFor="firstName"
                        className="text-[#718096] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]"
                      >
                        Business Name
                      </p>
                      <input
                        type="text"
                        className="block w-full  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        placeholder="business name"
                        autofocus
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6 ">
                      <p className="text-[#718096] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
                        Business Address
                      </p>
                      <input
                        type="text"
                        className="block w-full  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        placeholder="business address"
                        autofocus
                        required
                        value={businessAddresss}
                        onChange={(e) => setBusinessAddresss(e.target.value)}
                      />
                    </div>

                    <div className="col-span-12 sm:col-span-6 ">
                      <p className="text-[#718096] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
                        BVN
                      </p>
                      <input
                        type="number"
                        className="block w-full  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        placeholder="74645836213"
                        autofocus
                        required
                        value={bvn}
                        onChange={(e) => setBvn(e.target.value)}
                      />
                    </div>

                    {/* <div className="col-span-12 sm:col-span-6 ">
                      <p className="text-[#718096] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
                        Industry Type
                      </p>
                      <input
                        type="text"
                        className="block w-full  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        placeholder="industry Type"
                        autofocus
                        required
                        value={industryType}
                        onChange={(e) => setIndustryType(e.target.value)}
                      />
                    </div> */}

                    <div className="col-span-12 sm:col-span-6 mb- mt-6">
                      <button
                        type="submit"
                        className="py-4 items-center rounded-[24px] w-full bg-[#124072] text-[white] text-[16px] leading-[24px] tracking-[0.2px] font-extrabold flex justify-center "
                      >
                        Update Profile{" "}
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

export default BusinessProfile;
