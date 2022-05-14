export enum Types {
  LOGIN_USER = "LOGIN_USER",
  LOGOUT_USER = "LOGOUT_USER",
  SET_AUTHENTICATED = "SET_AUTHENTICATED",
  SET_LOADING = "SET_LOADING",
  SET_USERDATA = "SET_USERDATA",
  SET_LOGIN_ERROR = "SET_LOGIN_ERROR",
  SET_REGISTER_ERROR = "SET_REGISTER_ERROR",
  SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN",
  CLEAR_STATE = "CLEAR_STATE",
  REGISTER_USER = "REGISTER_USER",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAIL = "REGISTER_FAIL",
  UPDATE_PROFILE = "UPDATE_PROFILE",
  GET_PROFILE = "GET_PROFILE",
}

export type LoginData = {
  username: string;
  password: string;
  rememberMe: boolean;
};

export interface LoginUser {
  type: typeof Types.LOGIN_USER;
  payload: LoginData;
}

export type RegisterUserData = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone_number: string;
  phone_number_extension: string;
  otp: string;
};

export interface RegisterUser {
  type: typeof Types.REGISTER_USER;
  payload: RegisterUserData;
}

export interface RegisterSuccess {
  type: typeof Types.REGISTER_SUCCESS;
  payload: {
    accessToken: string;
    refreshToken: string;
    success: string;
  };
}

export interface RegisterFail {
  type: typeof Types.REGISTER_FAIL;
  payload: {
    message: string;
  };
}

export interface LogoutUser {
  type: typeof Types.LOGOUT_USER;
}

export interface SetAuthenticated {
  type: typeof Types.SET_AUTHENTICATED;
  payload: {
    isAuthenticated: boolean;
    accessToken?: string;
    refreshToken?: string;
    rememberMe?: boolean;
  };
}

export interface SetLoadingPayload {
  type: typeof Types.SET_LOADING;
  payload: {
    isLoading: boolean;
  };
}

export interface SetUserData {
  type: typeof Types.SET_USERDATA;
  payload: {
    userData: any;
  };
}

export interface SetLoginError {
  type: typeof Types.SET_LOGIN_ERROR;
  payload: {
    error: string;
  };
}

export interface SetRegisterError {
  type: typeof Types.SET_REGISTER_ERROR;
  payload: {
    error: any;
  };
}

export interface SetAccessToken {
  type: typeof Types.SET_ACCESS_TOKEN;
  payload: {
    accessToken: string;
  };
}

export interface UpdateProfile {
  type: typeof Types.UPDATE_PROFILE;
  payload: any;
}

export interface GetProfile {
  type: typeof Types.GET_PROFILE;
  payload: any;
}
export interface ClearState {
  type: typeof Types.CLEAR_STATE;
  payload: {};
}

export type LoginDispatchTypes =
  | LoginUser
  | LogoutUser
  | SetAuthenticated
  | SetLoadingPayload
  | SetUserData
  | SetLoginError
  | SetRegisterError
  | SetAccessToken
  | ClearState
  | RegisterUser
  | RegisterSuccess
  | RegisterFail
  | UpdateProfile
  | GetProfile;
