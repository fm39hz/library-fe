import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { RecordResponseDto } from "../../interfaces/record";

const ENDPOINT = "/record";

const getRecord = async (): Promise<
  AxiosResponse<RecordResponseDto, unknown>
> => {
  return await axiosClient.get<RecordResponseDto>(`${ENDPOINT}/`);
};

const getRecordBySubscription = async (
  id: number,
): Promise<AxiosResponse<RecordResponseDto[], unknown>> => {
  return await axiosClient.get<RecordResponseDto[]>(
    `${ENDPOINT}/subscription/${id}`,
  );
};

const getRecordById = async (
  id: number,
): Promise<AxiosResponse<RecordResponseDto[], unknown>> => {
  return await axiosClient.get<RecordResponseDto[]>(`${ENDPOINT}/${id}`);
};

const getAllRecords = async (): Promise<AxiosResponse<RecordResponseDto[], unknown>> => {
  return await axiosClient.get<RecordResponseDto[]>(`${ENDPOINT}/`);
}
export default {
  getRecord,
  getRecordById,
  getRecordBySubscription,
  getAllRecords,
};
