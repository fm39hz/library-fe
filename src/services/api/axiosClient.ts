import axios, { AxiosInstance } from "axios";
import queryString from "query-string";
import authenticationApi from "./authenticationApi";

const axiosClient: AxiosInstance = axios.create({
  baseURL: `http://localhost:8080/api/v1`,
  headers: {
    "content-type": "application/json",
  },
  withCredentials: false,
  paramsSerializer: (params) => queryString.stringify(params),
});

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
        await authenticationApi.refreshToken();
        return axiosClient(originalRequest);
      } catch (refreshError) {
        authenticationApi.logout();
        // TODO: redirect to login page
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
