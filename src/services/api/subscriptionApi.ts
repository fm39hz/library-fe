import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import {
  SubscriptionRequestDto,
  SubscriptionResponseDto,
} from "../../interfaces/subscriptions";
import {
  InvoiceRequestDto,
  InvoiceResponseDto,
} from "../../interfaces/invoice";

const ENDPOINT = "/subscription";

const getSubsription = async (): Promise<
  AxiosResponse<SubscriptionResponseDto, unknown>
> => {
  return await axiosClient.get<SubscriptionResponseDto>(`${ENDPOINT}/`);
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
  dto: InvoiceRequestDto,
): Promise<AxiosResponse<InvoiceResponseDto, unknown>> => {
  return await axiosClient.post<InvoiceResponseDto>(`${ENDPOINT}/rent`, dto);
};

export default {
  getSubsription,
  createSubscription,
  updateSubscription,
  cancelSubscription,
  rentBook,
};
