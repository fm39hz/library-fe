import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import {
  RentBookRequestDto,
  Subscription,
  SubscriptionRequestDto,
  SubscriptionResponseDto,
} from "../../interfaces/subscriptions";

const ENDPOINT = "/subscription";

const getSubsription = async (): Promise<
  AxiosResponse<Subscription[], unknown>
> => {
  return await axiosClient.get<Subscription[]>(`${ENDPOINT}/`);
};

const createSubscription = async (
  dto: SubscriptionRequestDto,
): Promise<AxiosResponse<SubscriptionResponseDto, unknown>> => {
  return await axiosClient.post<SubscriptionResponseDto>(`${ENDPOINT}/`, dto);
};

const updateSubscription = async (
  dto: SubscriptionRequestDto,
): Promise<AxiosResponse<SubscriptionResponseDto, unknown>> => {
  return await axiosClient.put<SubscriptionResponseDto>(`${ENDPOINT}/`, dto);
};

const cancelSubscription = async (): Promise<
  AxiosResponse<SubscriptionResponseDto, unknown>
> => {
  return await axiosClient.delete<SubscriptionResponseDto>(`${ENDPOINT}/`);
};

const rentBook = async (
  dto: RentBookRequestDto,
): Promise<AxiosResponse<Date, unknown>> => {
  return await axiosClient.post<Date>(`${ENDPOINT}/rent`, dto);
};

export default {
  getSubsription,
  createSubscription,
  updateSubscription,
  cancelSubscription,
  rentBook,
};
