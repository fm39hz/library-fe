import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { Publisher } from "../../interfaces/publishers";

const ENDPOINT = "/publisher";

const getAllPublishers = async (): Promise<
  AxiosResponse<Publisher[], unknown>
> => {
  return await axiosClient.get<Publisher[]>(`${ENDPOINT}/`);
};

export default {
  getAllPublishers,
};
