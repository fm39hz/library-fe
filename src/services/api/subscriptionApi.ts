import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { Subscription } from "../../interfaces/subscriptions";

const ENDPOINT = "/subscription";

const getSubsription = async (): Promise<
  AxiosResponse<Subscription[], unknown>
> => {
  return await axiosClient.get<Subscription[]>(`${ENDPOINT}/`);
};

export default {
  getSubsription,
};
