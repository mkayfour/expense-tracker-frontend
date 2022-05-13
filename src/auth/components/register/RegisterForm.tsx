import React, { useEffect, useState } from "react";

import { Button, Card, Input, Typography, Form, Divider, Spin } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import {
  ClearState,
  RegisterUser,
  SetAuthenticated,
} from "../../core/redux/actions";
import { StateType } from "../../../app/core/redux/types";
import Title from "antd/lib/typography/Title";

const { Text } = Typography;

type AuthProps = {
  isAuthenticated: boolean;
  error?: any;
  success?: boolean;
  message?: string;
};

interface RegisterData {
  email: string;
  password: string;
  role: "Admin" | "User";
}

type Props = {
  setAuthenticated: (value?: boolean) => void;
  registerUser: (registerData: RegisterData, setLoading: any) => void;
  auth: AuthProps;
  clearState: () => void;
};

const RegisterForm: React.FC<Props> = ({
  setAuthenticated,
  registerUser,
  clearState,
  auth,
}) => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [loading, setLoading] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const registerError = auth.error;

  const validationCheck = () => {
    const errors: any = {};

    if (!password1) {
      errors.password1 = "Required";
    }
    if (!password2) {
      errors.password2 = "Required";
    }
    if (password1 !== password2) {
      errors.password2 = "Passwords are not same";
    }

    if (!email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const onFinish = (values: any) => {
    const errors = validationCheck();

    if (Object.keys(errors).length === 0) {
      const newValue: any = {};
      newValue.email = values.email;
      newValue.password = values.password1;
      newValue.role = "Admin";

      registerUser(newValue, setLoading);
    } else {
      console.log("Errors", errors);
    }
  };

  useEffect(() => {
    clearState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      title={
        <Title level={4} style={{ fontFamily: "Inter" }}>
          Register{" "}
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
          paddingBottom: "0px",
          width: "100%",
        }}
      >
        <Form
          name="normal_signup"
          className="signup-form"
          initialValues={{}}
          onFinish={onFinish}
          style={{
            width: "100%",
          }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your Email!" }]}
          >
            <Input
              placeholder="Email"
              autoCapitalize="off"
              onChange={(e) => setEmail(e.target.value)}
              className="input_field"
              bordered={false}
              style={{ borderBottom: "0.5px solid #272e35" }}
            />
          </Form.Item>
          {email !== "" &&
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ? (
            <Form.Item>
              <Text type="danger">Email is invalid.</Text>
            </Form.Item>
          ) : (
            <></>
          )}
          <Form.Item
            name="password1"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Input
              name="password1"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => {
                setPassword1(e.target.value);
              }}
              className="input_field"
              bordered={false}
              style={{ borderBottom: "0.5px solid #272e35" }}
            />
          </Form.Item>
          <Form.Item
            name="password2"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Input
              name="password2"
              type={passwordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
              className="input_field"
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
          {password1 && password2 && password1 !== password2 ? (
            <Form.Item>
              <Text type="danger">Passwords do not match</Text>
            </Form.Item>
          ) : (
            <></>
          )}

          {registerError && (
            <Form.Item
              name="rememberMe"
              valuePropName="checked"
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "5px",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              {registerError &&
                typeof registerError !== "string" &&
                registerError.length > 0 &&
                registerError.map((err: React.ReactNode) => (
                  <p style={{ color: "red", padding: "2px", margin: "0px" }}>
                    {err}
                  </p>
                ))}
            </Form.Item>
          )}
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
            {loading ? (
              <Spin />
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) &&
                  password1 === password2
                    ? false
                    : true
                }
                style={{
                  margin: "auto",
                }}
              >
                Register
              </Button>
            )}
          </Form.Item>
          <Divider />
          <Form.Item style={{ marginBottom: "0px" }}>
            Already a Member? <Link to="/login">Login</Link>
          </Form.Item>
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
    setAuthenticated: () => dispatch(SetAuthenticated(true)),
    registerUser: (registerData: RegisterData, setLoading: any) =>
      dispatch(RegisterUser(registerData, setLoading)),
    clearState: () => dispatch(ClearState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
