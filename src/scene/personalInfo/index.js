import React, { useState } from "react";
import api from "../../api";
import { useQuery } from "@tanstack/react-query";

const PersonalInfo = () => {


  const getMerchantProfilenQuery = useQuery(
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
      
      return response;
    } catch (error) {
      return error;
    }
  }
  return (
    <div>
      <div className="p-[40px] ">
        <h2 className="text-[24px] text-dark font-bold mb-[30px]">
          Personal Information
        </h2>
        
        {getMerchantProfilenQuery.data && (
          <table>
            <tr className="my-2">
              <th className="text-grey-600 font-bold text-left ">First Name</th>
              <td className="py-6 md:pl-3 text-gray-600">
              <p className="py-3 md:pl-3 px-2 md:px-3 text-left text-gray-600 border border-grey-600 rounded-lg">
                  {getMerchantProfilenQuery.data?.data?.user?.firstName}
                </p>
              </td>
            </tr>
            <tr className="my-2">
              <th className="text-grey-600 font-bold text-left ">Last Name</th>
              <td className="py-6 md:pl-3 text-gray-600">
              <p className="py-3 md:pl-3 px-2 md:px-3 text-left text-gray-600 border border-grey-600 rounded-lg">
                  {getMerchantProfilenQuery.data?.data?.user?.lastName}
                </p>
              </td>
            </tr>
            <tr className="my-2">
              <th className="text-grey-600 font-bold text-left ">Email</th>
              <td className="py-6 md:pl-3 text-gray-600">
              <p className="py-3 md:pl-3 px-2 md:px-3 text-left text-gray-600 border border-grey-600 rounded-lg">
                  {getMerchantProfilenQuery.data?.data?.user?.email}
                </p>
              </td>
            </tr>
            <tr className="my-2">
              <th className="text-grey-600 font-bold text-left ">
                Phone Number
              </th>
              <td className="py-6 md:pl-3 text-gray-600">
              <p className="py-3 md:pl-3 px-2 md:px-3 text-left text-gray-600 border border-grey-600 rounded-lg">
                  {getMerchantProfilenQuery.data?.data?.user?.phoneNumber}
                </p>
              </td>
            </tr>
           
          </table>
        )}

        {/* <form action="" className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center mb-[28px] gap-[24px] ">
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%] b"
              >
                First name
              </label>{" "}
              <input
                type="text"
                className="border px-[16px] py-[9px] rounded-[10px] mb-[16px] inline-block lg:max-w-[360px]"
                placeholder="Emmanuel"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%]"
              >
                Last name
              </label>
              <input
                type="select"
                className="border px-[16px] py-[9px] rounded-[10px] mb-[16px] lg:max-w-[360px]"
                placeholder="Okolie"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[24px]">
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%]"
              >
                Email Address
              </label>
              <input
                type="email"
                className="border px-[16px] py-[9px] rounded-[10px] mb-[16px] lg:max-w-[360px]"
                placeholder="mosesthe@gmail.com"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%]"
              >
                Phone Number
              </label>
              <input
                type="number"
                className="border px-[16px] py-[9px] rounded-[10px] mb-[16px] lg:max-w-[360px]"
                placeholder="+234812980777"
              />
            </div>
          </div>
          <button type="submit" className="mb-4 absolute right-0 bottom-0 py-[11px] px-[20px] bg-dark-blue text-[#fafafa] text-[12px] font-bold rounded-lg">Save Details</button>
        </form> */}
      </div>
    </div>
  );
};
export default PersonalInfo;
