import { model } from "./model";

export interface Book extends model {
  description: string;
  inStock: number;
  image?: string;
  authorId: number;
}
