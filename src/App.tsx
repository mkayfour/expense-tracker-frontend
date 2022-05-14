import React, { useEffect } from "react";

import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setLoggedInUser } from "./auth/core/services/login";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import Routes from "./app/core/routing/Routes";
import { getCurrentSessionTokens } from "./auth/core/services/session";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.interceptors.request.use((req) => {
  return req;
});

axios.interceptors.request.use((request) => {
  // add auth header with jwt if account is logged in and request is to the api url
  const { accessToken } = getCurrentSessionTokens();

  if (accessToken) {
    request.headers = {
      "x-access-token": `${accessToken}`,
    };
  }

  return request;
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setLoggedInUser(dispatch);
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <BrowserRouter forceRefresh={true}>
        <Routes />
      </BrowserRouter>
    </>
  );
};

export default App;
