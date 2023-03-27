import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import AccesDenied from "./pages/AccessDenied";
import PageNotFound from "./pages/PageNotFound";
import Logout from "./components/Log/Logout";
import UserHandleSupplies from "./pages/UserSupplies";
import UserSharingRequests from "./pages/UserSharingRequests";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route
            path="/handle-user-supplies"
            element={<UserHandleSupplies />}
          />
          <Route
            path="/handle-sharing-requests"
            element={<UserSharingRequests />}
          />
          <Route path="/access-denied" element={<AccesDenied />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
