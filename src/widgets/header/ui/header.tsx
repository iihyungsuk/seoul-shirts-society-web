"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useCartStore } from "@/features/cart";

export const Header = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only showing dynamic data after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="text-xl font-light text-neutral-900">
            Seoul Shirts Society
          </Link>

          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="text-neutral-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {mounted && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-xs text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </header>
      <div className="h-16"></div>
    </>
  );
};
