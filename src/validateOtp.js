import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import OTPInput from "otp-input-react";
import { enqueueSnackbar } from "notistack";
import api from "./api";

const ValidateOtp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const userRef = useRef();
  const sessionId = localStorage.getItem("sessionId");

  async function validtaeOtp(e) {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await api.validateOtp({
        sessionHash: sessionId,
        code: otp,
      });
      console.log("res of login==>>>>>", response);
      enqueueSnackbar(response.message, { variant: "success" });

      setIsLoading(false);
      navigate("/signUp");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });

      setIsLoading(false);
    }
  }

  return (
    <div className=" bg-[#f5f5f5]  py-[108px]   md:px-[30px] ">
      <div className="flex flex-col bg-[white] justify-center items-center pb-[171px] pt-[81px] lg:px-[90px] md:px-[50px] px-[40px] max-w-[730px] mx-auto text-center ">
        <h3 className="text-[32px] text-[#1a202c] max-w-[430px] font-bold pb-1">
          Verify your email
        </h3>
        <p className="text-[#718096] text-md mb-5">
          We have sent code to your email
        </p>

        <OTPInput
          className="py-7"
          value={otp}
          onChange={setOtp}
          autoFocus
          ref={userRef}
          OTPLength={6}
          otpType="number"
          disabled={false}
          secure
          inputStyles={{
            padding: "5px",
            width: "46px",
            height: "46px",
            borderRadius: "5px",
          }}
        />


        <button
          type="submit"
          onClick={validtaeOtp}
          class="py-4 items-center rounded-[20px] w-full my-[32px] bg-[#124072] text-[#ffffff] text-[16px] leading-[24px] tracking-[0.2px] font-extrabold flex justify-center "
        >
          Verify Email{" "}
          {isLoading && (
            <svg
              class="ml-4 w-6 h-6 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </button>
       
      </div>
    </div>
  );
};

export default ValidateOtp;
