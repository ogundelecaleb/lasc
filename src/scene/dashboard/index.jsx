import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { mockDataTransaction } from "../../data/mockData";
import { mockDataBillers } from "../../data/mockData";
import Moment from "moment";
import { NumericFormat } from "react-number-format";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [range, setRange] = useState("Daily");
  const [progress, setPogress] = useState("5");
  function formatDate(datetimeStr) {
    const date = Moment(datetimeStr);
    const formattedDate = date.format("MMM DD, YYYY");

    return formattedDate;
  }

  function formatTime(date) {
    const datetime = Moment(date);
    const formattedTime = datetime.format("hh.mm A");
    return formattedTime;
  }

  // async function getTransactions() {
  //   const response = await api.getTransaction({
  //     params: { PageIndex: currentPage },
  //   });
  //   console.log("transactions", response);
  //   return response;
  // }
  // async function getBillers(currentPage) {
  //   const response = await api.getBillers({
  //     params: { PageIndex: currentPage },
  //   });
  //   console.log("billers", response);
  //   return response;
  // }
  // async function getBillersCount() {
  //   const response = await api.getBillerCount();
  //   console.log("billersCount", response);
  //   return response;
  // }

  // async function getDashboardTransactions(range) {
  //   const response = await api.getDashboardTransactions({
  //     params: { Period: range },
  //   });

  //   let newArray = Object.entries(response.data.TransactionVolume).map(
  //     ([label, value]) => {
  //       return { date: label, amount: value };
  //     }
  //   );
  //   let countArray = Object.entries(response.data.TransactionCount).map(
  //     ([label, value]) => {
  //       return { date: label, amount: value };
  //     }
  //   );

  //   let pieChartArray = Object.entries(response.data.TransactionStatus).map(
  //     ([label, value]) => {
  //       return { status: label + " " + "(" + value + ")", amount: value };
  //     }
  //   );

  //   const chartData = {
  //     labels: newArray.map((data) => data.date),
  //     datasets: [
  //       {
  //         label: "Transaction Volume",
  //         data: newArray.map((data) => data.amount),
  //         backgroundColor: "#124072",
  //         borderColor: "#124072",
  //         borderWidth: 2,
  //         pointBorderColor: "transparent",
  //         pointBorderWidth: 2,
  //         pointRadius: 0,
  //       },
  //       {
  //         label: "Transaction Count",
  //         data: countArray.map((data) => data.amount),
  //         backgroundColor: "#4ADE80",
  //         borderColor: "#4ADE80",
  //         borderWidth: 2,
  //         pointBorderColor: "transparent",
  //         pointBorderWidth: 2,
  //         pointRadius: 0,
  //       },
  //     ],
  //   };

  //   const pieChartData = {
  //     labels: pieChartArray.map((data) => data.status),
  //     datasets: [
  //       {
  //         label: "Transaction Status",
  //         data: pieChartArray.map((data) => data.amount),
  //         // backgroundColor: "#124072",
  //         // borderColor: "#124072",
  //         // borderWidth: 2,
  //         // pointBorderColor: "transparent",
  //         // pointBorderWidth: 2,
  //         // pointRadius: 0,
  //         backgroundColor: ["#936DFF", "#FDE047", "#4ADE80", "#FF7171"],
  //         hoverOffset: 4,
  //       },
  //     ],
  //   };

  //   let newChartArray = { chartData, pieChartData };
  //   console.log("chart", newChartArray);
  //   return newChartArray;
  // }

  // const options = {
  //   plugins: {
  //     legend: false,
  //   },
  //   scales: {
  //     x: {
  //       border: {
  //         display: false,
  //       },
  //       grid: {
  //         color: "transparent",
  //       },
  //     },
  //     y: {
  //       border: {
  //         display: false,
  //       },
  //       grid: {
  //         color: "transparent",
  //       },
  //     },
  //   },
  // };
  // const TransactionQuery = useQuery(
  //   ["transactions", currentPage],
  //   () => getTransactions(currentPage),
  //   {
  //     keepPreviousData: true,
  //     refetchOnWindowFocus: "always",
  //   }
  // );

  // const BillerQuery = useQuery(
  //   ["billers", currentPage],
  //   () => getBillers(currentPage),
  //   {
  //     keepPreviousData: true,
  //     refetchOnWindowFocus: "always",
  //   }
  // );

  // const ChartDataQuery = useQuery(
  //   ["chartData", range],
  //   () => getDashboardTransactions(range),
  //   {
  //     // keepPreviousData: true,
  //     refetchOnWindowFocus: "always",
  //   }
  // );

  // const BillerCountQuery = useQuery(["billersCount"], () => getBillersCount(), {
  //   keepPreviousData: true,
  //   refetchOnWindowFocus: "always",
  // });

  return (
    <div class="lg:flex mx-10 mt-6">
      <div class="lg:mr-[24px] lg:w-[65%]">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-[16px] mb-6">
          <div class="bg-white border border-[#EDF2F7] rounded-[16px] pt-[16px] px-[20px] pb-[20px]  ">
            <p className="text-[14px] text-[#718096] text-center">
              Generated Income
            </p>

            <div className="mt-[45px] py-[10px]">
              <h2 className="text-[40px] text-[#1a202c] font-bold">
                <NumericFormat
                  value="56470.00"
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  renderText={(value) => (
                    <p className="text-[40px] tracking-wide font-extrabold">
                      {value}{" "}
                      <span className="text-[#718096] text-[20px]">NGN</span>{" "}
                    </p>
                  )}
                />
              </h2>
              <p className="text-[16px] text-[#718096] font-bold">NGN</p>
            </div>

            {/* <div className="mx-auto text-center justify-center items-center mt-4">
                <img src="./nodata.gif" className="mx-auto mt-6 " alt="" />
                <h3 className="text-[30px] leading-[35px]  text-[#1A202C] font-extrabold">
                  No Income Data
                </h3>
              </div> */}
          </div>
        </div>
        <div class="bg-white border border-[#EDF2F7] rounded-[16px] pl-[24px] pt-[29px] pb-[24px] pr-[20px] mb-9 ">
          <div className="flex flex-row justify-between items-center mb-[24px] ">
            <h3 className="text-[18px] font-bold text-[#1a202c]">Overview</h3>
            <div className="flex flex-row items-center gap-[25px]">
              <div className="flex flex-row items-center gap-[8px]">
                <div className="h-[4px] w-[12px] bg-[#4ade80] rounded-[50px]"></div>
                <p className="text-[12px] ">Income</p>
              </div>
              <div className="flex flex-row items-center gap-[8px]">
                <div className="h-[4px] w-[12px] bg-[#124072] rounded-[50px]"></div>
                <p className="text-[12px] ">Expenses</p>
              </div>
              <select
                className="flex flex-row py-[8px] px-[9px] w-[110px] bg-[#fafafa] rounded-[8px] gap-[4px] "
                value={range}
                onChange={(e) => setRange(e.target.value)}
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </div>
          {/* {ChartDataQuery.data ? (
            <Line data={ChartDataQuery.data.chartData} options={options}></Line>
          ) : (
            <div className="mx-auto text-center justify-center items-center mt-4">
              <img src="./nodata.gif" className="mx-auto mt-6 " alt="" />
              <h3 className="text-[30px] leading-[35px]  text-[#1A202C] font-extrabold">
                No Data
              </h3>
            </div>
          )} */}
        </div>
        {/* Recent Transaction*/}
        <div className="border  border-[#edf2f7] pt-[25px] px-[20px] pb-[20px] rounded-[16px] mt-[24px]">
          <div className="flex flex-row justify-between">
            <h3 className="text-[#1a202c] text-[18px] font-bold ">
              Recent Transaction
            </h3>
            <button
              onClick={() => navigate("/billerManagement")}
              className="flex flex-row items-center bg-[#fafafa] py-[8px] px-[12px] gap-[4px]"
            >
              View all
              <img src="./forward.png" alt="" />
            </button>
          </div>

          <div className="flex  flex-row border-b-[#edf2f7] items-center border-b gap-[9px] justify-between py-[14px] mt-[16px]">
            <h3 className="max-w-[170px] w-[170px] text-[#1a202c] text-[14px] font-bold">
              Receiver
            </h3>
            <p className="max-w-[80px] w-[80px] text-[#718096] text-[14px] ">
              Type
            </p>
            <p className="text-[14px] text-[#1a202c] max-w-[90px] w-[90px] font-semibold">
              amount
            </p>
          </div>

          <div className="flex  flex-row border-b-[#edf2f7] items-center border-b gap-[9px] justify-between py-[14px] mt-[16px]">
            {/* <img src={biller.src} alt="" className="h-[40px]" /> */}
            <svg
              class=""
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99984 18.8334C14.6022 18.8334 18.3332 15.1025 18.3332 10.5001C18.3332 5.89771 14.6022 2.16675 9.99984 2.16675C5.39746 2.16675 1.6665 5.89771 1.6665 10.5001C1.6665 15.1025 5.39746 18.8334 9.99984 18.8334Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.66667 3H7.5C5.875 7.86667 5.875 13.1333 7.5 18H6.66667"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.5 3C14.125 7.86667 14.125 13.1333 12.5 18"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.5 13.8333V13C7.36667 14.625 12.6333 14.625 17.5 13V13.8333"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.5 8C7.36667 6.375 12.6333 6.375 17.5 8"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <h3 className="max-w-[170px] w-[170px] text-[#1a202c] text-[14px] font-bold">
              {/* {biller.name} */}
            </h3>
            <p className="max-w-[80px] w-[80px] text-[#718096] text-[14px] ">
              {/* {biller.billerType} */}
            </p>
            <p className="text-[14px] text-[#1a202c] max-w-[90px] w-[90px] font-semibold">
              {/* <NumericFormat
                    value={biller.sellRate}
                    displayType={"text"}
                    thousandSeparator={true}
                    // prefix={"₦"}
                    decimalScale={0}
                    fixedDecimalScale={true}
                    renderText={(value) => <p>{value}%</p>}
                  /> */}
            </p>
          </div>

          {/* <div className="mx-auto text-center justify-center items-center mt-4">
              <img src="./nodata.gif" className="mx-auto mt-6 " alt="" />
              <h3 className="text-[30px] leading-[35px]  text-[#1A202C] font-extrabold">
                No Data
              </h3>
            </div> */}
        </div>
      </div>
      {/* transactions */}

      <div class="bg-white  mb-10 lg:w-[35%] lg:mt-0 mt-10  ">
        <div className="px-[15px] py-[16px] rounded-[12px] mb-1 flex flex-row justify-between  bg-[#F0EDED] shadow-md ">
          <div>
            <h3 className="text-black font-bold tracking-wide">
              Account low on funds
            </h3>
            <p className="text-black font-extrabold">
              10 <span className="text-[#7c828a] font-medium"> of total</span>{" "}
              365
            </p>
          </div>

          <div className="h-[52] w-[52px]">
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              strokeWidth="20"
              styles={buildStyles({
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",
                // Text size
                textSize: "16px",
                pathTransitionDuration: 0.5,
                // Colors
                pathColor: "#012f96",
                textColor: "#000000",
                trailColor: "#d9d9d9",
              })}
            />
          </div>
        </div>
        <div className="flex flex-row justify-end mb-[55px]">
          <button className="flex flex-row justify-between rounded-lg items-center bg-[#012f96] shadow-md px-[10px]  text-[12px] text-[white] ">
            <svg
              width="60"
              height="57"
              viewBox="0 0 60 57"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_1304_362)">
                <path
                  d="M30.9165 27H29.0832V22H30.9165V27ZM30.9165 31H29.0832V29H30.9165V31ZM19.9165 34H40.0832L29.9998 15L19.9165 34Z"
                  fill="#FAB606"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_1304_362"
                  x="0.916504"
                  y="0"
                  width="58.1665"
                  height="57"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="9.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.980333 0 0 0 0 1 0 0 0 0 0.0166667 0 0 0 0.2 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_1304_362"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_1304_362"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>

            <p>Send Alert</p>
          </button>
        </div>
        <div className="px-[15px] py-[16px] rounded-[12px] mb-[30px] flex flex-row justify-between  bg-[#F0EDED] shadow-md ">
          <div>
            <h3 className="text-black font-bold tracking-wide">
              Accounts without card
            </h3>
            <p className="text-black font-extrabold">
              22 <span className="text-[#7c828a] font-medium"> of total</span>{" "}
              365
            </p>
          </div>

          <div className="h-[52] w-[52px]">
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              strokeWidth="20"
              styles={buildStyles({
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",
                // Text size
                textSize: "16px",
                pathTransitionDuration: 0.5,
                // Colors
                pathColor: "#012f96",
                textColor: "#000000",
                trailColor: "#d9d9d9",
              })}
            />
          </div>
        </div>
        <div className="py-4 mb-5">
          <h3 className="font-bold tracking-wider text-[black] text-center mb-4 ">
            Transaction volume this week
          </h3>
          <img src="/histogram.png" alt="histogram chart" />
        </div>

        <div className="py-4">
          <h3 className="font-bold tracking-wider text-[#514f4f] text-center mb-3 ">
            Number of Transactions
          </h3>

          <p className="font-bold tracking-wider text-[black] text-center mb-3 ">
            124
          </p>
          <img src="/line-chart.png" alt="histogram chart" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
