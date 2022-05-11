import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  Checkbox,
  Input,
  Typography,
  Form,
  Divider,
  Row,
  Col,
} from "antd";

import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { ClearState, LoginUser } from "../../core/redux/actions";
import { StateType } from "../../../app/core/redux/types";
import Title from "antd/lib/typography/Title";

const { Text } = Typography;

type Props = {
  loginUser: (username: string, password: string, rememberMe: boolean) => void;
  clearState: () => void;
  auth: any;
};

const LoginForm: React.FC<Props> = ({ loginUser, clearState, auth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const error = auth.error ? auth.error : null;

  const handleFormSubmit = () => {
    loginUser(username, password, rememberMe);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    handleFormSubmit();
  };

  useEffect(() => {
    clearState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      title={
        <Title level={4} style={{ fontFamily: "Inter", textAlign: "center" }}>
          Login
        </Title>
      }
      style={{
        paddingBottom: "0px",
        width: "100%",
        background: "#F7F7F8",
        boxShadow: "8px 4px 16px rgba(0, 0, 0, 0.25)",
        borderRadius: "20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
          paddingBottom: "0px",
          width: "100%",
        }}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ pxember: true }}
          onFinish={onFinish}
          style={{
            paddingBottom: "0px",
            width: "100%",
          }}
        >
          <Row style={{ display: "flex", flexDirection: "column" }}>
            <Col style={{ width: "100%" }}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input
                  placeholder="Email"
                  autoCapitalize="off"
                  onChange={(e) => setUsername(e.target.value)}
                  className="ct_forms_input_field"
                  bordered={false}
                  style={{ borderBottom: "0.5px solid #272e35" }}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="password"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Input
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="ct_forms_input_field"
                  bordered={false}
                  style={{ borderBottom: "0.5px solid #272e35" }}
                />
                {passwordVisible ? (
                  <EyeOutlined
                    className="site-form-item-icon"
                    style={{ fontSize: "24px" }}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                ) : (
                  <EyeInvisibleOutlined
                    className="site-form-item-icon"
                    style={{ fontSize: "24px" }}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                )}
              </Form.Item>
              {error !== null && (
                <Form.Item name="pxember" valuePropName="checked">
                  <Text type="danger">{error}</Text>
                </Form.Item>
              )}
            </Col>
            <Col>
              <Form.Item>
                <Form.Item name="pxember" valuePropName="checked" noStyle>
                  <Checkbox onChange={(e) => setRememberMe(e.target.value)}>
                    Keep me logged in
                  </Checkbox>
                </Form.Item>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="ct_forms_primary_button"
                  style={{
                    margin: "auto",
                  }}
                >
                  Log in
                </Button>{" "}
              </Form.Item>
              <Form.Item>
                <Link to="/forgot-password">Forgot Password? </Link>
              </Form.Item>
              <Divider />
              <Form.Item style={{ marginBottom: "0px" }}>
                Not a Member? <Link to="/register">Register</Link>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Card>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    loginUser: (username: string, password: string, rememberMe: boolean) =>
      dispatch(LoginUser(username, password, rememberMe)),
    clearState: () => dispatch(ClearState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
