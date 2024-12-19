import { model } from "./model";

export interface Author extends model {
  age: number;
  books: number[];
}
