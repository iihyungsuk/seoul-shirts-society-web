import {
  type CartItem,
  calculateCartItemTotal,
  createCartItemId,
  useCartStore,
} from "@/entities/cart";

/**
 * Cart Summary Business Logic Hook
 * Handles cart summary operations for cart-summary-widget
 */
export const useCartSummaryOperations = () => {
  const { items, selectedItems, hasHydrated } = useCartStore();

  const getSortedItems = (): CartItem[] => {
    return [...items].sort((a, b) => {
      return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
    });
  };

  const getSelectedItems = (): CartItem[] => {
    const sortedItems = getSortedItems();
    return sortedItems.filter((item: CartItem) => {
      const itemId = createCartItemId(item.product.id, item.size, item.color);
      return selectedItems.has(itemId);
    });
  };

  const getSelectedTotalPrice = (): number => {
    return getSelectedItems().reduce((total, item: CartItem) => {
      return total + calculateCartItemTotal(item);
    }, 0);
  };

  const hasSelectedItems = (): boolean => {
    return selectedItems.size > 0;
  };

  const getSelectedItemsCount = (): number => {
    return getSelectedItems().reduce((total, item) => total + item.quantity, 0);
  };

  return {
    // Business operations for cart summary
    getSelectedItems,
    getSelectedTotalPrice,
    hasSelectedItems,
    getSelectedItemsCount,

    // Direct store access for summary
    selectedItems,
    hasHydrated,
  };
};
