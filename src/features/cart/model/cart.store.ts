import { create } from "zustand";
import { persist } from "zustand/middleware";

import { type Product } from "@/entities/product";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number,
  ) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) =>
              i.product.id === item.product.id &&
              i.size === item.size &&
              i.color === item.color,
          );

          if (existingItemIndex !== -1) {
            // Update quantity if item already exists
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += item.quantity;
            return { items: updatedItems };
          }

          // Add new item
          return { items: [...state.items, item] };
        }),

      removeItem: (productId, size, color) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.size === size &&
                item.color === color
              ),
          ),
        })),

      updateQuantity: (productId, size, color, quantity) =>
        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (
              item.product.id === productId &&
              item.size === size &&
              item.color === color
            ) {
              return { ...item, quantity };
            }
            return item;
          });

          return { items: updatedItems };
        }),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
