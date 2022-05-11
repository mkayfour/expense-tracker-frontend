import { message } from "antd";
import axios from "axios";

const getNewAccessToken = async (refreshToken: string) => {
  await axios
    .post(`${process.env.REACT_APP_SERVER_URL}/auth/token/refresh/`, {
      refresh: refreshToken,
    })
    .then((response: any) => {
      const { access: accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken);

      // TODO: remove this
      message.info("Login info updated");

      window.location.href = "/dashboard";
    })
    .catch((err) => {
      localStorage.clear();

      window.location.href = "/login";
      message.info("Session Expired. Logging out.");

      console.log("refresh token api failed");
    });
};

export default getNewAccessToken;
