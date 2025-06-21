"use client";

import Image from "next/image";

import { type Product, useProduct } from "@/entities/product";
import { ProductSelectionForm } from "@/features/product-selection";
import { NotFoundMessage } from "@/shared/ui/loading-states";

interface ProductPageProps {
  productId: string;
}

export const ProductPage = ({ productId }: ProductPageProps) => {
  const {
    data: product,
    isLoading,
    error,
    isError,
    isFetching,
  } = useProduct(productId);

  if (isLoading || (isFetching && !product)) {
    return <ProductPageSkeleton />;
  }

  if (isError) {
    return (
      <NotFoundMessage
        title="Product Not Found"
        message={
          error instanceof Error
            ? error.message
            : "The product you're looking for doesn't exist."
        }
      />
    );
  }

  if (!product) {
    return (
      <NotFoundMessage
        title="Product Not Found"
        message="The product you're looking for doesn't exist."
      />
    );
  }

  return <ProductPageContent product={product} />;
};

const ProductPageSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Image skeleton */}
      <div className="aspect-square w-full animate-pulse rounded-lg bg-neutral-200" />

      {/* Content skeleton */}
      <div className="space-y-4">
        <div className="h-8 w-3/4 animate-pulse rounded bg-neutral-200" />
        <div className="h-6 w-1/2 animate-pulse rounded bg-neutral-200" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-neutral-200" />
        </div>
      </div>
    </div>
  </div>
);

interface ProductPageContentProps {
  product: Product;
}

const ProductPageContent = ({ product }: ProductPageContentProps) => (
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <ProductImage product={product} />
      <div className="flex flex-col justify-center space-y-6">
        <ProductInfo product={product} />
        <ProductSelectionForm product={product} />
      </div>
    </div>
  </div>
);

const ProductImage = ({ product }: { product: Product }) => (
  <div className="aspect-square w-full overflow-hidden rounded-lg bg-neutral-100">
    <Image
      src={product.image}
      alt={product.name}
      width={600}
      height={600}
      className="h-full w-full object-cover object-center p-8"
      priority
    />
  </div>
);

const ProductInfo = ({ product }: { product: Product }) => (
  <div>
    <h1 className="text-3xl font-light text-neutral-900 lg:text-4xl">
      {product.name}
    </h1>
    <p className="mt-2 text-2xl text-neutral-700">
      ₩{Math.round(product.price).toLocaleString()}
    </p>
    <p className="mt-4 text-lg leading-relaxed text-neutral-600">
      {product.description}
    </p>
  </div>
);
