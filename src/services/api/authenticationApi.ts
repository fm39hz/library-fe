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
  if (response.data.accessToken) {
    setBearerToken(response.data.accessToken);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  }
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
