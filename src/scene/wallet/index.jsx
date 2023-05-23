import React from "react";
import { NumericFormat } from "react-number-format";

const Wallet = () => {
  return (
    <div className="flex flex-row gap-[32px] px-[40px]">
      <div className="flex flex-col gap-y-7 w-[40%]">
        <div className="p-[24px] border border-[#edf2f7] shadow bg-[white] rounded-lg ">
          <div className="flex flex-row justify-between mb-3">
            <p className="text-[#718096] tracking-wide">
              Total Portfolio Balance
            </p>

            <svg
              className="cursor-pointer"
              width="4"
              height="16"
              viewBox="0 0 4 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.00008 8.83366C2.46032 8.83366 2.83341 8.46056 2.83341 8.00033C2.83341 7.54009 2.46032 7.16699 2.00008 7.16699C1.53984 7.16699 1.16675 7.54009 1.16675 8.00033C1.16675 8.46056 1.53984 8.83366 2.00008 8.83366Z"
                stroke="#A0AEC0"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.00008 14.6667C2.46032 14.6667 2.83341 14.2936 2.83341 13.8333C2.83341 13.3731 2.46032 13 2.00008 13C1.53984 13 1.16675 13.3731 1.16675 13.8333C1.16675 14.2936 1.53984 14.6667 2.00008 14.6667Z"
                stroke="#A0AEC0"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.00008 3.00016C2.46032 3.00016 2.83341 2.62707 2.83341 2.16683C2.83341 1.70659 2.46032 1.3335 2.00008 1.3335C1.53984 1.3335 1.16675 1.70659 1.16675 2.16683C1.16675 2.62707 1.53984 3.00016 2.00008 3.00016Z"
                stroke="#A0AEC0"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <NumericFormat
            value="56470.00"
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₦"}
            decimalScale={2}
            fixedDecimalScale={true}
            renderText={(value) => (
              <p className="text-[40px] tracking-wide font-extrabold">
                {value} <span className="text-[#718096] text-[20px]">NGN</span>{" "}
              </p>
            )}
          />
        </div>
        <div className="mt-7 bg-gradient-to-b from-[#2a2fccf1] to-[#4c49e6] rounded-[24px]">
          <div className="bg-atm-blub bg-no-repeat bg-right-bottom px-[18px] py-[22px] text-[white]">
            <h3>Paylode</h3>
            <p className="mb-5 text-[8px] text-[white]/80">PREMIUM ACCOUNT</p>
            <h2
              className="atm-font text-[22px] text-[white] tracking-wider  "
              style={{ fontFamily: "ocr-a-std-regular" }}
            >
              {" "}
              5789 <span>&nbsp;</span> **** <span>&nbsp;</span> ****{" "}
              <span> </span> 2847{" "}
            </h2>
            <p className="mb-5 text-[7px]"> Card Number</p>

            <div className="flex flex-row gap-[40px] ">
              <p className="self-end text-[12px]">Shola David</p>
              <div>
                <p className="text-[7px]">Expiry date</p>
                <p className="text-[12px]">06/21</p>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-[20px] mb-4 font-bold">Card Lists </h3>

        <div className="bg-[white]  px-[18px] py-[22px] text-[white]  border-[#edf2f7]  shadow rounded-[24px]">
          <div className="flex mb-9 flex-row justify-between">
            <img src="/chip.png" alt="" />
            <h3 className="text-[black]">Paylode</h3>
          </div>
          <h2
            className="atm-font mb-7 text-[22px] text-[#5d6a83] tracking-wider  "
            style={{ fontFamily: "ocr-a-std-regular" }}
          >
            {" "}
            5789 <span>&nbsp;</span> **** <span>&nbsp;</span> ****{" "}
            <span> </span> 2847{" "}
          </h2>

          <div className="flex flex-row justify-end gap-[40px] ">
            <svg
              width="60"
              height="19"
              viewBox="0 0 60 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M43.6731 1.28745C42.286 0.791812 40.8197 0.543098 39.3434 0.55302C34.5691 0.55302 31.1973 2.9114 31.1734 6.29681C31.1436 8.78394 33.5695 10.1855 35.4046 11.0165C37.2875 11.8709 37.9171 12.4093 37.9111 13.173C37.8992 14.3346 36.4072 14.8613 35.0197 14.8613C33.113 14.8613 32.0716 14.6009 30.4692 13.9484L29.8754 13.6763L29.198 17.5737C30.3588 18.0477 32.4505 18.4545 34.6109 18.4896C39.6866 18.4896 43.0047 16.1458 43.0435 12.5439C43.0853 10.5571 41.7724 9.05606 39.0092 7.81542C37.3293 7.01076 36.2879 6.47238 36.2879 5.65601C36.2879 4.93328 37.1801 4.16081 39.045 4.16081C40.2862 4.13137 41.5197 4.35972 42.6646 4.83087L43.1121 5.02692L43.7895 1.26112L43.6731 1.28745ZM56.0624 0.869031H52.3325C51.1718 0.869031 50.2975 1.18212 49.7902 2.31156L42.6168 18.2467H47.6925L48.707 15.6338L54.9017 15.6396C55.0479 16.2512 55.4955 18.2467 55.4955 18.2467H59.9714L56.0624 0.869031ZM24.3074 0.722728H29.1443L26.1186 18.1092H21.2876L24.3074 0.716877V0.722728ZM12.0285 10.3055L12.5298 12.7194L17.2563 0.869031H22.3797L14.7677 18.2233H9.65624L5.47873 3.52879C5.41107 3.28649 5.25217 3.07839 5.03412 2.94651C3.52843 2.1838 1.93305 1.60501 0.283691 1.22308L0.349338 0.857324H8.13443C9.19074 0.898289 10.0412 1.22308 10.3246 2.32912L12.0255 10.3143V10.3055H12.0285ZM50.0946 12.0786L52.0222 7.21559C51.9983 7.26826 52.419 6.21196 52.6637 5.55945L52.9949 7.06051L54.1139 12.0757H50.0916V12.0786H50.0946Z"
                fill="#1A202C"
              />
            </svg>
          </div>
        </div>
        <button className="border font-bold mt-3 py-2 border-[#124072] rounded-[12px] text-[#124072]">
          Manage Card
        </button>
      </div>
      <div className="flex flex-col w-[60%]">
        <div className="bg-[white]  px-[18px] py-[22px]   border-[#edf2f7]  shadow rounded-[24px]">
          <div className="flex flex-row items-center justify-between">
            <p>Quick Link</p>
            <svg
              className="cursor-pointer"
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="#A0AEC0"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="grid lg:grid-cols-4 gap-[16px] ">
            <div className="py-[13px] px-[15px] text-center border-[#edf2f7] shadow rounded-xl cursor-pointer">
              <svg
                className="mx-auto"
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.125" width="40" height="40" rx="20" fill="#F2F6FF" />
                <path
                  d="M20.675 12.0983L20.65 12.1566L18.2333 17.7649H15.8583C15.2916 17.7649 14.75 17.8816 14.2583 18.09L15.7166 14.6066L15.75 14.5233L15.8083 14.39C15.825 14.34 15.8416 14.29 15.8666 14.2483C16.9583 11.7233 18.1916 11.1483 20.675 12.0983Z"
                  stroke="#124072"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M25.1667 17.932C24.7917 17.8153 24.3917 17.7653 23.9917 17.7653H18.2334L20.6501 12.157L20.6751 12.0986C20.8001 12.1403 20.9167 12.1986 21.0417 12.2486L22.8834 13.0236C23.9084 13.4486 24.6251 13.8903 25.0584 14.4236C25.1417 14.5236 25.2084 14.6153 25.2667 14.7236C25.3417 14.8403 25.4001 14.957 25.4334 15.082C25.4667 15.157 25.4917 15.232 25.5084 15.2986C25.7334 15.9986 25.6001 16.857 25.1667 17.932Z"
                  stroke="#124072"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M28.0598 21.8318V23.4568C28.0598 23.6235 28.0515 23.7901 28.0432 23.9568C27.8848 26.8651 26.2598 28.3318 23.1765 28.3318H16.6765C16.4765 28.3318 16.2765 28.3151 16.0848 28.2901C13.4348 28.1151 12.0182 26.6985 11.8432 24.0485C11.8182 23.8568 11.8015 23.6568 11.8015 23.4568V21.8318C11.8015 20.1568 12.8182 18.7151 14.2682 18.0901C14.7682 17.8818 15.3015 17.7651 15.8682 17.7651H24.0015C24.4098 17.7651 24.8098 17.8235 25.1765 17.9318C26.8348 18.4401 28.0598 19.9901 28.0598 21.8318Z"
                  stroke="#124072"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.7167 14.6069L14.2584 18.0903C12.8084 18.7153 11.7917 20.1569 11.7917 21.8319V19.3903C11.7917 17.0236 13.4751 15.0486 15.7167 14.6069Z"
                  stroke="#124072"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M28.0572 19.3899V21.8315C28.0572 19.9982 26.8405 18.4399 25.1738 17.9399C25.6072 16.8565 25.7322 16.0065 25.5238 15.2982C25.5072 15.2232 25.4822 15.1482 25.4488 15.0815C26.9988 15.8815 28.0572 17.5232 28.0572 19.3899Z"
                  stroke="#124072"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p className="text-[12px] text-[#1a202c]">Add Money</p>
            </div>

            <div className="py-[13px] px-[15px] text-center border-[#edf2f7] shadow rounded-xl cursor-pointer">
              <svg
                className="mx-auto"
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.375" width="40" height="40" rx="20" fill="#F2F6FF" />
                <path
                  d="M12.0417 17.0835H22.4584"
                  stroke="#124072"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.375 23.75H17.0417"
                  stroke="#124072"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.125 23.75H22.4583"
                  stroke="#124072"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M28.7084 21.6915V23.4248C28.7084 26.3498 27.9667 27.0832 25.0084 27.0832H15.7417C12.7834 27.0832 12.0417 26.3498 12.0417 23.4248V16.5748C12.0417 13.6498 12.7834 12.9165 15.7417 12.9165H22.4584"
                  stroke="#124072"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M27.0417 17.9165V12.9165L28.7084 14.5832"
                  stroke="#124072"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M27.0417 12.9165L25.375 14.5832"
                  stroke="#124072"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p className="text-[12px] text-[#1a202c]">Transfer</p>
            </div>

            <div className="py-[13px] px-[15px] text-center border-[#edf2f7] shadow rounded-xl cursor-pointer">
              <svg
                className="mx-auto"
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.625" width="40" height="40" rx="20" fill="#F2F6FF" />
                <path
                  d="M16.2334 26.4165C16.9167 25.6832 17.9584 25.7415 18.5584 26.5415L19.4001 27.6665C20.0751 28.5582 21.1667 28.5582 21.8417 27.6665L22.6834 26.5415C23.2834 25.7415 24.3251 25.6832 25.0084 26.4165C26.4917 27.9998 27.7001 27.4748 27.7001 25.2582V15.8665C27.7084 12.5082 26.9251 11.6665 23.7751 11.6665H17.4751C14.3251 11.6665 13.5417 12.5082 13.5417 15.8665V25.2498C13.5417 27.4748 14.7584 27.9915 16.2334 26.4165Z"
                  stroke="#124072"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.2917 15.8335H23.9584"
                  stroke="#124072"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.125 19.1665H23.125"
                  stroke="#124072"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p className="text-[12px] text-[#1a202c]">Buy Airtimme</p>
            </div>

            <div className="py-[13px] px-[15px] text-center border-[#edf2f7] shadow rounded-xl cursor-pointer">
              <svg
                className="mx-auto"
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.875" width="40" height="40" rx="20" fill="#F2F6FF" />
                <path
                  d="M29.2083 17.8915V14.5248C29.2083 13.1998 28.675 12.6665 27.35 12.6665H23.9833C22.6583 12.6665 22.125 13.1998 22.125 14.5248V17.8915C22.125 19.2165 22.6583 19.7498 23.9833 19.7498H27.35C28.675 19.7498 29.2083 19.2165 29.2083 17.8915Z"
                  stroke="#124072"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.6251 18.0998V14.3165C19.6251 13.1415 19.0917 12.6665 17.7667 12.6665H14.4001C13.0751 12.6665 12.5417 13.1415 12.5417 14.3165V18.0915C12.5417 19.2748 13.0751 19.7415 14.4001 19.7415H17.7667C19.0917 19.7498 19.6251 19.2748 19.6251 18.0998Z"
                  stroke="#124072"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.6251 27.475V24.1083C19.6251 22.7833 19.0917 22.25 17.7667 22.25H14.4001C13.0751 22.25 12.5417 22.7833 12.5417 24.1083V27.475C12.5417 28.8 13.0751 29.3333 14.4001 29.3333H17.7667C19.0917 29.3333 19.6251 28.8 19.6251 27.475Z"
                  stroke="#124072"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22.9583 25.5835H27.9583"
                  stroke="#1A202C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M25.4583 28.0835V23.0835"
                  stroke="#1A202C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>

              <p className="text-[12px] text-[#1a202c]">Electricity Bill</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 w-full mt-5">
          <div className=" px-4 py-2  border-r border-[#edf2f7] flex flex-row justify-between  gap-4 items-center">
            <p>Last 30 days</p>
            <svg
              className="cursor-pointer"
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="#A0AEC0"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className=" px-4 py-2  border-r border-[#edf2f7] ">
            <p>Transactions</p>
            <p>56</p>
          </div>
          <div className=" px-4 py-2  border-r border-[#edf2f7] ">
            <p>Total Spent</p>
            <NumericFormat
              value="10654.00"
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
              decimalScale={2}
              fixedDecimalScale={true}
              renderText={(value) => <p className="">{value} </p>}
            />
          </div>
          <div className=" px-4 py-2  ">
            <p>Total Received</p>
            <NumericFormat
              value="2456.00"
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
              decimalScale={2}
              fixedDecimalScale={true}
              renderText={(value) => <p className="">{value} </p>}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
