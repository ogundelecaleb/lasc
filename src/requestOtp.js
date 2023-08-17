import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import api from "./api";
import { toast } from "react-hot-toast";
import { enqueueSnackbar } from "notistack";

const RequestOtp = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  // handle toggle
  const toggle = () => {
    setOpen(!open);
  };

  async function requestOtp(e) {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await api.requestOtp({ email });
      console.log("res of login==>>>>>", response);
      enqueueSnackbar("OTP has been sent to your mail", { variant: "success" });
      // toast.success(response.message);
      localStorage.setItem("sessionId", response.data.sessionHash);
      setIsLoading(false);
      navigate("/validateOtp");
      // navigation.navigate(routes.OTP);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      // toast.error(error.message)
      setIsLoading(false);
    }
  }

  return (
    <div className=" bg-[#f5f5f5] py-[108px]  px-[30px] ">
      <div className="flex flex-col bg-[white] justify-center items-center pb-[171px] pt-[81px] lg:px-[90px] md:px-[50px] px-[30px] max-w-[630px] mx-auto text-center ">
        <img src="./paylodelogo.png" alt="" className="h-[40px]  md:h-[60px] lg:h-[70px]" />

        <h3 className="text-[24px] md:text-[32px] font-bold text-[#1a202c] mt-[16px] md:mt-[37px] pb-2">
          Sign up as Paylode merchant
        </h3>

        <p className="text-md text-[#a0aec0] max-w-[288px] self-center mb-[45px]">
          Enter details to create your merchant account
        </p>

        <form
          onSubmit={requestOtp}
          className="flex flex-col max-w-[427px]  w-full self-center gap-4"
        >
          <input
            type="email"
            className=" h-14 px-4 py-4 placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#124072] text-[16px] leading-[24px] tracking-[0.2px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            class="py-4 items-center rounded-[20px] w-full mt-[20px]  mb-[5px] bg-[#124072] text-[#ffffff] text-[16px] leading-[24px] tracking-[0.2px] font-extrabold flex justify-center "
          >
            Next{" "}
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
        </form>
        <p>
          Already have an account?{" "}
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="font-bold text-[#124072]"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RequestOtp;
