import Subscription from "../pages/Subscriptions";
import { User } from "./user";

export interface Subscription {
  id: number;
  user: User;
  startDate: Date;
  endDate: Date;
  status: string;
  period: number;
  rentLimit: number;
}

export interface SubscriptionRequestDto {
  user: number;
  startDate: Date;
  period: number;
  status: string;
  rentLimit: number;
}

export interface SubscriptionResponseDto {
  id: number;
  user: number;
  startDate: Date;
  endDate: Date;
  status: string;
  period: number;
  rentLimit: number;
}
