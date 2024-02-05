import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Moment from "moment";
import { NumericFormat } from "react-number-format";
import { Doughnut, Line, Bar } from "react-chartjs-2";
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
    <div class=" px-10 pt-6">
      <div className="flex gap-[24px] md:gap-[36px] lg:gap-[48px] mb-7">
        <div className="py-[36px] md:py-[42px] lg:py-[48px]  px-[20px] md:px-[24px] border border-grey rounded-[15px] shadow-md min-w-[200px]">
          <div className="bg-[#EBEAEDE5] h-[60px] w-[60px] flex justify-center items-center rounded-full">
            <svg
              width="49"
              height="49"
              viewBox="0 0 49 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.4516 2.54919C24.4047 2.54919 24.3391 2.54919 24.2829 2.56044C23.8516 2.64013 23.336 3.03857 22.9985 3.94888C22.6422 4.85826 22.5672 6.15482 22.8766 7.54326C23.1954 8.91482 23.8516 10.097 24.5829 10.8189C25.2954 11.5408 25.9422 11.7376 26.3735 11.6626C26.8235 11.597 27.3204 11.1845 27.6579 10.2845C28.0141 9.38076 28.1079 8.06638 27.7891 6.68919C27.461 5.30169 26.8141 4.13076 26.0829 3.41357C25.4641 2.77607 24.8922 2.54919 24.4516 2.54919ZM35.2704 14.6908C34.2391 14.7189 32.936 14.9908 31.6704 15.5251C30.2079 16.1626 29.0829 17.0158 28.4641 17.822C27.8454 18.6001 27.7891 19.1908 27.986 19.5376C28.1922 19.8845 28.7641 20.2126 29.861 20.2595C30.9579 20.3251 32.4391 20.0533 33.8923 19.4345C35.3454 18.8064 36.4891 17.9439 37.1079 17.1564C37.7266 16.3783 37.7735 15.7689 37.5766 15.422C37.3797 15.0658 36.7985 14.7564 35.7016 14.7189C35.5516 14.6908 35.4204 14.6908 35.2704 14.6908ZM22.4923 23.4001C21.8735 23.4095 21.311 23.4845 20.8048 23.6158C19.6985 23.897 19.061 24.4033 18.8547 25.0126C18.6204 25.622 18.8547 26.3533 19.586 27.1408C20.3547 27.9095 21.6204 28.6501 23.1954 29.0626C24.761 29.4751 26.2704 29.4658 27.3954 29.1658C28.5297 28.8751 29.1672 28.3595 29.3735 27.7595C29.5891 27.1501 29.3735 26.4283 28.6141 25.6314C27.8735 24.8626 26.6079 24.122 25.0329 23.7189C24.1423 23.4845 23.2704 23.3908 22.4923 23.4001ZM37.5579 28.847L31.7641 31.5939C32.1579 31.6126 33.1423 31.6408 33.1423 31.6408L33.761 32.4564L38.8891 29.7845L37.5579 28.847ZM32.4485 28.8564L27.0672 31.4064C27.5829 31.4345 28.8016 31.4533 29.2891 31.4814L33.9579 29.2689L32.4485 28.8564ZM41.1297 29.8689L34.5204 33.3751L35.8797 35.1283L42.8641 30.947L41.1297 29.8689ZM14.9922 30.722C14.7084 30.7215 14.4253 30.7529 14.1485 30.8158C7.44537 32.3626 3.48912 32.4939 2.31725 32.4939H1.95162V42.572C1.95162 42.572 3.03912 42.4126 4.8485 42.4033C8.34537 42.4033 14.5047 43.0033 20.5047 46.5095C20.8235 46.7064 21.5079 46.7814 22.361 46.7814C24.6391 46.7814 28.0985 46.2376 28.8954 45.9376C36.9204 42.9283 46.5766 34.6689 46.5766 34.6689L43.5297 32.0064C43.5297 32.0064 36.0485 36.7783 35.1016 37.2376C26.561 41.4283 19.6422 38.8126 19.6422 38.8126C19.6422 38.8126 30.8829 39.0939 34.4923 36.2533L32.3735 33.0658C32.3735 33.0658 24.611 32.8501 21.8454 32.4845C20.4016 32.297 17.2797 30.722 14.9922 30.722Z"
                fill="#124072"
              />
            </svg>
          </div>

          <NumericFormat
            value={10000}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₦"}
            decimalScale={0}
            fixedDecimalScale={true}
            renderText={(value) => (
              <p className="text-[#1a202c] text-[18px] md:text-[20px] lg:text-[22px] font-bold">
                {value}
              </p>
            )}
          />

          <p className="text-base md:text-lg text-grey">Money Earned</p>
        </div>
        <div className="py-[36px] md:py-[42px] lg:py-[48px]  px-[20px] md:px-[24px] border border-grey rounded-[15px] shadow-md min-w-[200px]">
          <div className="bg-[#EBEAEDE5] h-[60px] w-[60px] flex justify-center items-center rounded-full">
            <svg
              width="42"
              height="33"
              viewBox="0 0 42 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_17_454)">
                <path
                  d="M23.2031 4.6405C23.2031 3.95674 22.9315 3.30099 22.448 2.81749C21.9645 2.334 21.3088 2.06238 20.625 2.06238C19.9412 2.06238 19.2855 2.334 18.802 2.81749C18.3185 3.30099 18.0469 3.95674 18.0469 4.6405C18.0469 5.32426 18.3185 5.98002 18.802 6.46351C19.2855 6.947 19.9412 7.21863 20.625 7.21863C21.3088 7.21863 21.9645 6.947 22.448 6.46351C22.9315 5.98002 23.2031 5.32426 23.2031 4.6405ZM9.28125 13.4061C9.96501 13.4061 10.6208 13.1345 11.1043 12.651C11.5878 12.1675 11.8594 11.5118 11.8594 10.828C11.8594 10.1442 11.5878 9.48849 11.1043 9.00499C10.6208 8.5215 9.96501 8.24988 9.28125 8.24988C8.59749 8.24988 7.94173 8.5215 7.45824 9.00499C6.97475 9.48849 6.70312 10.1442 6.70312 10.828C6.70312 11.5118 6.97475 12.1675 7.45824 12.651C7.94173 13.1345 8.59749 13.4061 9.28125 13.4061ZM2.0625 26.8124C0.92168 26.8124 0 27.7341 0 28.8749C0 30.0157 0.92168 30.9374 2.0625 30.9374H39.1875C40.3283 30.9374 41.25 30.0157 41.25 28.8749C41.25 27.7341 40.3283 26.8124 39.1875 26.8124H2.0625ZM31.9688 13.4061C32.6525 13.4061 33.3083 13.1345 33.7918 12.651C34.2753 12.1675 34.5469 11.5118 34.5469 10.828C34.5469 10.1442 34.2753 9.48849 33.7918 9.00499C33.3083 8.5215 32.6525 8.24988 31.9688 8.24988C31.285 8.24988 30.6292 8.5215 30.1457 9.00499C29.6622 9.48849 29.3906 10.1442 29.3906 10.828C29.3906 11.5118 29.6622 12.1675 30.1457 12.651C30.6292 13.1345 31.285 13.4061 31.9688 13.4061ZM12.8906 20.2059L14.6244 23.4221C15.0305 24.1762 15.965 24.4534 16.7191 24.0538C17.4732 23.6542 17.7504 22.7132 17.3508 21.9591L15.0111 17.6085C15.1207 17.4989 15.2174 17.3764 15.2883 17.2346L17.0156 14.0184V17.5311C17.0156 18.6719 17.9373 19.5936 19.0781 19.5936H22.1719C23.3127 19.5936 24.2344 18.6719 24.2344 17.5311V14.0184L25.9682 17.2346C26.0455 17.3764 26.1357 17.4989 26.2453 17.6085L23.9057 21.9591C23.4996 22.7132 23.7832 23.6477 24.5373 24.0538C25.2914 24.4598 26.226 24.1762 26.632 23.4221L28.3594 20.2059V22.6874C28.3594 23.8282 29.2811 24.7499 30.4219 24.7499H33.5156C34.6564 24.7499 35.5781 23.8282 35.5781 22.6874V20.2059L37.3119 23.4221C37.718 24.1762 38.6525 24.4534 39.4066 24.0538C40.1607 23.6542 40.4379 22.7132 40.0383 21.9591L37.5955 17.428C36.6094 15.5911 34.6887 14.4438 32.6004 14.4438H31.3371C30.2865 14.4438 29.2811 14.7339 28.4109 15.2559L26.2453 11.2405C25.2592 9.40359 23.3385 8.25632 21.2502 8.25632H19.9934C17.9051 8.25632 15.9908 9.40359 14.9982 11.2405L12.8326 15.2559C11.9625 14.7339 10.957 14.4438 9.90645 14.4438H8.64961C6.56133 14.4438 4.64707 15.5911 3.65449 17.428L1.21816 21.9526C0.812109 22.7067 1.0957 23.6413 1.8498 24.0473C2.60391 24.4534 3.53848 24.1698 3.94453 23.4157L5.67188 20.2059V22.6874C5.67188 23.8282 6.59355 24.7499 7.73438 24.7499H10.8281C11.9689 24.7499 12.8906 23.8282 12.8906 22.6874V20.2059Z"
                  fill="#124072"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_454">
                  <rect width="41.25" height="33" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <p className="text-[#1a202c] text-[18px] md:text-[20px] lg:text-[22px] font-bold">
            10
          </p>
          <p className="text-base md:text-lg text-grey">Total Reffered</p>
        </div>
      </div>
      {/* transactions */}

      <div class="bg-white w-full border border-[#EDF2F7] rounded-[16px]  pl-[24px] pt-[32px] pb-[40px] pr-[24px] mb-10  lg:mt-0 mt-10  ">
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
              className="flex flex-row items-center py-[8px] pr-[19px] border-t border-[#EDF2F7] "
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
