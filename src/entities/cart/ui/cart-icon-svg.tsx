import { cn } from "@/shared/lib";

export interface CartIconSvgProps {
  className?: string;
}

/**
 * Pure SVG representation of a cart icon
 * Entity-level UI component for Cart visual representation
 */
export const CartIconSvg = ({ className = "" }: CartIconSvgProps) => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    className={cn("text-neutral-900", className)}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
);
