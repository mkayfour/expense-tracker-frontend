import React, { useEffect } from "react";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Login from "../../../auth/containers/login/Login";
import Register from "../../../auth/containers/register/Register";
import Dashboard from "../../containers/dashboard/Dashboard";

import "../../../App.css";

import PrivateRoute from "./PrivateRoute";
import Profile from "../../components/profile/Profile";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/MainFooter";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";
import { ThunkDispatch } from "redux-thunk";
import { GetProfile } from "../../../auth/core/redux/actions";
import { AnyAction } from "redux";

const Routes = (props: any) => {
  console.log("--------->satte", props.state);

  useEffect(() => {
    console.log("------->");
    if (!props?.state?.auth?.user) {
      props.getProfile();
    }
  }, [props]);

  const { accessToken } = getCurrentSessionTokens();

  return (
    <>
      {accessToken && <Navbar />}
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/profile" component={Profile} />
      </Switch>
      <MainFooter />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getProfile: () => dispatch(GetProfile()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
