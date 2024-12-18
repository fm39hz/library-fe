import { AxiosResponse } from "axios";
import {
  LoginRequest,
  LoginResponse,
  UserRequestDto,
  UserResponseDto,
} from "../../interfaces/authentication";
import axiosClient from "./axiosClient";

const ENDPOINT = "/auth";

const login = async (
  credentials: LoginRequest,
): Promise<AxiosResponse<LoginResponse>> => {
  const response = await axiosClient.post<LoginResponse>(
    `${ENDPOINT}/login`,
    credentials,
  );
  if (response.status !== 200) {
    return Promise.reject(new Error("Failed to login"));
  }
  setToken(response.data);
  return response;
};

const register = async (
  dto: UserRequestDto,
): Promise<AxiosResponse<UserResponseDto, unknown>> => {
  return await axiosClient.post<UserResponseDto>(`${ENDPOINT}/register`, dto);
};

const getUser = async (): Promise<AxiosResponse<UserResponseDto>> => {
  return await axiosClient.get<UserResponseDto>(`${ENDPOINT}/user`);
};

const refreshToken = async (): Promise<AxiosResponse<LoginResponse>> => {
  const token = localStorage.getItem("refreshToken");
  const response = await axiosClient.post<LoginResponse>(
    `${ENDPOINT}/refresh/${token}`,
  );
  if (response.status !== 200) {
    throw new Error("Failed to refresh token");
  }
  setToken(response.data);
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

const setToken = (response: LoginResponse) => {
  if (response.accessToken) {
    setBearerToken(response.accessToken);
    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("refreshToken", response.refreshToken);
  }
};

const removeBearerToken = () => {
  delete axiosClient.defaults.headers.common["Authorization"];
};

const initializeToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    setBearerToken(accessToken);
  }
};

const authenticationApi = {
  login,
  refreshToken,
  register,
  getUser,
  logout,
  setBearerToken,
  removeBearerToken,
  initializeToken,
};

export default authenticationApi;
