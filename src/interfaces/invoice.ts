import { Book } from "./book";
import { Subscription } from "./subscriptions";

export interface Invoice {
  id: number;
  rentDate: Date;
  exceedDate: Date;
  book: Book;
  subscription: Subscription;
}

export interface InvoiceResponseDto {
  id: number;
  rentDate: Date;
  exceedDate: Date;
  book: number;
  subscription: number;
}

export interface InvoiceRequestDto {
  bookId: number;
  period: number;
}
