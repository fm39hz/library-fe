import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { InvoiceResponseDto } from "../../interfaces/invoice";

const ENDPOINT = "/invoice";

const getInvoice = async (): Promise<
  AxiosResponse<InvoiceResponseDto, unknown>
> => {
  return await axiosClient.get<InvoiceResponseDto>(`${ENDPOINT}/`);
};

const getInvoiceWithSubscription = async (
  id: number,
): Promise<AxiosResponse<InvoiceResponseDto[], unknown>> => {
  return await axiosClient.get<InvoiceResponseDto[]>(
    `${ENDPOINT}/subscription/${id}`,
  );
};

const getInvoiceById = async (
  id: number,
): Promise<AxiosResponse<InvoiceResponseDto[], unknown>> => {
  return await axiosClient.get<InvoiceResponseDto[]>(`${ENDPOINT}/${id}`);
};

export default {
  getInvoice,
  getInvoiceById,
  getInvoiceWithSubscription,
};
