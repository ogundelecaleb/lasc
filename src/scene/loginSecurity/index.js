import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import api from "../../api";
import { enqueueSnackbar } from "notistack";

const LoginSecurity = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  function handlePassword(event) {
    let new_pass = event.target.value;
    setNewPassword(new_pass);

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
    if (confirm_pass !== newPassword) {
      setConfirmPasswordError("Password does not match!");
    } else {
      setConfirmPasswordError("Password match!");
    }
  };

  async function changePassword(e) {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await api.changePassword({
        newPassword,
        currentPassword,
        confirmPassword,
      });
      console.log("res of password change==>>>>>", response);
      enqueueSnackbar("Password changed successfully", { variant: "success" });

      setLoading(false);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
     
      setLoading(false);
    }
  }

  // handle toggle
  const toggle = () => {
    setOpen(!open);
  };
  // handle toggle for new password
  const toggle1 = () => {
    setOpen1(!open1);
  };
  // handle toggle for confirm new password
  const toggle2 = () => {
    setOpen2(!open2);
  };
  return (
    <div>
      {" "}
      <div className="p-[40px] ">
        <h2 className="text-[24px] text-dark font-bold mb-[30px]">
          Change Password
        </h2>
        <form action="" className="">
          <div className="flex flex-col mb-[28px] gap-[18px]">
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%] "
              >
                Enter Old Password
                <div className="relative">
                  <input
                    type={open === false ? "password" : "text"}
                    className="border px-[16px] py-[9px] rounded-[10px] mb-[16px] w-full "
                    placeholder=""
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <div className="text-2xl absolute top-2.5 right-5">
                    {open === false ? (
                      <AiFillEye onClick={toggle} />
                    ) : (
                      <AiFillEyeInvisible onClick={toggle} />
                    )}
                  </div>
                </div>
              </label>

            </div>
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="text-grey-600 text-[14px]  font-bold tracking-[50%]"
              >
                Enter New Password
                <div className="relative">
                  <input
                    type={open1 === false ? "password" : "text"}
                    className="border px-[16px] py-[9px] rounded-[10px]  w-full "
                    placeholder=""
                    value={newPassword}
                    onChange={handlePassword}
                  />

                  <div className="text-2xl absolute top-2.5 right-5">
                    {open1 === false ? (
                      <AiFillEye onClick={toggle1} />
                    ) : (
                      <AiFillEyeInvisible onClick={toggle1} />
                    )}
                  </div>
                </div>
               
              </label>
              <p
                    className={` ${
                      errorMessage === "Password is strong!"
                        ? "text-[green]"
                        : "text-[red]"
                    }  pt-2 pl-1 text-left text-xs font-bold`}
                  >
                    {" "}
                    {errorMessage}
                  </p>

            </div>
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%]"
              >
                Re-Enter New Password
                <div className="relative">
                  <input
                    type={open2 === false ? "password" : "text"}
                    className="border px-[16px] py-[9px] rounded-[10px] w-full "
                    placeholder=""
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                  />

                  <div className="text-2xl absolute top-2.5 right-5">
                    {open2 === false ? (
                      <AiFillEye onClick={toggle2} />
                    ) : (
                      <AiFillEyeInvisible onClick={toggle2} />
                    )}
                  </div>
                
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
              </label>
            </div>
          </div>
          <button
            type="submit"
            onClick={changePassword}
            className=" py-[11px] px-[20px] flex items-center bg-dark-blue text-[#fafafa] text-[12px] font-bold rounded-lg"
          >
            Save New Password  {loading && (
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
        </form>
      </div>
    </div>
  );
};

export default LoginSecurity;
