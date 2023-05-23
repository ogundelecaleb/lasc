import React,{useState} from "react";
import api from "../../api";

const PersonalInfo = () => {
 

  return (
    <div>
      <div className="p-[40px] h-screen ">
        <h2 className="text-[24px] text-dark font-bold mb-[48px]">Personal Information</h2>
        <div className="flex flex-row items-center mb-[40px] ">
          <div className="border border-dark-blue rounded-full p-1 mr-2 lg:p-2 lg:mr-4">
            <img src="../profile-pic.png" alt="" className=" h-[30px] md:h-[48px]  lg:h-[78px]" />
          </div>
          <button className="py-[7px] px-[12px]   lg:py-[11px] lg:px-[20px] bg-dark-blue text-[#fafafa] text-[12px] font-bold mr-3 rounded-lg">
            Upload new picture
          </button>
          <button className="px-[10px]  py-[7px]    lg:py-[11px] lg:px-[30px] bg-[#ffffff] text-dark text-[12px] font-bold rounded-lg border border-grey-600">
            Delete
          </button>
        </div>
        <form action="" className="">
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
        </form>

        
      </div>
    </div>
  );
};
export default PersonalInfo;
