import { AxiosResponse } from "axios";
import { LoginRequest, LoginResponse } from "../../interfaces/authentication";
import axiosClient from "./axiosClient";

const ENDPOINT = "/auth";

const login = async (
  credentials: LoginRequest,
): Promise<AxiosResponse<LoginResponse>> => {
  const response = await axiosClient.post<LoginResponse>(
    `${ENDPOINT}/login`,
    credentials,
  );
  if (response.data.accessToken) {
    setBearerToken(response.data.accessToken);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  }
  return response;
};

const refreshToken = async (): Promise<AxiosResponse<LoginResponse>> => {
  const token = localStorage.getItem("refreshToken");
  const response = await axiosClient.post<LoginResponse>(
    `${ENDPOINT}/login/${token}`,
  );
  if (response.data.accessToken) {
    setBearerToken(response.data.accessToken);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  }
  return response;
};

const logout = () => {
  removeBearerToken();
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const setBearerToken = (token: string) => {
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const removeBearerToken = () => {
  delete axiosClient.defaults.headers.common["Authorization"];
};

const authenticationApi = {
  login,
  refreshToken,
  logout,
  setBearerToken,
  removeBearerToken,
};

export default authenticationApi;
