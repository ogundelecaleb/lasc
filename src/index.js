import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import posthog from 'posthog-js'; // for cookies consent


// posthog.init('phc_rj1UhvtOexOSfP03HQIdxosvZS0NTvXctQXWG9VBsIs', { api_host: 'https://app.posthog.com' })
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
