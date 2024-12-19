import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { Author } from "../../interfaces/author";
import { Book } from "../../interfaces/book";

const ENDPOINT = "/author";

const getAllAuthors = async (): Promise<AxiosResponse<Author[], unknown>> => {
  return await axiosClient.get<Author[]>(`${ENDPOINT}/`);
};

const getAuthorById = async (
  id: number,
): Promise<AxiosResponse<Author, unknown>> => {
  return await axiosClient.get<Author>(`${ENDPOINT}/${id}`);
};

const getAuthorBooks = async (
  id: number,
): Promise<AxiosResponse<Book[], unknown>> => {
  return await axiosClient.get<Book[]>(`${ENDPOINT}/${id}/books`);
};

const createAuthor = async (
  author: Author,
): Promise<AxiosResponse<Author, unknown>> => {
  return await axiosClient.post<Author>(`${ENDPOINT}/`, author);
};

const updateAuthor = async (
  author: Author,
): Promise<AxiosResponse<Author, unknown>> => {
  return await axiosClient.put<Author>(`${ENDPOINT}/${author.id}`, author);
};

export default {
  getAllAuthors,
  getAuthorById,
  getAuthorBooks,
  createAuthor,
  updateAuthor,
};
