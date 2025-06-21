import { type ProductSelection } from "@/entities/product";

// Core Order types
export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem extends ProductSelection {
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

// Order Summary specific types
export interface OrderSummary {
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  itemCount: number;
}
