import React, { useState } from "react";
import api from "../../api";
import { enqueueSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";

const ApiKey = () => {
  const [publicCopySuccess, setPublicCopySuccess] = useState("");
  const [secretCopySuccess, setSecretCopySuccess] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [keyloading, setKeyLoading] = useState(false);

  const [decoded] = useOutletContext();

  const copyPublicKeyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setPublicCopySuccess(text);
    setSecretCopySuccess(text);
    setTimeout(() => {
      setPublicCopySuccess("");
      setSecretCopySuccess("");
    }, 3000);
  };

  async function generatekey(e) {
    e.preventDefault();

    setKeyLoading(true);
    try {
      const response = await api.generatekey({});
      console.log("res of setPin==>>>>>", response);
      setPublicKey(response.data.publicKey);
      setSecretKey(response.data.secretKey);
      console.log(publicKey);
      enqueueSnackbar("Key Created Successfully ", {
        variant: "success",
      });
      setKeyLoading(false);
      //   getMerchantProfilenQuery.refetch()
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setKeyLoading(false);
    }
  }

  return (
    <div className="mx-10 mt-6">
      <div className="w-full pb-1 mb-[28px] border-b border-b-grey-600">
        <h2 className="text-grey-600 font-bold text-lg">
          Api Key for <span className="text-[#454e5c]">{decoded.fullName}</span>
        </h2>
      </div>

      <div>
        {" "}
        <label
          htmlFor=""
          className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%] b"
        >
          Public key
        </label>
        <div class="relative mb-4 flex w-full md:w-[60%] lg:w-[50%] ">
          <input
            type="text"
            value={publicKey}
            class="relative m-0 block  min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Public Key"
            aria-label="Public Key"
            aria-describedby="basic-addon2"
          />
          <button
            class="flex items-center   bg-dark-blue text-[#fafafa] text-[12px]   whitespace-nowrap rounded-r border border-l-0 border-solid border-neutral-300 px-3 py-[0.40rem] text-center text-base  leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
            id="basic-addon2"
            onClick={() => copyPublicKeyToClipboard(publicKey)}
          >
            <p className="text-[14px] leading-[21px] tracking-[0.2px] text-[white] font-medium text-left">
              {publicCopySuccess === publicKey ? "Copied!" : "Click to copy"}
            </p>
          </button>
        </div>
      </div>
      <div>
        {" "}
        <label
          htmlFor=""
          className="text-grey-600 text-[14px] mb-[6px] font-bold tracking-[50%] b"
        >
          Secret key
        </label>
        <div class="relative mb-4 flex w-full md:w-[60%] lg:w-[50%] ">
          <input
            type="text"
            value={secretKey}
            class="relative m-0 block  min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Secret Key"
            aria-label="Secret Key"
            aria-describedby="basic-addon2"
          />
          <button
            onClick={() => copyPublicKeyToClipboard(secretKey)}
            class="flex items-center   bg-dark-blue text-[#fafafa] text-[12px]   whitespace-nowrap rounded-r border border-l-0 border-solid border-neutral-300 px-3 py-[0.40rem] text-center text-base  leading-[1.6] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
            id="basic-addon2"
          >
            <p className="text-[14px] leading-[21px] tracking-[0.2px] text-[white] font-medium text-left">
              {secretCopySuccess === secretKey ? "Copied!" : "Click to copy"}
            </p>
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <button
          onClick={generatekey}
          className="py-[7px] px-[12px] w-full md:w-[60%] lg:w-[50%] flex items-center justify-center  lg:py-[11px] lg:px-[20px] bg-dark-blue text-[#fafafa] text-[12px] font-bold mr-3 rounded-lg"
        >
          Generate Key{" "}
          {keyloading && (
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
      </div>
    </div>
  );
};

export default ApiKey;
