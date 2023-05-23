// import { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./scene/dashboard";

import Transaction from "./scene/transaction";
import Merchant from "./scene/merchant";

import Login from "./login";
import ForgotPassword from "./forgotPassword";
import Otp from "./validateOtp";
import NewPass from "./newPass";
import "./App.css";
import Home from "./home";
import Bank from "./scene/bank";
import Wallet from "./scene/wallet";
import UserAdmin from "./scene/userAdmin";
import AccountDetails from "./scene/accountDetails";
import PersonalInfo from "./scene/personalInfo";
import BusinessProfile from "./scene/businessProfile";
import LoginSecurity from "./scene/loginSecurity";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomeIndex from "./scene/home";
import { Toaster } from "react-hot-toast";
import { SnackbarProvider } from "notistack";
import Currency from "./scene/currency";
import Country from "./scene/country";
import Channel from "./scene/channel";
import Name from "./scene/name";
import IsActive from "./scene/isActive";
import SignUp from "./signUp";
import RequestOtp from "./requestOtp";
import ValidateOtp from "./validateOtp";
import SettlementAccount from "./scene/settlementAccount";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
    },
  },
});
function App() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}

        // iconVariant={{
        //   success: '✅',
        //   error: '✖️',
        //   warning: '⚠️',
        //   info: 'ℹ️',
        // }}
        // autoHideDuration={7000}
      />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route element={<Home />}>
              <Route path="/" element={<HomeIndex />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/accountDetails" element={<AccountDetails />}>
                <Route index element={<PersonalInfo />} />
                <Route
                  path="/accountDetails/personalInfo"
                  element={<PersonalInfo />}
                />

                <Route
                  path="/accountDetails/loginSecurity"
                  element={<LoginSecurity />}
                />
                 <Route
                  path="/accountDetails/businessProfile"
                  element={<BusinessProfile />}
                />
                 <Route
                  path="/accountDetails/settlementAccount"
                  element={<SettlementAccount />}
                />
              </Route>
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/merchant" element={<Merchant />} />
              <Route path="/country" element={<Country />} />

              <Route path="/name" element={<Name />} />
              <Route path="/userAdmin" element={<UserAdmin />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/currency" element={<Currency />} />

              <Route path="/bank" element={<Bank />} />
              <Route path="/channel" element={<Channel />} />
              <Route path="/isActive" element={<IsActive />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/requestOtp" element={<RequestOtp />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/validateOtp" element={<ValidateOtp />} />
            <Route path="/newpass" element={<NewPass />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
