import { CONSTANTS } from "./types";

export const loginUser = (userData: any, history: any) => (dispatch: any) => {
  const { LOGIN_USER } = CONSTANTS;

  dispatch({ type: LOGIN_USER });
};
