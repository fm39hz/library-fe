import { AxiosResponse } from "axios";
import { Book } from "../../interfaces/book";
import axiosClient from "./axiosClient";

const ENDPOINT = "/book";
const getAllBooks = async (): Promise<AxiosResponse<Book[], unknown>> => {
  return await axiosClient.get<Book[]>(`${ENDPOINT}`);
};

export default {
  getAllBooks,
};
