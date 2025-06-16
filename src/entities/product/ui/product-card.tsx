import Image from "next/image";
import Link from "next/link";

import { type Product } from "../model/types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block h-full max-h-full w-full rounded-lg bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative flex aspect-square h-full w-full flex-col gap-2">
        {/* Product Image */}
        <div className="relative flex-1 bg-neutral-50">
          <div className="relative h-full w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-2 transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex min-h-0 flex-shrink-0 flex-col justify-center px-3 py-1">
          <div className="relative overflow-hidden">
            <h3
              className="group-hover:animate-marquee truncate text-xs font-medium text-neutral-900 group-hover:whitespace-nowrap"
              title={product.name}
            >
              {product.name}
            </h3>
          </div>
          <p className="text-xs text-neutral-600">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};
