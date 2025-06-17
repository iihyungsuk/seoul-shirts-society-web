"use client";
"use client";

import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import { productQueries } from "@/entities/product";
import { ProductCard } from "@/entities/product/ui";

export const HomePage = () => {
  const { data: products = [], isLoading } = useQuery(productQueries.list());

  return (
    <div className="relative overflow-x-hidden bg-neutral-50">
      {/* T-shirt SVG Background */}
      <div className="relative -ml-[40vw] w-[180vw]">
        <Image
          src="/images/bg-tshirt-long.png"
          alt="T-shirt"
          width={2000}
          height={2000}
          className="h-auto w-full"
          priority
        />
      </div>

      {/* Content positioned on top of the background */}
      <div className="absolute inset-0 flex flex-col items-center">
        {/* Message positioned on t-shirt */}
        <div className="mt-[60%] text-center">
          <h1 className="text-3xl font-bold text-neutral-700 md:text-6xl lg:text-7xl">
            This T-shirt is
            <br />
            Only Available at
            <br />
            Your Current Location
          </h1>
        </div>

        {/* Product grid */}
        <div className="mt-16 w-full px-8 md:mt-20">
          {isLoading ? (
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square w-[calc(50%-8px)] animate-pulse rounded-lg bg-neutral-200 md:w-[calc(33.333%-11px)]"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 md:gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="w-[calc(50%-6px)] md:w-[calc(33.333%-11px)]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
