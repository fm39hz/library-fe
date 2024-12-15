import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import {
  PaymentResponseDto,
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

const returnBook = async (
  bookId: number,
): Promise<AxiosResponse<SubscriptionResponseDto, unknown>> => {
  return await axiosClient.post<SubscriptionResponseDto>(
    `${ENDPOINT}/return-book/${bookId}`,
  );
};

const payRemainingFee = async (): Promise<
  AxiosResponse<PaymentResponseDto, unknown>
> => {
  return await axiosClient.post<PaymentResponseDto>(
    `${ENDPOINT}/pay-remaining-fee`,
  );
};

const renew = async (): Promise<AxiosResponse<PaymentResponseDto, unknown>> => {
  return await axiosClient.get<PaymentResponseDto>(`${ENDPOINT}/renew`);
};

export default {
  getSubsription,
  createSubscription,
  updateSubscription,
  cancelSubscription,
  rentBook,
  returnBook,
  payRemainingFee,
  renew,
};
