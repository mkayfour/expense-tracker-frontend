import React, { useEffect } from "react";

import { Col, Layout, Row } from "antd";

import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import * as H from "history";

import { SetAuthenticated } from "../../../app/core/redux/app/actions";
import { StateType } from "../../../app/core/redux/types";

import LoginForm from "../../components/login/LoginForm";

import { getCurrentSessionTokens } from "../../core/services/session";

import "./login.css";

type AuthProps = {
  isAuthenticated: boolean;
  error?: string;
};

type StateProps = {
  auth: AuthProps;
};

type Props = {
  history: H.History;
  setAuthenticated: () => void;
  state: StateProps;
};

const Login: React.FC<Props> = ({ setAuthenticated, state, history }) => {
  const { isAuthenticated } = state.auth;

  const { accessToken } = getCurrentSessionTokens();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    } else if (accessToken) {
      setAuthenticated();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <Layout>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          height: "100vh",
          alignContent: "center",
        }}
      >
        <Col
          span={12}
          xs={24}
          sm={20}
          md={10}
          xl={10}
          xxl={10}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              margin: "0",
              marginTop: "5%",
              width: "100%",
            }}
          >
            <LoginForm auth={state.auth} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
