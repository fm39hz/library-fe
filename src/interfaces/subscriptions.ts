import Subscription from "../pages/Subscriptions";
import { model } from "./model";
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

export interface SubscriptionResponseDto extends model {
  id: number;
  user: number;
  startDate: Date;
  endDate: Date;
  status: string;
  period: number;
  lateFeePercent: number;
  lateFee: number;
  remainingFee: number;
  rentLimit: number;
}

export interface PaymentResponseDto {
  paymentId: number;
  amount: number;
  paymentInfo: string;
  status: string;
  paymentUrl: string;
}
