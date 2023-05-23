import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import api from "./api";
import { setUserData } from "./utils/utils";
import { toast } from "react-hot-toast";
import { enqueueSnackbar } from "notistack";

const SignUp = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const sessionId = localStorage.getItem("sessionId");

  const [errorMessage, setErrorMessage] = useState("");
  function handlePassword(event) {
    let new_pass = event.target.value;
    setPassword(new_pass);

    // regular expressions to validate password
    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    if (!new_pass.match(upperCase)) {
      setErrorMessage("Password should contains Uppercase letters!");
    } else if (!new_pass.match(lowerCase)) {
      setErrorMessage("Password should contain lowercase letters!");
    } else if (!new_pass.match(numbers)) {
      setErrorMessage("Password should contains numbers also!");
    } else if (!new_pass.match(specialCharRegExp)) {
      setErrorMessage("Password should contains special character e.g *@#!% !");
    } else if (new_pass.length < 6) {
      setErrorMessage("Password length should be more than 10.");
    } else {
      setErrorMessage("Password is strong!");
    }
    // for confirm password
  }

  // handle toggle
  const toggle = () => {
    setOpen(!open);
  };

  async function signUp(e) {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await api.signUp({
        sessionHash: sessionId,
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      });
      console.log("res of signUp==>>>>>", response);
      enqueueSnackbar(response.message, { variant: "success" });
      // toast.success(response.message);

      setIsLoading(false);
      navigate("/login");
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
      <div className="flex flex-col bg-[white] justify-center items-center pb-[171px] pt-[81px] lg:px-[90px] md:px-[50px] px-[30px] max-w-[630px] mx-auto text-center ">
        <img src="./paylodelogo.png" alt="" className="h-[70px]" />

        <h3 className="text-[32px] font-bold text-[#1a202c] mt-[37px] pb-2">
          Create merchant account
        </h3>

        <p className="text-md text-[#a0aec0] max-w-[288px] self-center mb-[45px]">
          Enter valid details to sign up
        </p>

        <form
          onSubmit={signUp}
          className="flex flex-col max-w-[427px]  w-full self-center gap-4"
        >
          <div className="flex flex-col md:flex-row gap-10 items-center ">
            <input
              type="text"
              className=" h-14 px-4 py-4 w-full placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#124072] text-[16px] leading-[24px] tracking-[0.2px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
              placeholder="first name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              className=" h-14 px-4 py-4 w-full placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#124072] text-[16px] leading-[24px] tracking-[0.2px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
              placeholder="last name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <input
            type="email"
            className=" h-14 px-4 py-4 w-full placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#124072] text-[16px] leading-[24px] tracking-[0.2px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            className=" h-14 px-4 py-4 placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#124072] text-[16px] leading-[24px] tracking-[0.2px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
            placeholder="phone number"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <div className="relative">
            <input
              type={open === false ? "password" : "text"}
              className="h-14 px-4 py-4 placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#124072] text-[16px] leading-[24px] tracking-[0.2px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm w-full"
              placeholder="Password"
              required
              value={password}
              onChange={handlePassword}
            />

            <div className="text-2xl absolute top-4 right-5">
              {open === false ? (
                <AiFillEye onClick={toggle} />
              ) : (
                <AiFillEyeInvisible onClick={toggle} />
              )}
            </div>
            <p
              className={` ${
                errorMessage === "Password is strong!"
                  ? "text-[green]"
                  : "text-[red]"
              }  pt-2 pl-1 text-left text-xs`}
            >
              {" "}
              {errorMessage}
            </p>
          </div>

          <button
            type="submit"
            class="py-4 items-center rounded-[20px] w-[427px] my-[32px] bg-[#124072] text-[#ffffff] text-[16px] leading-[24px] tracking-[0.2px] font-extrabold flex justify-center "
          >
            Sign Up{" "}
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
          <p>
            Alraedy have an account{" "}
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="font-bold text-[#124072]"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
