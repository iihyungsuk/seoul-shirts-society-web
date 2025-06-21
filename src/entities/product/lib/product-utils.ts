import { type ProductSelection } from "../model/types";

// Utility function to find product selection by identifier
export const findProductSelectionIndex = <T extends ProductSelection>(
  items: T[],
  productId: string,
  size: string,
  color: string,
): number =>
  items.findIndex(
    (item) =>
      item.product.id === productId &&
      item.size === size &&
      item.color === color,
  );

// Utility function to validate basic product selection (without quantity)
export const validateProductSelection = (
  item: Partial<ProductSelection>,
): boolean => {
  return !!(item.product?.id && item.size && item.color);
};

// Utility function to format price consistently
export const formatPrice = (price: number, currency = "₩"): string => {
  // Ensure price is a valid number and not negative
  const validPrice = Math.max(0, Math.round(price));
  return `${currency}${validPrice.toLocaleString("ko-KR")}`;
};
