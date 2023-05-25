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
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [biller, setBiller] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [displaySearch, setDisplaySearch] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isCostumInvoiceOpen, setIsCostumInvoiceOpen] = useState(false);
  const [transactionData, setTransactionData] = useState([]);

  const handleTransacModalOpen = (electricity) => {
    setTransactionData(electricity);
    setIsTransactionModalOpen(true);
  };
  const handleTransacModalClose = () => {
    setIsTransactionModalOpen(false);
  };

  const handleDisplaySearch = () => {
    setDisplaySearch(!displaySearch);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleFilterModalOpen = () => {
    setIsFilterModalOpen(true);
  };

  const handleFilterModalClose = () => {
    setIsFilterModalOpen(false);
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
        // Biller: biller,
        // ReferenceNumber: referenceNumber,
        // Status: status,
        // StartDate: startDate,
        // EndDate: endDate,
      },
    });
    console.log("settlement", response);
    return response;
  }
  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(
    [
      "electricity",
      // currentPage,
      // biller,
      // referenceNumber,
      // status,
      // startDate,
      // endDate,
    ],
    () =>
      getSettlement(),
      // currentPage,
      // biller,
      // referenceNumber,
      // status,
      // startDate,
      // endDate
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

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
            placeholder="Search by customer name.."
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
        </div>
      </div>
      {/* end search and filter button */}
      {displaySearch ? (
        <tr>
          <td className="text-center" colspan="7">
            <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-4">
              <div className="relative py-4   w-full mx-6 ">
                <input
                  type="text"
                  className="w-full py-2 pl-3 pr-4 text-[#A0AEC0] leading-[21px] tracking-[0.2px] text-[14px] border border-[#E2E8F0] rounded-xl  focus:border-gray-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                  placeholder="Search for customer"
                  value={biller}
                  onChange={(e) => setBiller(e.target.value)}
                />
              </div>
              <div className="relative py-4   w-full mx-6  ">
                <input
                  type="text"
                  className="w-full py-2 pl-3 pr-4 text-[#A0AEC0] leading-[21px] tracking-[0.2px] text-[14px] border border-[#E2E8F0] rounded-xl  focus:border-gray-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                  placeholder="Search account number"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                />
              </div>
              <div className="  py-4  w-full mx-6 ">
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
                Bussiness Name
              </th>

              <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                Bank Account
              </th>

              <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                Amount
              </th>
              <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                Currency
              </th>
              
              <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                Status
              </th>
              <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                Date Created
              </th>
              <th className=" py-[20px] border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#718096] font-extrabold text-left  ">
                Actions
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
                    {/* {result.biller && result.biller.code} */}
                  </td>

                  <td className=" py-[28px] pr-3 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                    {/* <NumericFormat
                      value={result.amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      renderText={(value) => <p>{value}</p>}
                    /> */}
                  </td>

                  <td className=" py-[28px] pr-3 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                    {/* {result.meterNumber} */}
                  </td>
                  <td className=" py-[28px] pr-3 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                    {/* {result.meterType} */}
                  </td>

                  <td className=" py-[28px] pr-3 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                    {/* {result.units} */}
                  </td>
                  <td className=" py-[28px] pr-3 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                    {/* {result.status === "Success" ? (
                      <button class="bg-[#F6FDF9] rounded-lg text-[#22C55E] px-5 py-[9.5px] text-[14px] leading-[21px] tracking-[0.2px] font-medium ">
                        {result.status}
                      </button>
                    ) : (
                      <button class="bg-[#FFF7F5] rounded-lg text-[#FF784B] px-5 py-[9.5px] text-[14px] leading-[21px] tracking-[0.2px] font-medium ">
                        {result.status}
                      </button>
                    )} */}
                  </td>
                  <td className=" py-[28px] pr-3 border-t border-[#EDF2F7] text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left  ">
                    <div className="">
                      {/* <p className="text-[16px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-left mb-1">
                        {result.createdDate && formatDate(result.createdDate)}
                      </p>
                      <p className="text-[14px] leading-[21px] tracking-[0.2px] text-[#718096] font-medium text-left">
                        {result.createdDate && "at"}
                        {result.createdDate && formatTime(result.createdDate)}
                      </p> */}
                    </div>
                  </td>
                  <td className=" py-[24px] border-t border-[#EDF2F7]  ">
                    <div>
                      <button
                        onClick={() => handleTransacModalOpen(result)}
                        className="h-8 w-8 border border-[#E2E8F0] hover:bg-[#CBD5E0] px-[6px] py-[6px] rounded-[8px] "
                      >
                        <svg
                          className="hover:text-[white]"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.8337 10.0002C10.8337 9.53993 10.4606 9.16683 10.0003 9.16683C9.54009 9.16683 9.16699 9.53993 9.16699 10.0002C9.16699 10.4604 9.54009 10.8335 10.0003 10.8335C10.4606 10.8335 10.8337 10.4604 10.8337 10.0002Z"
                            stroke="#718096"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16.6667 10.0002C16.6667 9.53993 16.2936 9.16683 15.8333 9.16683C15.3731 9.16683 15 9.53993 15 10.0002C15 10.4604 15.3731 10.8335 15.8333 10.8335C16.2936 10.8335 16.6667 10.4604 16.6667 10.0002Z"
                            stroke="#718096"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.00016 10.0002C5.00016 9.53993 4.62707 9.16683 4.16683 9.16683C3.70659 9.16683 3.3335 9.53993 3.3335 10.0002C3.3335 10.4604 3.70659 10.8335 4.16683 10.8335C4.62707 10.8335 5.00016 10.4604 5.00016 10.0002Z"
                            stroke="#718096"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
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
      <Modal isOpen={isTransactionModalOpen} onClose={handleTransacModalClose}>
        <div className="inline-block overflow-hidden text-left relative align-bottom transition-all transform bg-[white] rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="mt-4 flex justify-between mx-5 border-b border-b-[#edf2f7]">
            <div className="flex items-center gap-4">
              <svg
                onClick={handleTransacModalClose}
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
              <h3 className="text-[24px] leading-[31px]  text-[#1A202C] font-extrabold">
                Electricity Transaction Details
              </h3>
            </div>
            <div>
              <button
                // onClick={() => handleCostumInvoiceOpen()}
                className="h-8 w-8 border border-[#E2E8F0] hover:bg-[#CBD5E0] px-[6px] py-[6px] rounded-[8px] "
              >
                <svg
                  className="hover:text-[white]"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8337 10.0002C10.8337 9.53993 10.4606 9.16683 10.0003 9.16683C9.54009 9.16683 9.16699 9.53993 9.16699 10.0002C9.16699 10.4604 9.54009 10.8335 10.0003 10.8335C10.4606 10.8335 10.8337 10.4604 10.8337 10.0002Z"
                    stroke="#718096"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.6667 10.0002C16.6667 9.53993 16.2936 9.16683 15.8333 9.16683C15.3731 9.16683 15 9.53993 15 10.0002C15 10.4604 15.3731 10.8335 15.8333 10.8335C16.2936 10.8335 16.6667 10.4604 16.6667 10.0002Z"
                    stroke="#718096"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.00016 10.0002C5.00016 9.53993 4.62707 9.16683 4.16683 9.16683C3.70659 9.16683 3.3335 9.53993 3.3335 10.0002C3.3335 10.4604 3.70659 10.8335 4.16683 10.8335C4.62707 10.8335 5.00016 10.4604 5.00016 10.0002Z"
                    stroke="#718096"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* customer invoice */}
          {/* {isCostumInvoiceOpen ? (
            <div className="px-[12px] py-[15px] absolute top-11 right-3 shadow-md rounded-md z-10 ">
              <p>Customer Invoice</p>
              <button className="flex flex-row gap-3 mt-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.1667 14.1667H15.8333C16.2754 14.1667 16.6993 13.9911 17.0118 13.6785C17.3244 13.366 17.5 12.942 17.5 12.5V9.16667C17.5 8.72464 17.3244 8.30072 17.0118 7.98816C16.6993 7.6756 16.2754 7.5 15.8333 7.5H4.16667C3.72464 7.5 3.30072 7.6756 2.98816 7.98816C2.67559 8.30072 2.5 8.72464 2.5 9.16667V12.5C2.5 12.942 2.67559 13.366 2.98816 13.6785C3.30072 13.9911 3.72464 14.1667 4.16667 14.1667H5.83333"
                    stroke="#718096"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.1668 7.5V4.16667C14.1668 3.72464 13.9912 3.30072 13.6787 2.98816C13.3661 2.67559 12.9422 2.5 12.5002 2.5H7.50016C7.05814 2.5 6.63421 2.67559 6.32165 2.98816C6.00909 3.30072 5.8335 3.72464 5.8335 4.16667V7.5"
                    stroke="#718096"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.5002 10.8333H7.50016C6.57969 10.8333 5.8335 11.5795 5.8335 12.5V15.8333C5.8335 16.7538 6.57969 17.5 7.50016 17.5H12.5002C13.4206 17.5 14.1668 16.7538 14.1668 15.8333V12.5C14.1668 11.5795 13.4206 10.8333 12.5002 10.8333Z"
                    stroke="#718096"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Print Invoice
              </button>
              <button className="flex flex-row gap-3 mt-2">
                <svg
                  width="14"
                  height="18"
                  viewBox="0 0 14 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.6665 1.5V4.83333C8.6665 5.05435 8.7543 5.26631 8.91058 5.42259C9.06686 5.57887 9.27882 5.66667 9.49984 5.66667H12.8332"
                    stroke="#718096"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.1665 16.5H2.83317C2.39114 16.5 1.96722 16.3244 1.65466 16.0118C1.3421 15.6993 1.1665 15.2754 1.1665 14.8333V3.16667C1.1665 2.72464 1.3421 2.30072 1.65466 1.98816C1.96722 1.67559 2.39114 1.5 2.83317 1.5H8.6665L12.8332 5.66667V14.8333C12.8332 15.2754 12.6576 15.6993 12.345 16.0118C12.0325 16.3244 11.6085 16.5 11.1665 16.5Z"
                    stroke="#718096"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7 8.16669V13.1667"
                    stroke="#718096"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M4.5 10.6667L7 13.1667L9.5 10.6667"
                    stroke="#718096"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Download PDF
              </button>
            </div>
          ) : (
            ""
          )} */}

          <div className="flex flex-col justify-center text-center mb-3 mt-4">
            <div className="rounded-full bg-[#F7FAFC] h-[110px] mx-auto flex items-center justify-center w-[110px] p-[26px] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[56px] h-[56px] text-[#1A202C]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <p className="text-[24px] leading-[21px] tracking-[0.2px] text-dark font-extrabold mt-4">
              {/* <NumericFormat
                value={transactionData?.amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
                decimalScale={0}
                fixedDecimalScale={true}
                renderText={(value) => <p>{value}</p>}
              /> */}
            </p>
            {/* <p className=" text-[#718096] text-[18px] leading-[21px] tracking-[0.2px] mt-2">
              Billing Category
            </p> */}
          </div>

          <div className="grid grid-col gap-3 pt-4 mx-5 mb-4">
            <div className="flex justify-between">
              <div className="flex gap-2 ">
                <img src="./users-side.png" alt="" />
                <p className=" text-[#718096] text-[14px] leading-[21px] tracking-[0.2px]">
                  Client
                </p>
              </div>
              <p className="text-[#1a202c] text-[14px] leading-[21px] tracking-[0.2px] font-bold">
                {/* {transactionData?.client?.name} */}
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2 ">
                <img src="./global.png" alt="" />
                <p className=" text-[#718096] text-[14px] leading-[21px] tracking-[0.2px]">
                  Biller
                </p>
              </div>
              <p className="text-[#1a202c] text-[14px] leading-[21px] tracking-[0.2px] font-bold">
                {/* {transactionData?.biller?.name} */}
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2 ">
                <img src="./element-plus.png" alt="" />
                <p className=" text-[#718096] text-[14px] leading-[21px] tracking-[0.2px]">
                  Token
                </p>
              </div>
              <p className="text-[#ff784b] text-[14px] leading-[21px] tracking-[0.2px] font-bold">
                {/* {transactionData?.serviceValue} */}
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2 ">
                <img src="./transaction.png" alt="" />
                <p className=" text-[#718096] text-[14px] leading-[21px] tracking-[0.2px]">
                  A/C MSIDN
                </p>
              </div>
              <p className="text-[#1a202c] text-[14px] leading-[21px] tracking-[0.2px] font-bold">
                {/* {transactionData?.meterNumber} */}
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2 ">
                <img src="./transaction.png" alt="" />
                <p className=" text-[#718096] text-[14px] leading-[21px] tracking-[0.2px]">
                  Meter Type
                </p>
              </div>
              <p className="text-[#1a202c] text-[14px] leading-[21px] tracking-[0.2px] font-bold">
                {/* {transactionData?.meterType} */}
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2 ">
                <img src="./calendar.png" alt="" />
                <p className=" text-[#718096] text-[14px] leading-[21px] tracking-[0.2px]">
                  Date
                </p>
              </div>
              <p className="text-[#1a202c] text-[14px] leading-[21px] tracking-[0.2px] font-bold">
                {/* {formatDate(transactionData?.createdDate) +
                  ", " +
                  formatTime(transactionData?.createdDate)} */}
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2 ">
                <img src="./flash.png" alt="" />
                <p className=" text-[#718096] text-[14px] leading-[21px] tracking-[0.2px]">
                  Rate
                </p>
              </div>
              <p className="text-[#1a202c] text-[14px] leading-[21px] tracking-[0.2px] font-bold">
                {/* {transactionData?.clientRate}% */}
              </p>
            </div>
            {/* <div className="flex justify-between">
              <div className="flex gap-2 ">
                <img src="./dollar-circle.png" alt="" />
                <p className=" text-[#718096] text-[14px] leading-[21px] tracking-[0.2px]">
                  Commission
                </p>
              </div>
              <p className="text-[#1a202c] text-[14px] leading-[21px] tracking-[0.2px] font-bold">
                ₦ 30,000(1.5%)
              </p>
            </div> */}
            <div className="flex justify-between">
              <div className="flex gap-2 ">
                <img src="./users-side.png" alt="" />
                <p className=" text-[#718096] text-[14px] leading-[21px] tracking-[0.2px]">
                  Client Profit
                </p>
              </div>
              <p className="text-[#1a202c] text-[14px] leading-[21px] tracking-[0.2px] font-bold">
                {/* <NumericFormat
                  value={transactionData?.profitValue}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                  decimalScale={0}
                  fixedDecimalScale={true}
                  renderText={(value) => <p>{value}</p>}
                /> */}
              </p>
            </div>
            {/* <div className="flex justify-between">
              <div className="flex gap-2 ">
                <img src="./dropdown.png" alt="" />
                <p className=" text-[#718096] text-[14px] leading-[21px] tracking-[0.2px]">
                  DML Profit
                </p>
              </div>
              <p className="text-[#1a202c] text-[14px] leading-[21px] tracking-[0.2px] font-extrabold">
                ₦ 30,000(1.5%)
              </p>
            </div> */}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settlements;
