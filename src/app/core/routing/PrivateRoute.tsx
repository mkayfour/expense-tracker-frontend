import React from "react";

import { connect } from "react-redux";

import { Route, Redirect } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { GetUserData } from "../../../auth/core/redux/actions";

const PrivateRoute = (props: any) => {
  const { component: Component, ...rest } = props;

  const accessToken = localStorage.getItem("accessToken");

  return (
    <>
      {props.state && props.state.auth && (
        <Route
          {...rest}
          render={(props: any) =>
            accessToken ? <Component {...props} /> : <Redirect to="/login" />
          }
        />
      )}
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
    getUserData: () => dispatch(GetUserData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
