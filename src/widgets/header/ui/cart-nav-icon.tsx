import Link from "next/link";

import { CartIconSvg } from "@/entities/cart";

export interface CartNavIconProps {
  cartCount: number;
  className?: string;
}

/**
 * Cart navigation icon for header
 * Pure component that receives cart count as prop
 */
export const CartNavIcon = ({
  cartCount,
  className = "",
}: CartNavIconProps) => (
  <Link href="/cart" className={`relative ${className}`}>
    <CartIconSvg />
    {cartCount > 0 && <CartBadge count={cartCount} />}
  </Link>
);

// Internal badge component for cart count display
interface CartBadgeProps {
  count: number;
}

const CartBadge = ({ count }: CartBadgeProps) => (
  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-xs text-white">
    {count}
  </span>
);
