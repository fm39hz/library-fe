import { AxiosResponse } from "axios";
import { Book } from "../../interfaces/book";
import axiosClient from "./axiosClient";

const ENDPOINT = "/book";

const getAllBooks = async (): Promise<AxiosResponse<Book[], unknown>> => {
  return await axiosClient.get<Book[]>(`${ENDPOINT}/`);
};

const getBookById = async (
  id: number,
): Promise<AxiosResponse<Book, unknown>> => {
  return await axiosClient.get<Book>(`${ENDPOINT}/${id}`);
};

const createBook = async (
  book: Book,
): Promise<AxiosResponse<Book, unknown>> => {
  return await axiosClient.post<Book>(`${ENDPOINT}/`, book);
};

const updateBook = async (
  book: Book,
): Promise<AxiosResponse<Book, unknown>> => {
  return await axiosClient.put<Book>(`${ENDPOINT}/${book.id}`, book);
};

const deleteBook = async (id: number): Promise<AxiosResponse<void>> => {
  return await axiosClient.delete(`${ENDPOINT}/${id}`);
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
