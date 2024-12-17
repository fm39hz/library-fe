import axios, { AxiosInstance } from "axios";
import queryString from "query-string";
import authenticationApi from "./authenticationApi";

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error(
    "VITE_API_BASE_URL is not defined in the environment variables",
  );
}

const axiosClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "content-type": "application/json",
  },
  withCredentials: false,
  paramsSerializer: (params) => queryString.stringify(params),
});

const token = localStorage.getItem("accessToken");
if (token != null)
  axiosClient.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
  };

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
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        console.log("Refreshing token");
        await authenticationApi.refreshToken();
        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token failed, proceed to login");
        authenticationApi.logout();
        // TODO: redirect to login page
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
