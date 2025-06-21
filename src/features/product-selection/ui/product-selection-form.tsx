import { useState } from "react";

import { createCartItem, useCartStore } from "@/entities/cart";
import { Product } from "@/entities/product";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/button";

export interface ProductSelectionFormProps {
  product: Product;
  onAddToCartSuccess?: () => void;
}

export const ProductSelectionForm = ({
  product,
  onAddToCartSuccess,
}: ProductSelectionFormProps) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(createCartItem(product, selectedSize, selectedColor, quantity));

    // Reset form state
    setQuantity(1);

    // Notify parent component
    onAddToCartSuccess?.();
  };

  const canAddToCart = selectedSize && selectedColor;

  return (
    <div className="flex flex-col justify-center space-y-6">
      <SizeSelector
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
      />
      <ColorSelector
        colors={product.colors}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
      <AddToCartButton onAddToCart={handleAddToCart} disabled={!canAddToCart} />
    </div>
  );
};

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

const SizeSelector = ({
  sizes,
  selectedSize,
  onSizeChange,
}: SizeSelectorProps) => (
  <div>
    <h3 className="mb-3 text-sm font-medium tracking-wide text-neutral-900 uppercase">
      Size
    </h3>
    <div className="grid grid-cols-4 gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onSizeChange(size)}
          className={cn(
            "border py-2 text-sm font-medium transition-colors",
            selectedSize === size
              ? "border-neutral-900 bg-neutral-900 text-white"
              : "border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400",
          )}
        >
          {size}
        </button>
      ))}
    </div>
  </div>
);

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const ColorSelector = ({
  colors,
  selectedColor,
  onColorChange,
}: ColorSelectorProps) => (
  <div>
    <h3 className="mb-3 text-sm font-medium tracking-wide text-neutral-900 uppercase">
      Color
    </h3>
    <div className="flex gap-2">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onColorChange(color)}
          className={cn(
            "rounded-full border-2 px-4 py-2 text-sm font-medium capitalize transition-colors",
            selectedColor === color
              ? "border-neutral-900 bg-neutral-900 text-white"
              : "border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400",
          )}
        >
          {color}
        </button>
      ))}
    </div>
  </div>
);

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

const QuantitySelector = ({
  quantity,
  onQuantityChange,
}: QuantitySelectorProps) => (
  <div>
    <h3 className="mb-3 text-sm font-medium tracking-wide text-neutral-900 uppercase">
      Quantity
    </h3>
    <div className="flex items-center gap-4">
      <button
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
        className="flex h-10 w-10 items-center justify-center border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400"
      >
        −
      </button>
      <span className="text-lg font-medium">{quantity}</span>
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        className="flex h-10 w-10 items-center justify-center border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400"
      >
        +
      </button>
    </div>
  </div>
);

interface AddToCartButtonProps {
  onAddToCart: () => void;
  disabled: boolean;
}

const AddToCartButton = ({ onAddToCart, disabled }: AddToCartButtonProps) => (
  <Button
    onClick={onAddToCart}
    disabled={disabled}
    className="w-full py-4 text-lg"
  >
    Add to Cart
  </Button>
);
