export enum Types {
  SET_LOADING = "SET_LOADING",
  SET_AUTHENTICATED = "SET_AUTHENTICATED",
  UPDATE_PROFILE = "UPDATE_PROFILE",
  GET_PROFILE = "GET_PROFILE",
}

export interface SetLoadingPayload {
  type: typeof Types.SET_LOADING;
  payload: {
    isLoading: boolean;
  };
}

export interface SetAuthenticated {
  type: typeof Types.SET_AUTHENTICATED;
  payload: {
    isAuthenticated: boolean;
  };
}

export type AppDispatchTypes = SetLoadingPayload | SetAuthenticated;
