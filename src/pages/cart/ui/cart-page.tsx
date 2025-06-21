"use client";

import { useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { CartIconSvg } from "@/entities/cart";
import {
  CartItemList,
  CartSummary,
  useCartItemOperations,
  useCartSummaryOperations,
} from "@/features/cart-management";

export const CartPage = () => {
  const router = useRouter();
  const { getSortedItems, hasHydrated, setHasHydrated, initializeSelections } =
    useCartItemOperations();
  const { hasSelectedItems } = useCartSummaryOperations();

  // Initialize selections on mount
  useEffect(() => {
    initializeSelections();
  }, [initializeSelections]);

  // Ensure hydration is complete
  useEffect(() => {
    if (!hasHydrated) {
      setHasHydrated(true);
    }
  }, [hasHydrated, setHasHydrated]);

  if (!hasHydrated) {
    return <CartPageSkeleton />;
  }

  const sortedItems = getSortedItems();

  if (sortedItems.length === 0) {
    return <EmptyCartState />;
  }

  const handleCheckout = () => {
    if (!hasSelectedItems()) {
      alert("결제할 상품을 선택해주세요.");
      return;
    }
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CartItemList />
          </div>
          <CartSummary onCheckout={handleCheckout} />
        </div>
      </div>
    </div>
  );
};

// Loading skeleton for cart page
const CartPageSkeleton = () => (
  <div className="min-h-screen bg-neutral-50 p-8">
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
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
        {/* Order Summary Skeleton */}
        <div className="h-fit rounded-lg bg-white p-6 shadow-sm">
          <div className="h-6 w-24 animate-pulse rounded bg-neutral-200" />
          <div className="mt-4 space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200" />
            <div className="h-10 w-full animate-pulse rounded bg-neutral-200" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Local empty state component - only used in cart page
const EmptyCartState = () => (
  <div className="min-h-screen bg-neutral-50 p-8">
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col items-center justify-center space-y-6 rounded-lg bg-white p-12 text-center shadow-sm">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100">
          <CartIconSvg className="text-neutral-500" />
        </div>
        <h2 className="text-xl font-light text-neutral-700">
          Your cart is empty
        </h2>
        <p className="text-neutral-600">
          Add some products to your cart to continue shopping
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-8 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-400"
        >
          Back to Home
        </Link>
      </div>
    </div>
  </div>
);
