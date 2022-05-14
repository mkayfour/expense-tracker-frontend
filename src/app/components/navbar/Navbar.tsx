import React from "react";

import { Menu, Typography } from "antd";
import { Header } from "antd/lib/layout/layout";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { LogoutUser } from "../../../auth/core/redux/actions";

const Navbar = (props) => {
  const { logoutUser } = props;

  return (
    <Header
      className="header"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div
        style={{
          width: "200px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="/dashboard">
          <Typography.Title level={4} style={{ color: "white" }}>
            Expense Tracker
          </Typography.Title>
        </Link>
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        items={[
          {
            key: 1,
            label: `Dashboard`,
            onClick: () => {
              window.location.pathname = "/dashboard";
            },
          },
          {
            key: 2,
            label: `Profile`,
            onClick: () => {
              window.location.pathname = "/profile";
            },
          },
          {
            key: 3,
            label: `Logout`,
            onClick: () => {
              logoutUser();
            },
          },
        ]}
        style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
      />
    </Header>
  );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    logoutUser: () => dispatch(LogoutUser()),
  };
};

export default connect(null, mapDispatchToProps)(Navbar);
