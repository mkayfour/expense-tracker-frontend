import React from "react";

import { Button, Card, Divider, Typography } from "antd";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { LogoutUser } from "../../../auth/core/redux/actions";

import { StateType } from "../../core/redux/types";

const Dashboard = (props: any) => {
  const { logoutUser } = props;

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Card>
        {" "}
        <Typography.Title level={1}>Welcome </Typography.Title>
        <Typography.Title level={3}>
          You have successfully logged in.
        </Typography.Title>
        <Divider />
        <Button onClick={handleLogout}>Logout</Button>
      </Card>
    </div>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    logoutUser: () => dispatch(LogoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
