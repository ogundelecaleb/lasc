import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import api from "./api";
import { enqueueSnackbar } from "notistack";

const NewPass = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userRef = useRef();
  const sessionId = localStorage.getItem("sessionId");

  const [confirmPasswordError, setConfirmPasswordError] = useState("");
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

  const handleConfirmPassword = (event) => {
    let confirm_pass = event.target.value;
    setConfirmPassword(confirm_pass);
    if (confirm_pass !== password) {
      setConfirmPasswordError("Password does not match!");
    } else {
      setConfirmPasswordError("Password match!");
    }
  };

  console.log(sessionId);
  const toggle = () => {
    setOpen(!open);
  };

  const confirmToggle = () => {
    setConfirmOpen(!confirmOpen);
  };

  async function resetPassword(e) {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await api.resetPassword({
        sessionHash: sessionId,
        otp,
        password,
        email,
        confirmPassword,
      });
      console.log("res of password forgot==>>>>>", response);
      enqueueSnackbar(response.message, { variant: "success" });

      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      // toast.error(error.message)
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="bg-[#f5f5f5] py-[108px]  px-[30px]">
        <div className="flex flex-col bg-[white] justify-center items-center pb-[171px] pt-[81px] lg:px-[90px] md:px-[50px] px-[30px] max-w-[630px] mx-auto text-center">
          <h3 className="text-[32px] text-[#1a202c] max-w-[430px] font-bold pb-1">
            Enter New Password
          </h3>
          <p className="text-[#718096] text-md">Enter your new password</p>

          <form
            onSubmit={resetPassword}
            className="flex flex-col mt-[40px] gap-[20px]"
          >
            <input
              type="number"
              className=" h-14 px-4 py-4 placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#124072] text-[16px] leading-[24px] tracking-[0.2px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
              placeholder="Input the OTP sent to your mail"
              ref={userRef}
              required
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
            <input
              type="email"
              className=" h-14 px-4 py-4 placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#124072] text-[16px] leading-[24px] tracking-[0.2px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                type={open === false ? "password" : "text"}
                className="h-14 px-4 py-4 placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#124072] text-[16px] leading-[24px] tracking-[0.2px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm w-full"
                placeholder="Enter New Password"
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

            <div className="relative">
              <input
                type={open === false ? "password" : "text"}
                className="h-14 px-4 py-4 placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#124072] text-[16px] leading-[24px] tracking-[0.2px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm w-full"
                placeholder="Re-enter New Password"
                required
                value={confirmPassword}
                onChange={handleConfirmPassword}
              />

              <div className="text-2xl absolute top-4 right-5">
                {confirmOpen === false ? (
                  <AiFillEye onClick={confirmToggle} />
                ) : (
                  <AiFillEyeInvisible onClick={confirmToggle} />
                )}
              </div>
              <p
                className={` ${
                  confirmPasswordError === "Password match!"
                    ? "text-[green]"
                    : "text-[red]"
                }  pt-2 pl-1 text-left text-xs `}
              >
                {" "}
                {confirmPasswordError}
              </p>
            </div>

            <button
              type="submit"
              class="py-4 items-center rounded-[20px] w-[427px] my-[32px] bg-[#124072] text-[#ffffff] text-[16px] leading-[24px] tracking-[0.2px] font-extrabold flex justify-center "
            >
              Save New Password{" "}
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
            className=" text-[#1a202c]"
          >
            Remember your password?{" "}
            <span className="text-[#124072] font-bold ">Sign in</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPass;
