import { Dispatch } from "redux";

import { LoginDispatchTypes, Types } from "./types";

import axios from "axios";

import { message } from "antd";

const {
  LOGIN_USER,
  LOGOUT_USER,
  SET_ACCESS_TOKEN,
  CLEAR_STATE,
  SET_AUTHENTICATED,
  SET_USERDATA,
  SET_LOGIN_ERROR,
  SET_REGISTER_ERROR,
  REGISTER_SUCCESS,
} = Types;

export const LoginUser =
  (username: string, password: string, rememberMe: boolean) =>
  async (dispatch: Dispatch<LoginDispatchTypes>) => {
    try {
      dispatch({
        type: LOGIN_USER,
        payload: {
          username,
          password,
          rememberMe,
        },
      });

      await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/auth/login/`, {
          email: username,
          password,
        })
        .then(async (response) => {
          const accessToken = response.data.included[0].attributes.token;
          const refreshToken = response.data.included[1].attributes.token;
          await axios
            .get(`${process.env.REACT_APP_SERVER_URL}/auth/me/`, {
              headers: {
                "x-access-token": `${accessToken}`,
              },
            })
            .then((response: any) => {
              const userData = response.data;

              dispatch({
                type: SET_USERDATA,
                payload: {
                  userData,
                },
              });
            });

          dispatch({
            type: SET_AUTHENTICATED,
            payload: {
              isAuthenticated: true,
              accessToken,
              refreshToken,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: SET_LOGIN_ERROR,
            payload: {
              error: "Invalid email or password",
            },
          });
        });
    } catch (e) {}
  };

export const LogoutUser =
  () => async (dispatch: Dispatch<LoginDispatchTypes>) => {
    try {
      dispatch({
        type: LOGOUT_USER,
      });
      dispatch({
        type: SET_AUTHENTICATED,
        payload: {
          isAuthenticated: false,
        },
      });
    } catch (e) {}
  };

export const SetAuthenticated =
  (isAuthenticated: boolean) =>
  async (dispatch: Dispatch<LoginDispatchTypes>) => {
    try {
      dispatch({
        type: SET_AUTHENTICATED,
        payload: {
          isAuthenticated,
        },
      });
    } catch (e) {}
  };

export const GetNewToken =
  (refreshToken: string, setShouldReload: any) =>
  async (dispatch: Dispatch<LoginDispatchTypes>) => {
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/login/refresh/`, {
        refresh: refreshToken,
      })
      .then((response: any) => {
        const { access: accessToken } = response.data;
        dispatch({
          type: SET_ACCESS_TOKEN,
          payload: {
            accessToken,
          },
        });
        message.info("Login info updated.");
        window.location.href = "/dashboard";
        setShouldReload(true);
      })
      .catch((err) => {
        localStorage.clear();

        window.location.href = "/login";
        message.info("Logging out");
        console.log("refresh token api failed");
      });
  };

export const ClearState =
  () => async (dispatch: Dispatch<LoginDispatchTypes>) => {
    dispatch({
      type: CLEAR_STATE,
      payload: {},
    });
  };

interface RegisterData {
  email: string;
  password: string;
  role: "Admin" | "User";
}

export const RegisterUser =
  (registerData: RegisterData, setLoading: any) =>
  async (dispatch: Dispatch<LoginDispatchTypes>) => {
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/auth/register/`, registerData)
      .then(async (response) => {
        const { access_token: accessToken, refresh_token: refreshToken } =
          response.data;

        dispatch({
          type: REGISTER_SUCCESS,
          payload: {
            accessToken,
            refreshToken,
            success: "Registeration success",
          },
        });

        message.success("Registeration successful.");

        dispatch({
          type: SET_AUTHENTICATED,
          payload: {
            isAuthenticated: true,
            accessToken,
            refreshToken,
          },
        });

        setLoading(false);
      })
      .catch((err: any) => {
        console.log("error in axios API  -> ", err.response.data);

        const errorsList: any[] = [];

        for (const [key, value] of Object.entries(err.response.data)) {
          console.log(`${key}: ${value}`);
          message.error(`${value}`);
          errorsList.push(value);
        }

        // TODO: OTP error message change
        dispatch({
          type: SET_REGISTER_ERROR,
          payload: {
            error: errorsList,
          },
        });

        setLoading(false);
      });
  };

export const GetUserData =
  () => async (dispatch: Dispatch<LoginDispatchTypes>) => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/user/`, {})
      .then((response: any) => {
        const userData = response.data;

        dispatch({
          type: SET_USERDATA,
          payload: {
            userData,
          },
        });
      })
      .catch((err) => console.log("--- erro", err));
  };
