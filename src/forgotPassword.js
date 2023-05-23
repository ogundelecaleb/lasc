import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function ForgotPassword(e) {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await api.forgotPassword({ email });
      console.log("res of password forgot==>>>>>", response);
      enqueueSnackbar("OTP has been sent to your mail", { variant: "success" });

      // setUserData(response);
      localStorage.setItem("sessionId", response.data);
      setIsLoading(false);
      navigate("/newpass");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      // toast.error(error.message)
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className=" bg-[#f5f5f5] py-[108px] px-[30px]">
        <div className="flex flex-col bg-[white] justify-center items-center pb-[171px] pt-[81px] lg:px-[90px] md:px-[50px] px-[30px] max-w-[630px] mx-auto text-center ">
          <img src="./paylodelogo.png" alt="" className="h-[70px]" />
          <h3 className="text-[32px] text-[#1a202c] max-w-[430px] font-bold py-2">
            Don't Remember Your Password?
          </h3>
          <p className="text-[#718096] text-md">
            Enter the mail address associated with your account and we will send
            you a link to reset your password.
          </p>

          <form onSubmit={ForgotPassword} className="flex flex-col mt-[40px]">
            <input
              type="email"
              className=" h-14 px-4 py-4 placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#124072] text-[16px] leading-[24px] tracking-[0.2px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
              placeholder="E-mail"
              // ref={userRef}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              class="py-4 items-center rounded-[20px] w-[427px] my-[32px] bg-[#124072] text-[#ffffff] text-[16px] leading-[24px] tracking-[0.2px] font-extrabold flex justify-center "
            >
              Send OTP{" "}
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

          <button
            onClick={() => {
              navigate("/login");
            }}
            className="font-bold text-[#124072]"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
