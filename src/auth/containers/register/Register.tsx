import React, { useEffect } from "react";

import { Col, Layout, Row } from "antd";

import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import * as H from "history";

import RegisterForm from "../../components/register/RegisterForm";
import { getCurrentSessionTokens } from "../../core/services/session";

import { SetAuthenticated } from "../../../app/core/redux/app/actions";
import { StateType } from "../../../app/core/redux/types";

import AppTitle from "../../components/appTitle/AppTitle";

type AuthProps = {
  isAuthenticated: boolean;
  error?: string;
  success?: boolean;
  message?: string;
};

type StateProps = {
  auth: AuthProps;
};

type Props = {
  history: H.History;
  location: H.Location;
  setAuthenticated: () => void;
  state: StateProps;
};

const Register: React.FC<Props> = ({ setAuthenticated, state, history }) => {
  const { isAuthenticated } = state.auth;

  const { accessToken } = getCurrentSessionTokens();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
    if (accessToken) {
      setAuthenticated();
    }
  });

  return (
    <Layout>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
          width: "100%",
        }}
      >
        <AppTitle />
      </Row>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          height: "100vh",
          // alignContent: "center",
        }}
      >
        <Col
          span={24}
          xs={24}
          sm={20}
          md={16}
          xl={10}
          xxl={10}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              margin: "0",
              width: "100%",
            }}
          >
            <RegisterForm auth={state.auth} />
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    setAuthenticated: () => dispatch(SetAuthenticated()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
