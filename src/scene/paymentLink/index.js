import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import Moment from "moment";
import Modal from "../../components/Modal";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { enqueueSnackbar } from "notistack";
import { Link } from "react-router-dom";
// import QRCode from "react-qr-code";
import QRCode from "qrcode.react";
import html2canvas from 'html2canvas';

const PaymentLink = () => {
  const elementToCaptureRef = React.createRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [linkDescription, setLinkDescription] = useState("");
  const [linkUsageType, setLinkUsageType] = useState("single");
  const [linkData, setLinkData] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [singleCustomer, setSingleCustomer] = useState(false);
  const [multipleCustomer, setMultipleCustomer] = useState(false);
  const [currencyCode, setCurrencyCode] = useState("NGN");
  const [publicCopySuccess, setPublicCopySuccess] = useState("");
  const [qrLoading, setQrLoading] = useState(false);
  // const [qrText, setQrText] = useState(""); // Input text for QR code
  const [downloadLink, setDownloadLink] = useState(null);

  const HandleModalOpen = () => {
    setIsOpen(true);
    if (multipleCustomer === true) {
      setMultipleCustomer(false);
    }
    setSingleCustomer(true);
  };

  const HandleModalClose = () => {
    setIsOpen(false);
  };

  const handleSingleOption = () => {
    if (multipleCustomer === true) {
      setMultipleCustomer(false);
    }
    setSingleCustomer(true);
    setLinkUsageType("single");

    clearForm();
  };

  const handleMultipleOption = () => {
    if (singleCustomer === true) {
      setSingleCustomer(false);
    }
    setMultipleCustomer(true);
    clearForm();
    setLinkUsageType("multiple");
  };

  const captureAndDownload = () => {
    const element = elementToCaptureRef.current;
    html2canvas(element).then((canvas) => {
      // Convert the canvas to a data URL
      const imageDataURL = canvas.toDataURL('image/png');
  
      // Create a link to download the image
      const a = document.createElement('a');
      a.href = imageDataURL;
      a.download = 'PaymentLink-QRCode.png';
      a.click();
    });
  };

  function formatTime(date) {
    const datetime = Moment(date);
    const formattedTime = datetime.format("hh.mm A");
    return formattedTime;
  }

  function formatDate(datetimeStr) {
    const date = Moment(datetimeStr);
    const formattedDate = date.format("MMM DD, YYYY");

    return formattedDate;
  }

  const copyPublicKeyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setPublicCopySuccess(text);
    setTimeout(() => {
      setPublicCopySuccess("");
    }, 3000);
  };

  const handleQRModalOpen = (code) => {
    setTimeout(() => {
      setLinkData(code.paymentLink);
      setLinkDescription(code.description)
      setQrLoading(true);
      // generateQRCode();
      console.log("paylink:", code.paymentLink);
    }, 4000);
    setIsQrModalOpen(true);
  };
  const handleQRModalClose = () => {
    setIsQrModalOpen(false);
    setQrLoading(false);
  };

  function clearForm() {
    setPhoneNumber("");
    setEmail("");
    setDescription("");
    setAmount("");
    setExpiryDate("");
  }

  const currencyQuery = useQuery(["getCurrency"], () => getCurrency(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  async function getCurrency() {
    try {
      const response = await api.getCurrency();
      return response;
    } catch (error) {
      return error;
    }
  }

  async function createInvoice(e) {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await api.createInvoice({
        currencyCode,
        linkUsageType,
        expiryDate,
        customerEmail: email,
        customerPhoneNumber: phoneNumber,
        description: description,
        amount: amount,
      });
      console.log("res of update==>>>>>", response);

      enqueueSnackbar("Payment Link Created Successfully!", {
        variant: "success",
      });
      setLoading(false);
      clearForm();
      refetch();
      HandleModalClose();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setLoading(false);
    }
  }

  async function getInvoice(currentPage) {
    const response = await api.getInvoice({
      params: {
        PageIndex: currentPage,
      },
    });
    console.log("invoce list", response);
    return response;
  }

  const { isLoading, data, isPreviousData, refetch } = useQuery(
    ["getInvoice", currentPage, email],
    () => getInvoice(currentPage, email),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
      retry: true,
    }
  );

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const generateQRCode = () => {
    if (linkData === "") {
      alert("Please enter text to generate a QR code.");
      return;
    }

    // Create a data URL for the QR code image
    const qrDataURL = document.querySelector("canvas").toDataURL("image/png");
    // const qrDataURL = document.getElementById("qr").toDataURL("image/png");

    // Create a download link
    const a = document.createElement("a");
    a.href = qrDataURL;
    a.download = "payment-link.png";

    // Trigger a click event on the link to start the download
    a.click();

    // Clean up and reset the download link
    setDownloadLink(qrDataURL);
  };

  return (
    <div className="mt-2  mx-6">
      {/* search and filter button */}
      <div className="lg:flex lg:justify-between items-center mb-8 ">
        {/* <div className="relative py-4 ">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pr-3 ">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="9.80541"
                cy="9.80547"
                r="7.49047"
                stroke="#1A202C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.0151 15.4042L17.9518 18.3333"
                stroke="#1A202C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          <input
            type="text"
            className="py-2 pl-10 pr-4 text-[#A0AEC0] leading-[21px] tracking-[0.2px] text-[14px] border border-[#E2E8F0] rounded-xl  focus:border-gray-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
            placeholder="Search by email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div> */}
        <div className="flex items-center">
          <button
            onClick={HandleModalOpen}
            className="px-6 py-2 bg-[#124072]  text-[white] text-[14px] h-[48px] leading-[21px] tracking-[0.2px] font-extrabold rounded-xl flex items-center mr-4 "
          >
            <svg
              className="mr-1"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3.33331V12.6666"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.33331 8H12.6666"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Create Payment Link
          </button>
        </div>
      </div>
      {/* end search and filter button */}

      {/* {displaySearch ? (
        <tr>
          <td className="text-center" colspan="8">
            <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-4">
              <div className=" py-4  px-4">
                <input
                  type="text"
                  className="w-full py-2 pl-3 pr-4 text-[#A0AEC0] leading-[21px] tracking-[0.2px] text-[14px] border border-[#E2E8F0] rounded-xl  focus:border-gray-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                  placeholder="Search for client"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                />
              </div>
              <div className="py-4   w-full px-4 ">
                <input
                  type="text"
                  className="w-full py-2 pl-4 pr-4 text-[#A0AEC0] leading-[21px] tracking-[0.2px] text-[14px] border border-[#E2E8F0] rounded-xl  focus:border-gray-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                  placeholder="Search by tracking num.."
                  value={trackingNum}
                  onChange={(e) => setTrackingNum(e.target.value)}
                />
              </div>
              <div className="relative py-4   w-full px-4 ">
                <input
                  type="text"
                  className="w-full py-2 pl-4 pr-4 text-[#A0AEC0] leading-[21px] tracking-[0.2px] text-[14px] border border-[#E2E8F0] rounded-xl  focus:border-gray-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                  placeholder="Search by transaction ref.."
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                />
              </div>
              <div className="  py-4 px-4 ">
                <select
                  className="w-full py-2 pl-3 pr-4 text-[#A0AEC0] leading-[21px] tracking-[0.2px] text-[14px] border border-[#E2E8F0] rounded-xl  focus:border-gray-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                  autofocus
                  required
                  placeholder="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">All Status</option>

                  <option value={"Success"}>Success</option>
                  <option value={"Failed"}>Failed</option>
                  <option value={"Initiated"}>Initiated</option>
                  <option value={"Processing"}>Processing</option>
                </select>
              </div>
              <div className=" py-4  px-4 ">
                <input
                  type="date"
                  className="w-full py-2 pl-3 pr-4 text-[#A0AEC0] leading-[21px] tracking-[0.2px] text-[14px] border border-[#E2E8F0] rounded-xl  focus:border-gray-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                  placeholder="Search for start date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className=" py-4  px-4 ">
                <input
                  type="date"
                  className="w-full py-2 pl-10 pr-4 text-[#A0AEC0] leading-[21px] tracking-[0.2px] text-[14px] border border-[#E2E8F0] rounded-xl  focus:border-gray-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                  placeholder="Search for end date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </td>
        </tr>
      ) : (
        ""
      )} */}

      {/* table */}

      <div class="flex flex-col overflow-x-auto">
        <div class="sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-x-auto">
              <table className="min-w-full mb-6">
                <thead>
                  <tr className="mb-2">
                    <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                      Amount
                    </th>
                    <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                      Customer Email
                    </th>

                    <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                      Link
                    </th>
                    <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                      QR Code
                    </th>

                    <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                      Invoice Type{" "}
                    </th>

                    <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                      Expiry Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && !isPreviousData && <div>Loading...</div>}
                  {!isLoading && data?.data?.results.length === 0 && (
                    <tr>
                      <td className="text-center" colspan="6">
                        <img
                          src="./nodata.gif"
                          className="mx-auto mt-6 "
                          alt=""
                        />
                        <h3 className="text-[30px] leading-[35px]  text-[#1A202C] font-extrabold mb-[6px]">
                          No Data
                        </h3>
                      </td>
                    </tr>
                  )}
                  {data &&
                    data?.data?.results?.map((result) => (
                      <tr key={result.id} className="mb-2">
                        <td className="whitespace-nowrap py-[14px] pr-5 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                          <div className="text-[18px] leading-[24px] tracking-[0.2px] text-[#3b434e] font-extrabold">
                            <NumericFormat
                              value={result.amount}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={result.currencyCode}
                              decimalScale={2}
                              fixedDecimalScale={true}
                              renderText={(value) => <p>{value}</p>}
                            />
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-[14px] pr-5 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                          {result.customerEmail}
                        </td>
                        <td className="whitespace-nowrap py-[14px] pr-5 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                          <div className="">
                            <Link
                              to={result.paymentLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <button className="text-[14px] leading-[24px] px-2 py-1 tracking-[0.2px] text-[#1A202C] font-medium text-left mb-1 border border-grey-600 rounded-lg shadow hover:-translate-y-2 transition ease-in-out duration-150">
                                Preview link
                              </button>
                            </Link>
                            <div
                              onClick={() =>
                                copyPublicKeyToClipboard(result.paymentLink)
                              }
                              className="flex cursor-pointer"
                            >
                              <svg
                                className="mr-2"
                                width="17"
                                height="20"
                                viewBox="0 0 17 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2 20.0002C1.45 20.0002 0.979 19.8045 0.587 19.4132C0.195667 19.0212 0 18.5502 0 18.0002V4.00018H2V18.0002H13V20.0002H2ZM6 16.0002C5.45 16.0002 4.97933 15.8045 4.588 15.4132C4.196 15.0212 4 14.5502 4 14.0002V2.00018C4 1.45018 4.196 0.979183 4.588 0.587183C4.97933 0.19585 5.45 0.000183105 6 0.000183105H15C15.55 0.000183105 16.021 0.19585 16.413 0.587183C16.8043 0.979183 17 1.45018 17 2.00018V14.0002C17 14.5502 16.8043 15.0212 16.413 15.4132C16.021 15.8045 15.55 16.0002 15 16.0002H6ZM6 14.0002H15V2.00018H6V14.0002Z"
                                  fill="#96A3BE"
                                />
                              </svg>

                              <p className="text-[14px] leading-[21px] tracking-[0.2px] text-[#718096] font-medium text-left">
                                {publicCopySuccess === result.paymentLink
                                  ? "Copied!"
                                  : "Click to copy"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-[14px] pr-5 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                          <button
                            onClick={() => handleQRModalOpen(result)}
                            className="text-[14px] leading-[24px] px-2 py-1 tracking-[0.2px] text-[#1A202C] font-medium text-left mb-1 border border-grey-600 rounded-lg shadow hover:-translate-y-2 transition ease-in-out duration-150"
                          >
                            Generate QR Code
                          </button>
                        </td>
                        <td className="whitespace-nowrap py-[14px] pr-5 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                          {result.linkUsageType} Charge
                        </td>
                        {/* <td className="whitespace-nowrap py-[14px] pr-5 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                          <div className="">
                            <p className="text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left mb-1">
                              {formatDate(result.createdDate)}
                            </p>
                            <p className="text-[14px] leading-[21px] tracking-[0.2px] text-[#718096] font-medium text-left">
                              at {formatTime(result.createdDate)}
                            </p>
                          </div>
                        </td> */}
                        <td className="whitespace-nowrap py-[14px] pr-5 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                          {" "}
                          <div className="">
                            <p className="text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left mb-1">
                              {formatDate(result.expiration)}
                            </p>
                            <p className="text-[14px] leading-[21px] tracking-[0.2px] text-[#718096] font-medium text-left">
                              at {formatTime(result.expiration)}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {data && data.data && data?.data?.results.length > 0 && (
          <div className="flex justify-between items-center">
            <div className="mt-4 flex justify-center text-gray-500 text-sm">
              <span className="mr-2">
                Showing {data.data.firstRowOnPage} - {data.data.lastRowOnPage}{" "}
                of {data.data.rowCount} results
              </span>
              <span className="mr-2">|</span>
              <span className="mr-2">
                Page {data.data.currentPage} of {data.data.pageCount}
              </span>
              <span className="mr-2">|</span>
              <span className="mr-2">Page Size: {data.data.pageSize}</span>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                className="mr-2 px-4 py-2 flex gap-1 disabled:opacity-75 border bg-[#124072] border-transparent text-sm font-medium rounded-md text-[white]  hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#124072]"
                onClick={handlePrevPage}
                disabled={currentPage === 1 || isPreviousData}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 5L7.5 10L12.5 15"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Prev
              </button>
              <button
                className="mr-2 px-4 py-2 flex gap-1 disabled:opacity-75 border bg-[#124072] border-transparent text-sm font-medium rounded-md text-[white]  hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#124072]"
                onClick={handleNextPage}
                disabled={currentPage === data.data.pageCount || isPreviousData}
              >
                Next
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 5L12.5 10L7.5 15"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create New Admin Modal */}
      <Modal isOpen={isOpen} onClose={HandleModalClose}>
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-[white] rounded-2xl shadow-xl py-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className=" flex justify-between px-5">
            <h3 className="text-[24px] leading-[31px]  text-[#1A202C] font-extrabold">
              Create a Payment Link
            </h3>
            <svg
              onClick={HandleModalClose}
              className="cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.9497 7.05032L7.05021 16.9498"
                stroke="#171717"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.05029 7.05032L16.9498 16.9498"
                stroke="#171717"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="px-5">
              <form className="flex justify-between mt-5 ">
                <div className="flex justify-between items-center gap-3 ">
                  <input type="radio" onClick={handleMultipleOption} />
                  <label
                    className={`text-[#718096] ${
                      multipleCustomer
                        ? "px-2 py-2 border-b text-[#FFF] rounded-md bg-[#124072] "
                        : ""
                    }`}
                  >
                    Multiple Customers
                  </label>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <input
                    type="radio"
                    onClick={handleSingleOption}
                    checked="checked"
                  />
                  <p
                    className={` text-[#718096] ${
                      singleCustomer
                        ? "px-2 py-2 border-b text-[#FFF] rounded-md bg-[#124072] "
                        : ""
                    }`}
                  >
                    One Time Customer
                  </p>
                </div>
              </form>
              {singleCustomer && (
                <div>
                  <form onSubmit={createInvoice}>
                    <div className="mt-7">
                      <label className="font-semibold text-[#718096]">
                        Amount
                      </label>

                      <div className="bg-[#F7F7F7] gap-2  h-[36px] flex items-center pl-1 rounded-lg">
                        <select
                          type="text"
                          className=" h-full bg-[#F7F7F7] border-0  sm:text-sm focus:ring-0 min-w-[80px] "
                          autofocus
                          required
                          value={currencyCode}
                          onChange={(e) => setCurrencyCode(e.target.value)}
                        >
                          <option value="">NGN </option>
                          {currencyQuery.data &&
                            currencyQuery.data?.data?.results.map(
                              (currency) => (
                                <option
                                  key={currency.currencyCode}
                                  value={currency.currencyCode}
                                >
                                  {currency.currencyCode}
                                </option>
                              )
                            )}
                        </select>
                        <input
                          placeholder="How much?"
                          className="w-full h-full px-2 placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#124072] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  focus:outline-none focus:ring-[#124072] focus:border-[#124072] sm:text-sm"
                          autofocus
                          required
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mt-5">
                      <label className="font-semibold text-[#718096] ">
                        Customer Email
                      </label>
                      <div className="bg-[#F7F7F7]   h-[36px] flex items-center rounded-lg">
                        <input
                          type="email"
                          placeholder="customer@email.com"
                          className="w-full h-full px-2 placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  focus:outline-none focus:ring-[#124072] focus:border-[#124072]  sm:text-sm"
                          autofocus
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mt-5">
                      <label className="font-semibold text-[#718096]">
                        Customer Phone Number
                      </label>
                      <div className="bg-[#F7F7F7]   h-[36px] flex items-center rounded-lg">
                        <input
                          type="tel"
                          placeholder="09000000000"
                          className="w-full h-full px-2 placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  focus:outline-none focus:ring-[#124072] focus:border-[#124072]  sm:text-sm"
                          autofocus
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mt-5">
                      <label className="font-semibold text-[#718096]">
                        Set Expiry Date
                      </label>
                      <div className="bg-[#F7F7F7]   h-[36px] flex items-center rounded-lg">
                        <input
                          type="date"
                          placeholder=""
                          className="w-full h-full px-2 placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  focus:outline-none focus:ring-[#124072] focus:border-[#124072]  sm:text-sm"
                          autofocus
                          required
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="font-semibold text-[#718096]">
                        Description
                      </label>
                      <textarea
                        placeholder="Tell your customer why you are requesting this payment"
                        className="w-full h-full placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  focus:outline-none focus:ring-[#124072] focus:border-[#124072]  sm:text-sm"
                        autofocus
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <button className="px-4 py-2 w-full mt-5  self-end bg-[#124072]  text-[white] text-[14px] h-[48px] leading-[21px] tracking-[0.2px] font-extrabold rounded-xl flex items-center justify-center mr-4 ">
                      Send{" "}
                      {loading && (
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
              )}
              {multipleCustomer && (
                <div>
                  <form onSubmit={createInvoice}>
                    <div className="mt-7">
                      <label className="font-semibold text-[#718096]">
                        Amount
                      </label>
                      <div className="bg-[#F7F7F7] gap-2  h-[36px] flex items-center pl-1 rounded-lg">
                        <select
                          type="text"
                          className=" h-full bg-[#F7F7F7] border-0  sm:text-sm focus:ring-0 min-w-[80px] "
                          autofocus
                          required
                          value={currencyCode}
                          onChange={(e) => setCurrencyCode(e.target.value)}
                        >
                          <option value="">NGN </option>
                          {currencyQuery.data &&
                            currencyQuery.data?.data?.results.map(
                              (currency) => (
                                <option
                                  key={currency.currencyCode}
                                  value={currency.currencyCode}
                                >
                                  {currency.currencyCode}
                                </option>
                              )
                            )}
                        </select>
                        <input
                          placeholder="How much?"
                          className="w-full h-full px-2 placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#124072] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  focus:outline-none focus:ring-[#124072] focus:border-[#124072] sm:text-sm"
                          autofocus
                          required
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mt-5">
                      <label className="font-semibold text-[#718096]">
                        Set Expiry Date
                      </label>
                      <div className="bg-[#F7F7F7]   h-[36px] flex items-center rounded-lg">
                        <input
                          type="date"
                          placeholder=""
                          className="w-full h-full px-2 placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  focus:outline-none focus:ring-[#124072] focus:border-[#124072]  sm:text-sm"
                          autofocus
                          required
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="font-semibold text-[#718096]">
                        Description
                      </label>
                      <textarea
                        placeholder="Tell your customer why you are requesting this payment"
                        className="w-full h-full placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  focus:outline-none focus:ring-[#124072] focus:border-[#124072]  sm:text-sm"
                        autofocus
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <button className="px-4 py-2 w-full mt-5 text-center self-end bg-[#124072]  text-[white] text-[14px] h-[48px] leading-[21px] tracking-[0.2px] font-extrabold rounded-xl flex items-center justify-center mr-4 ">
                      Send{" "}
                      {loading && (
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
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* QR Code Modal */}
      <Modal isOpen={isQrModalOpen} onClose={handleQRModalClose}>
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-[white] rounded-2xl shadow-xl py-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className=" flex justify-between px-5">
            <h3 className="text-[20px] leading-[31px]  text-[#1A202C] font-extrabold">
              {qrLoading
                ? "QR Code Generated Successfully!!"
                : "Generating QR Code..."}
            </h3>
            <svg
              onClick={handleQRModalClose}
              className="cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.9497 7.05032L7.05021 16.9498"
                stroke="#171717"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.05029 7.05032L16.9498 16.9498"
                stroke="#171717"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          {qrLoading ? (
            <div>
              <div className="mt-[24px] items-center  flex justify-center">
                {linkData !== null ? (
                 <div className="px-7 py-10" ref={elementToCaptureRef}>
                    <QRCode
                      value={linkData}
                      imageSettings={{ height: "40%" }}
                      className="h-10 mx-auto mb-5"
                    />

                    <p>Use the above QR code to pay for {linkDescription}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="w-full flex justify-center">
                {" "}
                <button
                  className=" mt-8 px-2 py-1 shadow rounded-md bg-[#124072] text-[white] hover:bg-[#124071ed] "
                  // onClick={generateQRCode}
                  onClick={captureAndDownload}
                >
                  Download or Share QR Code
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-[300px]">
              <svg
                className="ml-4 w-6 h-6 text-[#124072] animate-spin"
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
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default PaymentLink;
