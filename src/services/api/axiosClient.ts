import axios, { AxiosInstance } from "axios";
import queryString from "query-string";

const axiosClient: AxiosInstance = axios.create({
  baseURL: `http://localhost:8080/api/v1`,
  headers: {
    "content-type": "application/json",
  },
  withCredentials: false,
  paramsSerializer: (params) => queryString.stringify(params),
});

export const setBearerToken = (token: string) => {
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeBearerToken = () => {
  delete axiosClient.defaults.headers.common["Authorization"];
};

const initializeToken = () => {
  const userInfo = localStorage.getItem("userinfor");
  if (userInfo) {
    try {
      const parsedUserInfo = JSON.parse(userInfo);
      if (parsedUserInfo && parsedUserInfo.token) {
        setBearerToken(parsedUserInfo.token);
      }
    } catch (error) {
      console.error("Error parsing user info from localStorage:", error);
    }
  }
};

initializeToken();

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      removeBearerToken();
      // TODO: redirect to login page or refresh token here
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
