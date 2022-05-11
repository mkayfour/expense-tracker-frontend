import React, { useEffect } from "react";

import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setLoggedInUser } from "./auth/core/services/login";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import Routes from "./app/core/routing/Routes";

axios.interceptors.request.use((req) => {
  return req;
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setLoggedInUser(dispatch);
  }, [dispatch]);

  return (
    <BrowserRouter forceRefresh={true}>
      <Routes />
    </BrowserRouter>
  );
};

export default App;
