import { type ReactNode } from "react";

import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

interface LayoutProps {
  children: ReactNode;
  cartCount: number;
}

/**
 * Pure Layout widget component
 * Receives all data via props following FSD principles
 */
export const Layout = ({ children, cartCount }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header cartCount={cartCount} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
