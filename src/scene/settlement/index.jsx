import React, { useReducer, useRef, useState } from "react";
import Moment from "moment";

import Modal from "../../components/Modal";
import { enqueueSnackbar } from "notistack";
import api from "../../api";
import { useQuery } from "@tanstack/react-query";
import { NumericFormat } from "react-number-format";

const Settlements = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [biller, setBiller] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [displaySearch, setDisplaySearch] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [currency, setCurrency] = useState("");
  const [transactionData, setTransactionData] = useState([]);
  const [exportStatus, setExportStatus] = useState("");
  const [exportStartDate, setExportStartDate] = useState("");
  const [exportEndDate, setExportEndDate] = useState("");



  const handleDisplaySearch = () => {
    setDisplaySearch(!displaySearch);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };



  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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

  async function getSettlement(currentPage) {
    const response = await api.getSettlement({
      params: {
        PageIndex: currentPage,
        currency: currency,
        Status: status,
        StartDate: startDate,
        EndDate: endDate,
      },
    });
    console.log("settlement", response);
    return response;
  }
  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(
    ["getSettlement", currency, status, startDate, endDate],
    () => getSettlement(),
    // currentPage,
    currency,
    // referenceNumber,
    status,
    startDate,
    endDate,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );


  function clearForm() {
    
    setExportStatus("");
    setExportStartDate("");
    setExportEndDate("");
  }
  async function exportSettlement(e) {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await api.exportSettlement({
        params: {
          StartDate: exportStartDate,
          EndDate: exportEndDate,
          Status: exportStatus,
        },
      });
      console.log("res of export==>>>>>", response);
      // window.open('http://stackoverflow.com', '_blank');
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Transactions.csv"); // or any other filename you want
      document.body.appendChild(link);
      link.click();
      enqueueSnackbar("Transaction Exported Successfully ", {
        variant: "success",
      });
      setLoading(false);
      refetch();
      handleModalClose();
      clearForm();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setLoading(false);
    }
  }

  // if (isError) {
  //   return (
  //     <div className="mx-6 text-center justify-center items-center mt-4">
  //       <img src="./error.gif" className="mx-auto mt-6 mb-3" alt="" />
  //       <h3 className="text-[35px] leading-[40px]  text-[#1A202C] font-extrabold">
  //         {error.message}
  //       </h3>
  //     </div>
  //   );
  // }

  return (
    <div className="mt-9  mx-6">
      {/* search and filter button */}
      <div className="lg:flex lg:justify-between items-center mb-8 ">
        <div className="relative py-4  lg:w-[295px] w-full ">
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
            className="w-full py-2 pl-10 pr-4 text-[rgb(160,174,192)] leading-[21px] tracking-[0.2px] text-[14px] border border-[#E2E8F0] rounded-xl  focus:border-gray-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
            placeholder="Search by Account name.."
            value={biller}
            onChange={(e) => setBiller(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <button
            onClick={handleDisplaySearch}
            className="px-4 py-4 border border-[#E2E8F0]  text-[#1A202C] text-[14px] leading-[21px] tracking-[0.2px] h-[48px] font-semibold rounded-xl flex items-center mr-4 "
          >
            <svg
              className="mr-2"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.60851 13.8274H3.35791"
                stroke="#1A202C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.9507 5.75029H16.2013"
                stroke="#1A202C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.27207 5.70521C7.27207 4.6255 6.39027 3.75 5.30278 3.75C4.2153 3.75 3.3335 4.6255 3.3335 5.70521C3.3335 6.78492 4.2153 7.66042 5.30278 7.66042C6.39027 7.66042 7.27207 6.78492 7.27207 5.70521Z"
                stroke="#1A202C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.6666 13.7948C16.6666 12.7151 15.7855 11.8396 14.698 11.8396C13.6098 11.8396 12.728 12.7151 12.728 13.7948C12.728 14.8745 13.6098 15.75 14.698 15.75C15.7855 15.75 16.6666 14.8745 16.6666 13.7948Z"
                stroke="#1A202C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Filters
          </button>
          <button
            onClick={handleModalOpen}
            className="px-4 py-4 border border-[#E2E8F0]  text-[#1A202C] text-[14px] leading-[21px] tracking-[0.2px] h-[48px] font-semibold rounded-xl flex items-center "
          >
            <svg
              className="mr-2"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66658 8.33333L4.99992 8.33333C4.55789 8.33333 4.13397 8.50893 3.82141 8.82149C3.50885 9.13405 3.33325 9.55797 3.33325 10L3.33325 15.8333C3.33325 16.2754 3.50885 16.6993 3.82141 17.0118C4.13397 17.3244 4.55789 17.5 4.99992 17.5L14.9999 17.5C15.4419 17.5 15.8659 17.3244 16.1784 17.0118C16.491 16.6993 16.6666 16.2754 16.6666 15.8333L16.6666 10C16.6666 9.55797 16.491 9.13405 16.1784 8.82149C15.8659 8.50893 15.4419 8.33333 14.9999 8.33333L13.3333 8.33333"
                stroke="#1A202C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 14.1667L10 2.50002M10 2.50002L7.5 5.00002M10 2.50002L12.5 5.00002"
                stroke="#1A202C"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Export
          </button>
        </div>
      </div>
      {/* end search and filter button */}
      {displaySearch ? (
        <tr>
          <td className="text-center" colspan="7">
            <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-4">
              <div className="relative py-4   w-full mx-6  ">
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
              <div className="  py-4  w-full mx-6 ">
                <select
                  className="w-full py-2 pl-3 pr-4 text-[#A0AEC0] leading-[21px] tracking-[0.2px] text-[14px] border border-[#E2E8F0] rounded-xl  focus:border-gray-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                  autofocus
                  required
                  placeholder=""
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="">All currency</option>

                  <option value={"NGN"}>Naira</option>
                  <option value={"USD"}>Dollar</option>
                </select>
              </div>
              <div className="relative py-4   w-full mx-6 ">
                <input
                  type="date"
                  className="w-full py-2 pl-3 pr-4 text-[#A0AEC0] leading-[21px] tracking-[0.2px] text-[14px] border border-[#E2E8F0] rounded-xl  focus:border-gray-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                  placeholder="Search for start date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="relative py-4   w-full mx-6 ">
                <input
                  type="date"
                  className="w-full py-2 pl-3 pr-4 text-[#A0AEC0] leading-[21px] tracking-[0.2px] text-[14px] border border-[#E2E8F0] rounded-xl  focus:border-gray-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
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
      )}
      {/* table */}

      <div className="flex flex-col break-words overflow-x-auto bg-white  mb-6">
        <table className="min-w-full mb-6">
          <thead>
            <tr className="mb-2">
              <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                Merchant Name
              </th>

              <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                Amount
              </th>
              <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                Account Name
              </th>
              <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                Bank Account
              </th>
              <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                Status
              </th>
              <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                Date
              </th>
              <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && !isPreviousData && <div>Loading...</div>}
            {!isLoading && data?.data?.results.length === 0 && (
              <tr>
                <td className="text-center" colspan="6">
                  <img src="./nodata.gif" className="mx-auto mt-6 " alt="" />
                  <h3 className="text-[30px] leading-[35px]  text-[#1A202C] font-extrabold mb-[6px]">
                    No Data
                  </h3>
                </td>
              </tr>
            )}
            {data &&
              data?.data?.results?.map((result) => (
                <tr key={result.id} className="mb-2">
                  <td className=" py-[24px] pr-3 border-t border-[#EDF2F7]  lg:flex items-center text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                    {result?.merchant?.bussinessName}
                  </td>
                  <td className=" py-[28px] pr-3 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                    <NumericFormat
                      value={result.amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      renderText={(value) => <p>{value}</p>}
                    />
                  </td>
                  <td className=" py-[28px] pr-3 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                    {result.paymentReference}
                  </td>
                  <td className=" py-[28px] pr-3 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                    {result.bankAccountNumber}
                  </td>
                  <td className=" py-[28px] pr-3 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                    {result.status === "Success" ? (
                      <button class="bg-[#F6FDF9] flex rounded-lg text-[#22C55E] px-5 py-[9.5px] text-[14px] leading-[21px] tracking-[0.2px] font-medium ">
                        Success
                      </button>
                    ) : (
                      <button class="bg-[#FFF7F5] flex rounded-lg text-[#FF784B] px-5 py-[9.5px] text-[14px] leading-[21px] tracking-[0.2px] font-medium ">
                        Pending
                      </button>
                    )}
                  </td>
                  <td className=" py-[28px] pr-3 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                    <div className="">
                      <p className="text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left mb-1">
                        {formatDate(result.createdDate)}
                      </p>
                      <p className="text-[14px] leading-[21px] tracking-[0.2px] text-[#718096] font-medium text-left">
                        at {formatTime(result.createdDate)}
                      </p>
                    </div>
                  </td>

                  <td className=" py-[24px] border-t border-[#EDF2F7]  ">
                    <div>
                      <button
                        // onClick={() => handleTransacModalOpen(result)}
                        className=" text-sm border border-[#E2E8F0] hover:bg-[#CBD5E0] px-[6px] py-[6px] rounded-[8px] "
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* pagination */}
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
        {/* end pagination */}
      </div>
      {/* transaction details modal */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-[white] rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="mt-4 flex justify-between mx-5">
            <h3 className="text-[24px] leading-[31px]  text-[#1A202C] font-extrabold">
              Export Settlements
            </h3>
            <svg
              onClick={handleModalClose}
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
            <form onSubmit={exportSettlement}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6 pt-4">
                    <div className="col-span-12 sm:col-span-6 ">
                      <p className="text-[#718096] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
                        Status
                      </p>
                      <select
                        className="block w-full webkit  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        value={exportStatus}
                        onChange={(e) => setExportStatus(e.target.value)}
                      >
                        <option value="">All Status</option>

                        <option value={"Success"}>Success</option>
                        <option value={"Failed"}>Failed</option>
                        <option value={"Initiated"}>Initiated</option>
                        <option value={"Processing"}>Processing</option>
                      </select>
                    </div>
                    <div className="col-span-12 sm:col-span-6 ">
                      <p className="text-[#718096] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
                        Start Date
                      </p>
                      <input
                        type="date"
                        className="block w-full  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        placeholder="start date"
                        value={exportStartDate}
                        onChange={(e) => setExportStartDate(e.target.value)}
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-6 ">
                      <p className="text-[#718096] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold mb-[12px]">
                        End Date
                      </p>
                      <input
                        type="date"
                        className="block w-full  h-14 px-4 py-[13.5px] placeholder:text-[#A0AEC0] placeholder:font-normal font-medium text-[#1A202C] text-[16px] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                        placeholder=""
                        value={exportEndDate}
                        onChange={(e) => setExportEndDate(e.target.value)}
                      />
                    </div>

                    <div className="col-span-12 sm:col-span-6 mb- mt-6">
                      <button
                        type="submit"
                        className="py-4 items-center rounded-[24px] w-full bg-[#124072] text-[white] text-[16px] leading-[24px] tracking-[0.2px] font-extrabold flex justify-center "
                      >
                        Export
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
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settlements;
