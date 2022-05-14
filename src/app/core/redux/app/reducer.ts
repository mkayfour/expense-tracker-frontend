import { Types } from "./types";

interface DefaultStateI {
  isLoading: boolean;
}

const defaultState: DefaultStateI = {
  isLoading: false,
};

const { SET_LOADING, SET_AUTHENTICATED } = Types;

export const appReducer: any = (
  state: DefaultStateI = defaultState,
  action: any
) => {
  const { payload } = action;

  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, ...payload };

    case SET_LOADING:
      return { ...state, ...payload };

    default:
      return state;
  }
};
