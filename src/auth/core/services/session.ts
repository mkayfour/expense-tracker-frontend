export const getCurrentSessionTokens = () => {
  const accessToken = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : sessionStorage.getItem("accessToken");

  const refreshToken = localStorage.getItem("refreshToken")
    ? localStorage.getItem("refreshToken")
    : sessionStorage.getItem("refreshToken");

  return { accessToken, refreshToken };
};
