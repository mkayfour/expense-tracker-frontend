export const CONSTANTS = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
  LOGIN_USER: "LOGIN_USER",
  CLEAR_CURRENT_ORGANISATION: "CLEAR_CURRENT_ORGANISATION",
};

export type UserDataType = {
  email: string;
  first_name: string;
  id: number;
  is_active: boolean;
  is_verified: boolean;
  last_login: string;
  last_name: string;
  phone_number: string;
  phone_number_extenstion: string;
  profile_picture: string;
  profile_picture_process_status: string;
};

export type AuthType = {
  isAuthenticated: boolean;
  error?: string;
  success?: boolean;
  message?: string;
  userData?: UserDataType;
};

export type StateType = {
  auth: AuthType;
};
