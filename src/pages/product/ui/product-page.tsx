"use client";

import { useState } from "react";

import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import { productQueries } from "@/entities/product";
import { useCartStore } from "@/features/cart";
import { Button } from "@/shared/ui/button";

interface ProductPageProps {
  productId: string;
}

export const ProductPage = ({ productId }: ProductPageProps) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery(
    productQueries.detail(productId),
  );
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!product || !selectedSize || !selectedColor) return;

    addItem({
      product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });

    // Reset selections
    setQuantity(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 p-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="aspect-square animate-pulse rounded-lg bg-neutral-200" />
            <div className="space-y-4">
              <div className="h-8 animate-pulse rounded bg-neutral-200" />
              <div className="h-6 animate-pulse rounded bg-neutral-200" />
              <div className="h-32 animate-pulse rounded bg-neutral-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h1 className="text-2xl font-light text-neutral-900">
            Product not found
          </h1>
          <p className="mt-2 text-neutral-600">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-3xl font-light text-neutral-900 lg:text-4xl">
                {product.name}
              </h1>
              <p className="mt-2 text-2xl text-neutral-700">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-lg leading-relaxed text-neutral-600">
              {product.description}
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="mb-3 text-sm font-medium tracking-wide text-neutral-900 uppercase">
                Size
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border py-2 text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="mb-3 text-sm font-medium tracking-wide text-neutral-900 uppercase">
                Color
              </h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-full border-2 px-4 py-2 text-sm font-medium capitalize transition-colors ${
                      selectedColor === color
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="mb-3 text-sm font-medium tracking-wide text-neutral-900 uppercase">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400"
                >
                  −
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
              className="w-full py-4 text-lg"
            >
              Add to Cart
            </Button>

            {(!selectedSize || !selectedColor) && (
              <p className="text-sm text-neutral-500">
                Please select size and color to add to cart
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
