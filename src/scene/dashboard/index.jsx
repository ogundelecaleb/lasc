import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Moment from "moment";
import { NumericFormat } from "react-number-format";
import { Doughnut, Line } from "react-chartjs-2";
import { enqueueSnackbar } from "notistack";
import { Chart as ChartJS } from "chart.js/auto";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [range, setRange] = useState("Daily");
  const [defaultCurrency, setDefualtCurrency] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handlePinSubmit = (e) => {
    createTransactionAccess(e);
  };

  const currencyQuery = useQuery(["getCurrency"], () => getCurrency(), {
    keepPreviousData: true,
    refetchOnWindowFocus: "always",
  });

  async function getCurrency() {
    try {
      const response = await api.getCurrency();
      console.log("All Currency", response);
      // console.log(merchantData);
      return response;
    } catch (error) {
      return error;
    }
  }

  async function getMerchantProfile() {
    try {
      const response = await api.getMerchantProfile();
      console.log("merchant profile", response);
      
      return response;
    } catch (error) {
      return error;
    }
  }

  const getMerchantProfilenQuery = useQuery(
    ["getMerchantProfile"],
    () => getMerchantProfile(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  async function createTransactionAccess(e) {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await api.createTransactionAccess({
        defaultCurrency: defaultCurrency,
      });
      console.log("res of transactionAcess==>>>>>", response);
      enqueueSnackbar("Default Currency Created Successfully", {
        variant: "success",
      });
      setLoading(false);
      getMerchantProfilenQuery.refetch();
      // handleModalClose();
      // clearForm();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setLoading(false);
    }
  }

  async function getTransactions() {
    const response = await api.getTransaction({
      params: { PageIndex: currentPage },
    });
    console.log("transactions", response);
    return response;
  }

  async function getDashboardTransactions(range) {
    const response = await api.getDashboardTransactions({
      params: { Period: range },
    });

    let newArray = Object.entries(response.data.TransactionVolume).map(
      ([label, value]) => {
        return { date: label, amount: value };
      }
    );
    let countArray = Object.entries(response.data.TransactionCount).map(
      ([label, value]) => {
        return { date: label, amount: value };
      }
    );

    let pieChartArray = Object.entries(response.data.TransactionStatus).map(
      ([label, value]) => {
        return { status: label + " " + "(" + value + ")", amount: value };
      }
    );

    const chartData = {
      labels: newArray.map((data) => data.date),
      datasets: [
        {
          label: "Transaction Volume",
          data: newArray.map((data) => data.amount),
          backgroundColor: "#124072",
          borderColor: "#124072",
          borderWidth: 2,
          pointBorderColor: "transparent",
          pointBorderWidth: 2,
          pointRadius: 0,
        },
        {
          label: "Transaction Count",
          data: countArray.map((data) => data.amount),
          backgroundColor: "#4ADE80",
          borderColor: "#4ADE80",
          borderWidth: 2,
          pointBorderColor: "transparent",
          pointBorderWidth: 2,
          pointRadius: 0,
        },
      ],
    };

    const pieChartData = {
      labels: pieChartArray.map((data) => data.status),
      datasets: [
        {
          label: "Transaction Status",
          data: pieChartArray.map((data) => data.amount),
          // backgroundColor: "#124072",
          // borderColor: "#124072",
          // borderWidth: 2,
          // pointBorderColor: "transparent",
          // pointBorderWidth: 2,
          // pointRadius: 0,
          backgroundColor: ["#936DFF", "#FDE047", "#4ADE80", "#FF7171"],
          hoverOffset: 4,
        },
      ],
    };

    let newChartArray = { chartData, pieChartData };
    console.log("chart", newChartArray);
    return newChartArray;
  }

  const options = {
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          color: "transparent",
        },
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          color: "transparent",
        },
      },
    },
  };
  const TransactionQuery = useQuery(
    ["transactions", currentPage],
    () => getTransactions(currentPage),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  const ChartDataQuery = useQuery(
    ["chartData", range],
    () => getDashboardTransactions(range),
    {
      // keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  return (
    <div class="lg:flex mx-10 mt-6">
      <div class="lg:mr-[24px] lg:w-[65%]">
        <div class="flex justify-between  gap-[16px] mb-6">
          <div className="w-full">
            <div className="flex items-center mb-5">
              <h2 className="text-[16px] text-[#313841] font-bold ">
                Default Currency:
              </h2>{" "}
             <h2 className="font-extrabold text-sm text-[#313841]">{getMerchantProfilenQuery.data &&
                getMerchantProfilenQuery.data?.data?.currency?.currencyName}</h2> 
            </div>

            <h2 className="text-[10px] text-gray-800  mb-2">
              Set Default Currency
            </h2>
            <div className="flex items-center w-full gap-3">
              <select
                type="text"
                className="  min-w-[60%]  text-[9px]  px-2 py-[8px] placeholder:text-[#A0AEC0] placeholder:text-[5px] placeholder:font-normal font-medium text-[#1A202C] leading-[24px] tracking-[0.3px] bg-white border border-[#E2E8F0]  rounded-xl focus:outline-none focus:ring-[#FFDB47] focus:border-[#FFDB47] sm:text-sm"
                autofocus
                required
                value={defaultCurrency}
                onChange={(e) => setDefualtCurrency(e.target.value)}
              >
                <option value="">Currency </option>
                {currencyQuery.data &&
                  currencyQuery.data?.data?.results.map((currency) => (
                    <option key={currency.currencyCode} value={currency.currencyCode}>
                      {currency.currencyName}
                    </option>
                  ))}
              </select>

              <button
                onClick={handlePinSubmit}
                className="py-[7px] px-[12px]   lg:py-[11px] lg:px-[20px] bg-dark-blue text-[#fafafa] text-[12px] font-bold mr-3 rounded-lg"
              >
                Save{" "}
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

          <div class="bg-[white] border border-[#EDF2F7] rounded-[16px] pt-[16px] px-[20px] pb-[20px]  ">
            <div className="flex flex-row justify-between items-center pt-[16px] px-[20px] pb-1">
              <p className="text-[14px] text-[#718096]">Transactions</p>
              <img src="./transaction-outlined.png" alt="" />
            </div>
            <div className=" flex flex-row justify-center items-center  m-0 ">
              {ChartDataQuery.data && ChartDataQuery.data.pieChartData ? (
                <Doughnut
                  data={ChartDataQuery.data.pieChartData}
                  options={{
                    plugins: {
                      legend: {
                        position: "right",
                        labels: {
                          pointStyle: "circle",
                          usePointStyle: true,
                          // fullSize: false,
                          pointStyleWidth: 10,
                          font: {
                            size: 10,
                          },
                        },
                      },
                    },
                  }}
                ></Doughnut>
              ) : (
                <div className="mx-auto text-center justify-center items-center mt-4">
                  {/* <img src="./nodata.gif" className="mx-auto mt-6 " alt="" /> */}
                  <h3 className="text-[16px]  md:text-[20px]    lg:text-[30px] leading-[35px]  text-[#1A202C] font-extrabold">
                    No Transaction Data
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
        <div class="bg-white border border-[#EDF2F7] rounded-[16px] pl-[24px] pt-[29px] pb-[24px] pr-[20px] mb-9 ">
          <div className="flex flex-row justify-between items-center mb-[24px] ">
            <h3 className="text-[18px] font-bold text-[#1a202c]">
              Transactions Chart
            </h3>
            <div className="flex flex-row items-center gap-[25px]">
              <div className="flex flex-row items-center gap-[8px]">
                <div className="h-[4px] w-[12px] bg-[#4ade80] rounded-[50px]"></div>
                <p className="text-[12px] ">Volume</p>
              </div>
              <div className="flex flex-row items-center gap-[8px]">
                <div className="h-[4px] w-[12px] bg-[#124072] rounded-[50px]"></div>
                <p className="text-[12px] ">Count</p>
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
          {ChartDataQuery.data ? (
            <Line data={ChartDataQuery.data.chartData} options={options}></Line>
          ) : (
            <div className="mx-auto text-center justify-center items-center mt-4">
              <img src="./nodata.gif" className="mx-auto mt-6 " alt="" />
              <h3 className="text-[30px] leading-[35px]  text-[#1A202C] font-extrabold">
                No Data
              </h3>
            </div>
          )}
        </div>
        {/* Biller */}
      </div>
      {/* transactions */}

      <div class="bg-white border border-[#EDF2F7] rounded-[16px]  pl-[24px] pt-[32px] pb-[40px] pr-[24px] mb-10 lg:w-[35%] lg:mt-0 mt-10  ">
        <div class="flex justify-between items-center mb-6">
          <h4 class="text-[#1A202C] text-[18px] leading-[24px] tracking-[0.2px] font-extrabold ">
            Transactions
          </h4>
          <button
            onClick={() => navigate("/transaction")}
            className="flex flex-row items-center gap-4 bg-[#fafafa] py-[8px] px-[12px] rounded-[8px] "
          >
            <p className="text-[12px] text-[#1a202c] font-semibold">
              View all{" "}
            </p>
            <img src="./forward.png" alt="" />
          </button>
        </div>
        {TransactionQuery.data &&
        TransactionQuery.data.data &&
        TransactionQuery.data?.data?.results?.length > 0 ? (
          TransactionQuery.data?.data?.results?.map((transaction) => (
            <div
              key={transaction.id}
              className="flex flex-row items-center py-[8px] pr-[19px] "
            >
              <svg
                class="mr-[12px] h-[38px]"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 5.1333H18.3333"
                  stroke="#718096"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M11.85 2.16663H16.4833C17.9667 2.16663 18.3333 2.53329 18.3333 3.99996V7.42496C18.3333 8.89163 17.9667 9.25829 16.4833 9.25829H11.85C10.3667 9.25829 10 8.89163 10 7.42496V3.99996C10 2.53329 10.3667 2.16663 11.85 2.16663Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M1.6665 14.7167H9.99984"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M3.5165 11.75H8.14984C9.63317 11.75 9.99984 12.1167 9.99984 13.5833V17.0083C9.99984 18.475 9.63317 18.8417 8.14984 18.8417H3.5165C2.03317 18.8417 1.6665 18.475 1.6665 17.0083V13.5833C1.6665 12.1167 2.03317 11.75 3.5165 11.75Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M18.3333 13C18.3333 16.225 15.725 18.8333 12.5 18.8333L13.375 17.375"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M1.6665 7.99996C1.6665 4.77496 4.27484 2.16663 7.49984 2.16663L6.62485 3.62496"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>

              <div className="mr-[64px]">
                <h3 className="text-[14px] text-[#1a202c] font-bold">
                  {transaction.channel}
                </h3>
              </div>

              <div>
                <h3 className="text-[#1a202c] text-[14px] font-bold">
                  {/* {transaction.amount} */}
                  <NumericFormat
                    value={transaction.amount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                    decimalScale={0}
                    fixedDecimalScale={true}
                    renderText={(value) => (
                      <p className="text-[#1a202c] text-[14px] font-bold">
                        {value}
                      </p>
                    )}
                  />
                </h3>
                <p className="text-[12px] text-[#718096]">
                  {formatDate(transaction.createdDate) +
                    " at " +
                    formatTime(transaction.createdDate)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="mx-auto text-center justify-center items-center mt-4">
            <img src="./nodata.gif" className="mx-auto mt-6 " alt="" />
            <h3 className="text-[30px] leading-[35px]  text-[#1A202C] font-extrabold"> 
              No Data
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
