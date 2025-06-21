import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  createCartItem,
  createCartItemId,
  findExistingCartItem,
  validateCartItem,
} from "../lib/cart-utils";
import type { CartItem, CartState } from "./types";

interface CartStore extends CartState {
  // Pure State Actions
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number,
  ) => void;
  clearCart: () => void;

  // Selection Actions
  toggleItemSelection: (productId: string, size: string, color: string) => void;
  selectAllItems: (itemIds: string[]) => void;
  deselectAllItems: () => void;

  // Hydration Actions
  setHasHydrated: (hydrated: boolean) => void;
  setInitialized: (initialized: boolean) => void;

  // Computed Values
  getTotalCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial State
      items: [],
      selectedItems: new Set<string>(),
      isInitialized: false,
      hasHydrated: false,

      // Pure State Actions
      addItem: (item) => {
        if (!validateCartItem(item)) {
          console.warn("Invalid cart item:", item);
          return;
        }

        set((state) => {
          const existingItem = findExistingCartItem(
            state.items,
            item.product.id,
            item.size,
            item.color,
          );

          if (existingItem) {
            // Update quantity and timestamp for existing item
            const updatedItems = state.items.map((stateItem) =>
              stateItem === existingItem
                ? {
                    ...existingItem,
                    quantity: existingItem.quantity + item.quantity,
                    addedDate: new Date(), // Update timestamp
                  }
                : stateItem,
            );
            return { items: updatedItems };
          }

          // Add new item with current timestamp and automatically select it
          const newItem = createCartItem(
            item.product,
            item.size,
            item.color,
            item.quantity,
          );
          const newItems = [...state.items, newItem];
          const itemId = createCartItemId(
            item.product.id,
            item.size,
            item.color,
          );
          const newSelectedItems = new Set(state.selectedItems);
          newSelectedItems.add(itemId);

          return {
            items: newItems,
            selectedItems: newSelectedItems,
          };
        });
      },

      removeItem: (productId, size, color) =>
        set((state) => {
          const itemId = createCartItemId(productId, size, color);
          const newSelectedItems = new Set(state.selectedItems);
          newSelectedItems.delete(itemId);

          return {
            items: state.items.filter(
              (item) =>
                !(
                  item.product.id === productId &&
                  item.size === size &&
                  item.color === color
                ),
            ),
            selectedItems: newSelectedItems,
          };
        }),

      updateQuantity: (productId, size, color, quantity) => {
        if (quantity < 1) {
          console.warn("Quantity must be at least 1");
          return;
        }

        set((state) => {
          const existingItem = findExistingCartItem(
            state.items,
            productId,
            size,
            color,
          );

          if (!existingItem) {
            console.warn("Item not found in cart");
            return state;
          }

          const updatedItems = state.items.map((stateItem) =>
            stateItem === existingItem
              ? { ...existingItem, quantity }
              : stateItem,
          );

          return { items: updatedItems };
        });
      },

      clearCart: () =>
        set({ items: [], selectedItems: new Set(), isInitialized: true }),

      // Selection Actions
      toggleItemSelection: (productId, size, color) =>
        set((state) => {
          const itemId = createCartItemId(productId, size, color);
          const newSelectedItems = new Set(state.selectedItems);

          if (newSelectedItems.has(itemId)) {
            newSelectedItems.delete(itemId);
          } else {
            newSelectedItems.add(itemId);
          }

          return { selectedItems: newSelectedItems };
        }),

      selectAllItems: (itemIds: string[]) =>
        set({ selectedItems: new Set(itemIds) }),

      deselectAllItems: () => set({ selectedItems: new Set() }),

      // Hydration Actions
      setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),

      setInitialized: (initialized) => set({ isInitialized: initialized }),

      // Computed Values
      getTotalCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
        selectedItems: Array.from(state.selectedItems),
        isInitialized: state.isInitialized,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (Array.isArray(state.selectedItems)) {
            state.selectedItems = new Set(state.selectedItems);
          }
          if (state.items) {
            state.items = state.items.map((item) => ({
              ...item,
              addedDate: new Date(item.addedDate),
            }));
          }
          if (!state.isInitialized && state.items && state.items.length > 0) {
            const allItemIds = state.items.map((item) =>
              createCartItemId(item.product.id, item.size, item.color),
            );
            state.selectedItems = new Set(allItemIds);
            state.isInitialized = true;
          }
          state.hasHydrated = true;
        }
        return state;
      },
    },
  ),
);
