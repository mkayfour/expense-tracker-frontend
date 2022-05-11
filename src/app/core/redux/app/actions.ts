import { Dispatch } from "redux";

import { AppDispatchTypes, Types } from "./types";

const { SET_AUTHENTICATED } = Types;

export const SetAuthenticated =
  () => async (dispatch: Dispatch<AppDispatchTypes>) => {
    try {
      dispatch({
        type: SET_AUTHENTICATED,
        payload: {
          isAuthenticated: true,
        },
      });
    } catch (e) {
      console.log("an error occoured ", e);
    }
  };
