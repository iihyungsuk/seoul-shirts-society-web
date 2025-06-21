"use client";

import { type Product, useProducts } from "@/entities/product";
import { ProductCard } from "@/entities/product/ui";

export const ProductGrid = () => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useProducts();

  if (isError) {
    return <ProductGridError error={error} />;
  }

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  return <ProductGridContent products={products} isFetching={isFetching} />;
};

const ProductGridError = ({ error }: { error: Error | null }) => (
  <div className="mt-16 w-full px-8 md:mt-20">
    <div className="text-center">
      <h2 className="text-lg font-medium text-neutral-900">
        Failed to load products
      </h2>
      <p className="mt-2 text-sm text-neutral-600">
        {error instanceof Error ? error.message : "Please try again later"}
      </p>
    </div>
  </div>
);

const ProductGridSkeleton = () => (
  <div className="mt-16 w-full px-8 md:mt-20">
    <div className="flex flex-wrap gap-3 md:gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square w-[calc(50%-6px)] animate-pulse rounded-lg bg-neutral-200 md:w-[calc(33.333%-11px)]"
        />
      ))}
    </div>
  </div>
);

interface ProductGridContentProps {
  products: Product[];
  isFetching?: boolean;
}

const ProductGridContent = ({
  products,
  isFetching,
}: ProductGridContentProps) => (
  <div className="mt-16 w-full px-8 md:mt-20">
    <div className="space-y-4">
      {/* Abstract refetch indicator logic */}
      <RefetchIndicator isFetching={isFetching} />

      {/* Abstract product list rendering */}
      <ProductList products={products} />
    </div>
  </div>
);

// Abstract implementation detail: Refetch feedback
const RefetchIndicator = ({ isFetching }: { isFetching?: boolean }) => {
  if (!isFetching) return null;

  return (
    <div className="text-center">
      <span className="text-sm text-neutral-600">Updating products...</span>
    </div>
  );
};

// Abstract implementation detail: Product list rendering
const ProductList = ({ products }: { products: Product[] }) => (
  <div className="flex flex-wrap gap-3 md:gap-4">
    {products.map((product, index) => (
      <div
        key={product.id}
        className="w-[calc(50%-6px)] md:w-[calc(33.333%-11px)]"
      >
        <ProductCard product={product} priority={index < 4} />
      </div>
    ))}
  </div>
);
