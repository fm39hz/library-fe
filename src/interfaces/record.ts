import { Book } from "./book";
import { Subscription } from "./subscriptions";

export interface Record {
  id: number;
  rentDate: Date;
  exceedDate: Date;
  book: Book;
  subscription: Subscription;
}

export interface RecordResponseDto {
  id: number;
  rentDate: Date;
  exceedDate: Date;
  book: number;
  subscription: number;
}

export interface RecordRequestDto {
  bookId: number;
  period: number;
}
