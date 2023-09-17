import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import api from "./api";
import { setUserData } from "./utils/utils";
import { toast } from "react-hot-toast";
import { enqueueSnackbar } from "notistack";

const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userRef = useRef();
  const userData = localStorage.getItem("userData");
  // handle toggle
  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!userData) {
      userRef.current.focus();
    }
  }, [userData]);
  const decodedData = JSON.parse(atob(userData.split(".")[1]));
  let currentDate = new Date();
  if (userData && decodedData?.exp * 1000 > currentDate.getTime()) {
    return <Navigate to="/dashboard" replace />;
  }

  async function login(e) {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await api.signIn({ email, password });
      // console.log("res of login==>>>>>", response);
      enqueueSnackbar(response.message, { variant: "success" });
      // toast.success(response.message);
      setUserData(response);
      setIsLoading(false);
      navigate("/dashboard");
      // navigation.navigate(routes.OTP);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      // toast.error(error.message)
      setIsLoading(false);
    }
  }

  return (
    <div className=" bg-[#f5f5f5] py-[108px] px-[30px]">
      <div className="flex flex-col bg-[white] justify-center items-center pb-[50px] pt-[40px] md:pb-[100px] md:pt-[60px] lg:pb-[171px] lg:pt-[81px] lg:px-[90px] md:px-[50px] px-[20px] max-w-[630px] mx-auto text-center ">
        <img
          src="./paylodelogo.png"
          alt=""
          className="h-[40px]  md:h-[60px] lg:h-[70px]"
        />

        <h3 className=" text-[20px]  md:text-[32px] font-bold text-[#1a202c] mt-[16px] md:mt-[37px] pb-2">
          Sign in
        </h3>

        <p className="text-md text-[#a0aec0] max-w-[288px] self-center mb-[45px]">
          Managing financial communities better
        </p>

        <form
          onSubmit={login}
          className="flex flex-col max-w-[427px]  w-full self-center gap-4"
        >
          <input
            type="email"
            className=" h-14 px-4 py-4 placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#124072] text-[16px] leading-[24px] tracking-[0.2px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
            placeholder="E-mail"
            ref={userRef}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={open === false ? "password" : "text"}
              className="h-14 px-4 py-4 placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#124072] text-[16px] leading-[24px] tracking-[0.2px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm w-full"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="text-2xl absolute top-4 right-5">
              {open === false ? (
                <AiFillEye onClick={toggle} />
              ) : (
                <AiFillEyeInvisible onClick={toggle} />
              )}
            </div>
          </div>

          <div class="flex items-center justify-between md:mt-[16px]">
            {/* <div class="flex items-center ">
              <input
                type="radio"
                className="h-5 w-5 mr-3 border border-[#E2E8F0] "
              />
              <h3 class="text-[#1A202C] text-[14px] md:text-[16px] leading-[24px] tracking-[0.2px] font-semibold  ">
                Remember me
              </h3>
            </div> */}

            <button
              type="button"
              onClick={() => {
                navigate("/forgotPassword");
              }}
              className="font-bold text-[14px] md:text-[16px] text-[#124072]"
            >
              Forgot Password?
            </button>
          </div>
          <button
            type="submit"
            class="py-4 items-center rounded-[20px] w-full mt-[20px]  mb-[5px] bg-[#124072] text-[#ffffff] text-[16px] leading-[24px] tracking-[0.2px] font-extrabold flex justify-center "
          >
            Sign In{" "}
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
        <p className="text-[14px] md:text-[16px]">
          Don't have an account?{" "}
          <button
            onClick={() => {
              navigate("/requestOtp");
            }}
            className="font-bold text-[14px] md:text-[16px] text-[#124072]"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
