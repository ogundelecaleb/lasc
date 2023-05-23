import React from "react";

const SettlementAccount = () => {
  return (
    <div>
      <h2>Settlement Account Details</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2  items-center mb-[28px] gap-[24px]">
        <div className="flex flex-col">
          <label
            htmlFor=""
            className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%] b"
          >
            Account Number
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
        <div className="flex flex-col">
          <label
            htmlFor=""
            className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%] b"
          >
            Account Name
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
        <div className="flex flex-col">
          <label
            htmlFor=""
            className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%] b"
          >
            Bank Name
            <div className="relative">
              <input
                type="text"
                className="border px-[16px] py-[9px] rounded-[10px] mb-[16px] max-w-[360px]"
                placeholder=" "
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
            Currency
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
      <div className="flex flex-col">
        <label
          htmlFor=""
          className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%] b"
        >
          Country
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
    </div>
  );
};

export default SettlementAccount;
