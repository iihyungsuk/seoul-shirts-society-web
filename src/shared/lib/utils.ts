import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to conditionally join classNames and merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 *
 * @param inputs - Class values (strings, objects, arrays, etc.)
 * @returns Merged and deduplicated className string
 *
 * @example
 * cn("px-2 py-1", condition && "bg-blue-500", { "text-white": isActive })
 * cn("px-2", "px-4") // Returns "px-4" (tailwind-merge deduplicates)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
