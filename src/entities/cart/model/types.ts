import { type ProductSelection } from "@/entities/product";

export interface CartItem extends ProductSelection {
  quantity: number;
  addedDate: Date;
}

export interface CartState {
  items: CartItem[];
  selectedItems: Set<string>;
  isInitialized: boolean;
  hasHydrated: boolean;
}

export interface SelectionState<T extends ProductSelection = ProductSelection> {
  items: T[];
  selectedItems: Set<string>;
  isInitialized: boolean;
}

export interface CartSummary {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  itemCount: number;
}
