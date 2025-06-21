import Image from "next/image";

import { formatPrice } from "@/entities/product";

import { type CartItem } from "../model/types";

export interface CartItemCardProps {
  item: CartItem;
  isSelected?: boolean;
  isFirstItem?: boolean;
  onToggleSelection?: () => void;
  onQuantityChange?: (quantity: number) => void;
  onRemove?: () => void;
}

export const CartItemCard = ({
  item,
  isSelected = false,
  isFirstItem = false,
  onToggleSelection,
  onQuantityChange,
  onRemove,
}: CartItemCardProps) => {
  const formattedPrice = formatPrice(item.product.price * item.quantity);

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        {/* Product Image */}
        <ProductImage item={item} priority={isFirstItem} />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col">
          {/* Product Info with Checkbox */}
          <ProductInfo
            item={item}
            isSelected={isSelected}
            onToggleSelection={onToggleSelection}
          />

          {/* Price and Quantity */}
          <div className="mt-3 flex items-center justify-between">
            <QuantityControls
              quantity={item.quantity}
              onQuantityChange={onQuantityChange}
            />
            <p className="text-sm font-medium text-neutral-900">
              {formattedPrice}
            </p>
          </div>

          {/* Delete Button */}
          {onRemove && (
            <div className="mt-2 flex justify-end">
              <button
                onClick={onRemove}
                className="text-xs text-neutral-500 hover:text-neutral-900"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Product image component
interface ProductImageProps {
  item: CartItem;
  priority?: boolean;
}

const ProductImage = ({ item, priority = false }: ProductImageProps) => (
  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-50">
    <Image
      src={item.product.image}
      alt={item.product.name}
      fill
      className="object-contain p-1"
      sizes="96px"
      priority={priority}
    />
  </div>
);

// Product info with selection checkbox
interface ProductInfoProps {
  item: CartItem;
  isSelected: boolean;
  onToggleSelection?: () => void;
}

const ProductInfo = ({
  item,
  isSelected,
  onToggleSelection,
}: ProductInfoProps) => (
  <label className="flex cursor-pointer items-start gap-3">
    <input
      type="checkbox"
      checked={isSelected}
      onChange={onToggleSelection}
      className="mt-1 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-500"
    />
    <div className="flex-1">
      <h3 className="text-sm font-medium text-neutral-900">
        {item.product.name}
      </h3>
      <div className="mt-1 text-xs text-neutral-600">
        <span>
          {item.size} | {item.color}
        </span>
      </div>
    </div>
  </label>
);

// Quantity controls component
interface QuantityControlsProps {
  quantity: number;
  onQuantityChange?: (quantity: number) => void;
}

const QuantityControls = ({
  quantity,
  onQuantityChange,
}: QuantityControlsProps) => {
  const handleDecrease = () => {
    const newQuantity = Math.max(1, quantity - 1);
    onQuantityChange?.(newQuantity);
  };

  const handleIncrease = () => {
    onQuantityChange?.(quantity + 1);
  };

  return (
    <div className="flex items-center">
      <QuantityButton onClick={handleDecrease} aria-label="Decrease quantity">
        −
      </QuantityButton>
      <span className="mx-3 text-sm">{quantity}</span>
      <QuantityButton onClick={handleIncrease} aria-label="Increase quantity">
        +
      </QuantityButton>
    </div>
  );
};

// Quantity button component
interface QuantityButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  "aria-label": string;
}

const QuantityButton = ({
  onClick,
  children,
  ...props
}: QuantityButtonProps) => (
  <button
    onClick={onClick}
    className="flex h-8 w-8 items-center justify-center border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400"
    {...props}
  >
    {children}
  </button>
);
