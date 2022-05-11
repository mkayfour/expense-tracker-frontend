import { SetAuthenticated } from "../redux/actions";

const setLoggedInUser = (dispatch: any) => {
  const dataLocal = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;

  const dataSession = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;

  let accessToken = null;
  let refreshToken = null;

  if (dataLocal !== null) {
    accessToken = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null;

    refreshToken = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null;
  } else if (dataSession !== null) {
    accessToken = sessionStorage.getItem("accessToken")
      ? sessionStorage.getItem("accessToken")
      : null;

    refreshToken = sessionStorage.getItem("accessToken")
      ? sessionStorage.getItem("accessToken")
      : null;
  }

  if (accessToken != null && refreshToken !== null) {
    dispatch(SetAuthenticated(true));
  }
};

export { setLoggedInUser };
