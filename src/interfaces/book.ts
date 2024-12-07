export interface Book {
  id: number;
  title: string;
  description: string;
  inStock: number;
  image?: string;
  authorId: number;
}
