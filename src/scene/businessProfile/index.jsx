import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import api from "../../api";
import { enqueueSnackbar } from "notistack";

const BusinessProfile = () => {
  const [loading, setLoading] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [merchantFullName, setMerchantFullName] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [bvn, setBvn] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [defaultCurrency, setDefualtCurrency] = useState("");

  async function createTransactionAccess(e) {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await api.createTransactionAccess({
        defaultCurrency: defaultCurrency,
      });
      console.log("res of transactionAcess==>>>>>", response);
      enqueueSnackbar("Business Profile Created Successfully 😃", {
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

  const handleSubmit = (e) => {
    setDefualtCurrency("#");
    createTransactionAccess(e);
  };

  async function createProfile(e) {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await api.createProfile({
        industryType,
        bvn,
        merchantFullName,
        businessName,
        businessAddress,
      });
      console.log("res of vendors==>>>>>", response);
      enqueueSnackbar("Business Profile Created Successfully 😃", {
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
  // handle toggle

  return (
    <div>
      {" "}
      <div className="p-[40px] overflow-hidden ">
        <button
          onClick={handleSubmit}
          className="bg-[blue] text-[white px-3 py-2]"
        >
          Default Currency{" "}
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
        <h2 className="text-[24px] text-dark font-bold mb-[48px]">
          Merchant Details
        </h2>
        <form action="" onSubmit={createProfile} className="">
          <h2 className="text-[24px] text-dark font-bold mb-[48px]">
            Business Details
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2  items-center mb-[28px] gap-[24px]">
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%] b"
              >
                Full Name
                <div className="relative">
                  <input
                    type="text"
                    className="border px-[16px] py-[9px] rounded-[10px] mb-[16px] max-w-[360px]"
                    placeholder=""
                    value={merchantFullName}
                    onChange={(e) => setMerchantFullName(e.target.value)}
                  />
                </div>
              </label>{" "}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%] b"
              >
                Industry
                <div className="relative">
                  <input
                    type="text"
                    className="border px-[16px] py-[9px] rounded-[10px] mb-[16px] max-w-[360px]"
                    placeholder=""
                    value={industryType}
                    onChange={(e) => setIndustryType(e.target.value)}
                  />
                </div>
              </label>{" "}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%] b"
              >
                BVN/NIN
                <div className="relative">
                  <input
                    type="text"
                    className="border px-[16px] py-[9px] rounded-[10px] mb-[16px] max-w-[360px]"
                    placeholder="BVN"
                    value={bvn}
                    onChange={(e) => setBvn(e.target.value)}
                  />
                </div>
              </label>{" "}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%] b"
              >
                Business Name
                <div className="relative">
                  <input
                    type="text"
                    className="border px-[16px] py-[9px] rounded-[10px] mb-[16px] max-w-[360px]"
                    placeholder=""
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
              </label>{" "}
            </div>
          </div>
          <h2 className="text-[24px] text-dark font-bold mb-[48px]">
            Business Details
          </h2>
          <div className="flex flex-col">
            <label
              htmlFor=""
              className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%] b"
            >
              Legal name of company
              <div className="relative">
                <input
                  type="text"
                  className="border px-[16px] py-[9px] rounded-[10px] mb-[16px] w-full"
                  placeholder=""
                  // value={currentPassword}
                  // onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
            </label>{" "}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor=""
              className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%]"
            >
              Address
              <div className="relative">
                <input
                  type="text"
                  className="border px-[16px] py-[9px] rounded-[10px] mb-[16px] w-full"
                  placeholder=""
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                />
              </div>
            </label>{" "}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2  items-center mb-[28px] gap-[24px]">
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%] b"
              >
                City
                <div className="relative">
                  <input
                    type="text"
                    className="border px-[16px] py-[9px] rounded-[10px] mb-[16px] max-w-[360px]"
                    placeholder="BVN"
                    // value={currentPassword}
                    // onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
              </label>{" "}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%] b"
              >
                Country/Region
                <div className="relative">
                  <input
                    type="text"
                    className="border px-[16px] py-[9px] rounded-[10px] mb-[16px] max-w-[360px]"
                    placeholder=""
                    // value={currentPassword}
                    // onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
              </label>{" "}
            </div>
          </div>

          <button
            type="submit"
            // onClick={changePassword}
            className="mb-4 absolute right-0 bottom-0 py-[11px] px-[20px] bg-dark-blue text-[#fafafa] text-[12px] font-bold rounded-lg"
          >
            update Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusinessProfile;
