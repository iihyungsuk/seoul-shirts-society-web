"use client";

import { type CartItem, CartItemCard, createCartItemId } from "@/entities/cart";

import { useCartItemOperations } from "../model/hooks/use-cart-item-operations";

export interface CartItemListProps {
  className?: string;
}

export const CartItemList = ({ className }: CartItemListProps) => {
  const {
    getSortedItems,
    isAllSelected,
    isItemSelected,
    hasHydrated,
    toggleItemSelection,
    updateQuantity,
    removeItem,
    selectAllItems,
    deselectAllItems,
  } = useCartItemOperations();

  if (!hasHydrated) {
    return <CartItemListSkeleton />;
  }

  const sortedItems = getSortedItems();

  if (sortedItems.length === 0) {
    return <EmptyCartMessage />;
  }

  return (
    <div className={`space-y-4 ${className || ""}`}>
      {/* Select All Header */}
      <SelectAllHeader
        isAllSelected={isAllSelected()}
        onSelectAll={selectAllItems}
        onDeselectAll={deselectAllItems}
      />

      {/* Cart Items */}
      {sortedItems.map((item, index) => (
        <CartItemCard
          key={createCartItemKey(item)}
          item={item}
          isSelected={isItemSelected(item)}
          isFirstItem={index === 0}
          onToggleSelection={() =>
            toggleItemSelection(item.product.id, item.size, item.color)
          }
          onQuantityChange={(quantity: number) =>
            updateQuantity(item.product.id, item.size, item.color, quantity)
          }
          onRemove={() => removeItem(item.product.id, item.size, item.color)}
        />
      ))}
    </div>
  );
};

// Select All Header Component
interface SelectAllHeaderProps {
  isAllSelected: boolean;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

const SelectAllHeader = ({
  isAllSelected,
  onSelectAll,
  onDeselectAll,
}: SelectAllHeaderProps) => (
  <div className="rounded-lg bg-white p-4 shadow-sm">
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        checked={isAllSelected}
        onChange={isAllSelected ? onDeselectAll : onSelectAll}
        className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-500"
      />
      <span className="text-sm font-medium text-neutral-900">All</span>
    </label>
  </div>
);

// Empty cart message component
const EmptyCartMessage = () => (
  <div className="rounded-lg bg-white p-8 text-center shadow-sm">
    <p className="text-neutral-500">장바구니가 비어있습니다</p>
  </div>
);

// Loading skeleton
const CartItemListSkeleton = () => (
  <div className="space-y-4">
    {/* Select All Skeleton */}
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="h-4 w-16 animate-pulse rounded bg-neutral-200" />
    </div>
    {/* Cart Items Skeleton */}
    {[1, 2, 3].map((i) => (
      <div key={i} className="rounded-lg bg-white p-4 shadow-sm">
        <div className="flex gap-4">
          <div className="h-24 w-24 animate-pulse rounded-lg bg-neutral-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-200" />
            <div className="h-4 w-1/4 animate-pulse rounded bg-neutral-200" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const createCartItemKey = (item: CartItem): string =>
  createCartItemId(item.product.id, item.size, item.color);
