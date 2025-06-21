"use client";

import { type ReactNode } from "react";

import { useCartStore } from "@/entities/cart";
import { Layout } from "@/widgets/layout";

interface LayoutProviderProps {
  children: ReactNode;
}

/**
 * Layout Provider that handles global layout data
 * Provides cart data to Layout widget following FSD principles
 */
export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const { getTotalCount, hasHydrated } = useCartStore();

  // Show layout with 0 count until hydration is complete
  const cartCount = hasHydrated ? getTotalCount() : 0;

  return <Layout cartCount={cartCount}>{children}</Layout>;
};
