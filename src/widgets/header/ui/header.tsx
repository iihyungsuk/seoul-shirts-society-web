import Link from "next/link";

import { CartNavIcon } from "./cart-nav-icon";

export interface HeaderProps {
  cartCount: number;
}

/**
 * Pure Header widget component
 * Receives data via props following FSD principles
 */
export const Header = ({ cartCount }: HeaderProps) => {
  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo />
          <CartNavIcon cartCount={cartCount} />
        </div>
      </header>
      <HeaderSpacer />
    </>
  );
};

// Extracted logo component for better readability
const Logo = () => (
  <Link href="/" className="text-xl font-light text-neutral-900">
    Seoul Shirts Society
  </Link>
);

// Header spacer component to maintain layout
const HeaderSpacer = () => <div className="h-16"></div>;
