import { CONSTANTS } from "../../../app/core/redux/types";

import { Types } from "./types";

interface DefaultStateI {}

const defaultState: DefaultStateI = {
  isAuthenticated: false,
};

const {
  LOGOUT_USER,
  SET_AUTHENTICATED,
  SET_LOGIN_ERROR,
  SET_REGISTER_ERROR,
  SET_USERDATA,
  SET_ACCESS_TOKEN,
  CLEAR_STATE,
  REGISTER_SUCCESS,
  GET_PROFILE,
  UPDATE_PROFILE,
} = Types;

export const authReducer: any = (
  state: DefaultStateI = defaultState,
  action: any
) => {
  const { LOGIN_USER } = CONSTANTS;

  const { payload } = action;

  switch (action.type) {
    case LOGIN_USER: {
      console.log("----------------- after login -------------", action);
      return { ...state, ...payload };
    }

    case SET_AUTHENTICATED: {
      if (action.payload.isAuthenticated) {
        if (action.payload.rememberMe) {
          action.payload.accessToken &&
            localStorage.setItem("accessToken", action.payload.accessToken);
          action.payload.refreshToken &&
            localStorage.setItem("refreshToken", action.payload.refreshToken);
        } else {
          // TODO: change later
          action.payload.accessToken &&
            localStorage.setItem("accessToken", action.payload.accessToken);
          action.payload.refreshToken &&
            localStorage.setItem("refreshToken", action.payload.refreshToken);
        }
      }
      return { ...state, ...payload };
    }

    case LOGOUT_USER: {
      localStorage.clear();
      sessionStorage.clear();
      const newState = {};

      return { ...state, newState };
    }

    case SET_LOGIN_ERROR: {
      return { ...state, ...payload };
    }

    case SET_REGISTER_ERROR: {
      console.log("payload recieved");
      return { ...state, ...payload };
    }

    case SET_USERDATA: {
      console.log("---------> payload here ---------->", action);
      return { ...state, ...payload };
    }

    case SET_ACCESS_TOKEN: {
      localStorage.setItem("accessToken", payload.accessToken);
      return { ...state };
    }

    case CLEAR_STATE: {
      return { isAuthenticated: false };
    }

    case REGISTER_SUCCESS: {
      action.payload.accessToken &&
        localStorage.setItem("accessToken", action.payload.accessToken);
      action.payload.refreshToken &&
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      return { ...state, ...payload };
    }

    case GET_PROFILE:
      console.log("-----------> action here ------------>", action);
      return { ...state, ...payload };

    case UPDATE_PROFILE:
      console.log("-----------> action here ------------>", action);
      return state;
    // return { ...state, ...payload };

    default:
      return state;
  }
};
