import {
  findProductSelectionIndex,
  validateProductSelection,
} from "@/entities/product";

import { type CartItem } from "../model/types";

export const validateCartItem = (item: Partial<CartItem>): boolean => {
  return (
    validateProductSelection(item) && !!(item.quantity && item.quantity > 0)
  );
};

export const createCartItemId = (
  productId: string,
  size: string,
  color: string,
): string => `${productId}-${size}-${color}`;

// Calculate line total for cart item
export const calculateCartItemTotal = (item: CartItem): number =>
  item.product.price * item.quantity;

// Check if cart item already exists
export const findExistingCartItem = (
  items: CartItem[],
  productId: string,
  size: string,
  color: string,
): CartItem | undefined => {
  const index = findProductSelectionIndex(items, productId, size, color);
  return index !== -1 ? items[index] : undefined;
};

// Create new cart item with defaults
export const createCartItem = (
  product: CartItem["product"],
  size: string,
  color: string,
  quantity: number,
): CartItem => ({
  product,
  size,
  color,
  quantity,
  addedDate: new Date(),
});
