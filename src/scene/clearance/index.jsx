import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Moment from "moment";
import { NumericFormat } from "react-number-format";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import { enqueueSnackbar } from "notistack";
import { Chart as ChartJS } from "chart.js/auto";

const Clearance = () => {
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

  return (
    <div class=" px-10 pt-6">
      <div className="px-[16px] md:px-[40px] py-[20px] ">
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-2 md:gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    FullName
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="business-name"
                      id="business-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Personal File Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="business-name"
                      id="business-name"
                      autoComplete="given-name"
                      // defaultValue={businessInfo.email}

                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date of Birth
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="business-name"
                      id="business-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Grade Information
              </h2>

              
              <div className="mt-10 grid grid-cols-1 gap-x-2 md:gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className=" col-span-6 md:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Current Substantive Rank/Designation
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="business-name"
                      id="business-name"
                      autoComplete="given-name"
                      // value={businessInfo.businessName}
                      // onChange={(e) =>
                      //   setBusinessInfo({
                      //     ...businessInfo,
                      //     businessName: e.target.value,
                      //   })
                      // }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className=" col-span-6 md:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Grade Level
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="address"
                      // value={businessInfo.businessAddress}
                      // onChange={(e) =>
                      //   setBusinessInfo({
                      //     ...businessInfo,
                      //     businessAddress: e.target.value,
                      //   })
                      // }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className=" col-span-6 md:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Step
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      // value={businessInfo.industryType}
                      // onChange={(e) =>
                      //   setBusinessInfo({
                      //     ...businessInfo,
                      //     industryType: e.target.value,
                      //   })
                      // }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className=" col-span-6 md:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Department and Faculty
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      // value={businessInfo.industryType}
                      // onChange={(e) =>
                      //   setBusinessInfo({
                      //     ...businessInfo,
                      //     industryType: e.target.value,
                      //   })
                      // }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className=" col-span-6 md:col-span-2">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date of Present Substantive Post
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
                      // value={businessInfo.bvn}
                      // onChange={(e) =>
                      //   setBusinessInfo({
                      //     ...businessInfo,
                      //     bvn: e.target.value,
                      //   })
                      // }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <p className="font-bold col-span-6 mt-7 mb-4">
                  Date, Designation and Grade Level of 1st Appointment
                </p>

                <div className=" col-span-6 md:col-span-2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="Date"
                      id="date"
                      autoComplete="address-level2"
                      // value={businessInfo.city}
                      // onChange={(e) =>
                      //   setBusinessInfo({
                      //     ...businessInfo,
                      //     city: e.target.value,
                      //   })
                      // }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className=" col-span-6 md:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Designation
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                      // value={businessInfo.state}
                      // onChange={(e) =>
                      //   setBusinessInfo({
                      //     ...businessInfo,
                      //     state: e.target.value,
                      //   })
                      // }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className=" col-span-6 md:col-span-1">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Grade Level{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      // value={businessInfo.postcodeZip}
                      // onChange={(e) =>
                      //   setBusinessInfo({
                      //     ...businessInfo,
                      //     postcodeZip: e.target.value,
                      //   })
                      // }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className=" col-span-6 md:col-span-1">
                  <label
                    htmlFor="step"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Step{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="step"
                      id="step"
                      autoComplete="step"
                      // value={businessInfo.postcodeZip}
                      // onChange={(e) =>
                      //   setBusinessInfo({
                      //     ...businessInfo,
                      //     postcodeZip: e.target.value,
                      //   })
                      // }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <p className="font-bold col-span-6">
                  Other Imformation <span className="text-[red] text-[10px]">required</span>
                </p>


                <div className=" col-span-6 md:col-span-3">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name of Pension Fund Administrator
                  </label>
                  <div className="mt-4">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                      // value={businessInfo.state}
                      // onChange={(e) =>
                      //   setBusinessInfo({
                      //     ...businessInfo,
                      //     state: e.target.value,
                      //   })
                      // }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className=" col-span-6 md:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Effective date of Exit from the College
                  </label>
                  <div className="mt-4">
                    <input
                      type="date"
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                      // value={businessInfo.state}
                      // onChange={(e) =>
                      //   setBusinessInfo({
                      //     ...businessInfo,
                      //     state: e.target.value,
                      //   })
                      // }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>



                <div className=" col-span-6">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Residential Address
                  </label>
                  <div className="mt-2">
                    <textarea
                      type="text"
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                      // value={businessInfo.state}
                      // onChange={(e) =>
                      //   setBusinessInfo({
                      //     ...businessInfo,
                      //     state: e.target.value,
                      //   })
                      // }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Contact Address after exit from the college
                  </label>
                  <div className="mt-2">
                    <textarea
                      type="text"
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                      // value={businessInfo.state}
                      // onChange={(e) =>
                      //   setBusinessInfo({
                      //     ...businessInfo,
                      //     state: e.target.value,
                      //   })
                      // }
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Gender
                  </legend>

                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-everything"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Male
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-email"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div> */}
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              // onClick={createProfile}
              className="py-4 items-center rounded-md w-full bg-[#17082d] text-[white] text-[16px] leading-[24px] tracking-[0.2px] font-extrabold flex justify-center "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Clearance;
