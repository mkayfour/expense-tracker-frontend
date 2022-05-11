import React from "react";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Login from "../../../auth/containers/login/Login";
import Register from "../../../auth/containers/register/Register";
import Dashboard from "../../containers/dashboard/Dashboard";

import "../../../App.css";

import PrivateRoute from "./PrivateRoute";

const Routes = (props: any) => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(Routes);
