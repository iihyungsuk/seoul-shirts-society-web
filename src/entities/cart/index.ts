// Export types
export type {
  CartItem,
  CartState,
  SelectionState,
  CartSummary,
} from "./model/types";

// Export utilities
export {
  calculateCartItemTotal,
  findExistingCartItem,
  createCartItem,
  validateCartItem,
  createCartItemId,
} from "./lib/cart-utils";

// Export UI components
export { CartItemCard, CartIconSvg, type CartIconSvgProps } from "./ui";

// Export store
export { useCartStore } from "./model/cart.store";
