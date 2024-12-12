import { Book } from "./book";
import { User } from "./user";

export interface Subscription {
  id: number;
  user: User;
  startDate: Date;
  endDate: Date;
  status: string;
  period: number;
  books: Book[];
}

export interface SubscriptionRequestDto {
  user: number;
  startDate: Date;
  period: number;
  rentedBooks: Book[];
  status: string;
}

export interface SubscriptionResponseDto {
  id: number;
  user: number;
  startDate: Date;
  endDate: Date;
  status: string;
  period: number;
  books: Book[];
}

export interface RentBookRequestDto {
  bookId: number;
  period: number;
}
