import { Book } from "./book";

export interface Publisher {
  id: number;
  name: string;
  books: Book[];
}
