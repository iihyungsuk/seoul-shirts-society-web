import { type CartItem, createCartItemId, useCartStore } from "@/entities/cart";

/**
 * Cart Item Management Business Logic Hook
 * Handles cart item list operations for cart-widget
 */
export const useCartItemOperations = () => {
  const {
    items,
    selectedItems,
    isInitialized,
    hasHydrated,
    removeItem,
    updateQuantity,
    toggleItemSelection,
    selectAllItems,
    deselectAllItems,
    setInitialized,
    setHasHydrated,
  } = useCartStore();

  const getSortedItems = (): CartItem[] => {
    return [...items].sort((a, b) => {
      return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
    });
  };

  const isAllSelected = (): boolean => {
    return items.length > 0 && items.length === selectedItems.size;
  };

  const initializeSelections = (): void => {
    if (!isInitialized && items.length > 0) {
      const allItemIds = items.map((item: CartItem) =>
        createCartItemId(item.product.id, item.size, item.color),
      );
      selectAllItems(allItemIds);
      setInitialized(true);
    }
  };

  const isItemSelected = (cartItem: CartItem): boolean => {
    const itemId = createCartItemId(
      cartItem.product.id,
      cartItem.size,
      cartItem.color,
    );
    return selectedItems.has(itemId);
  };

  return {
    getSortedItems,
    isAllSelected,
    isItemSelected,
    initializeSelections,
    hasHydrated,
    setHasHydrated,
    removeItem,
    updateQuantity,
    toggleItemSelection,
    selectAllItems: () => {
      const allItemIds = items.map((item: CartItem) =>
        createCartItemId(item.product.id, item.size, item.color),
      );
      selectAllItems(allItemIds);
    },
    deselectAllItems,
  };
};
