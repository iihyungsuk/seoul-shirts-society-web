import { queryOptions, useQuery } from "@tanstack/react-query";

import { createQueryKeys } from "@/shared/lib";

import { type Product } from "../model/types";

// Mock data for products
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic White Tee",
    price: 35000,
    description:
      "A timeless white t-shirt made from 100% organic cotton. Perfect for any casual occasion.",
    image: "/images/products/product-1.png",
    category: "basic",
    sizes: ["S", "M", "L", "XL"],
    colors: ["white"],
  },
  {
    id: "2",
    name: "Minimalist Logo Tee",
    price: 42000,
    description:
      "Subtle branding with our minimalist logo. Made from premium cotton blend for ultimate comfort.",
    image: "/images/products/product-2.png",
    category: "logo",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "white"],
  },
  {
    id: "3",
    name: "Vintage Seoul Tee",
    price: 48000,
    description:
      "Retro-inspired design celebrating Seoul's rich culture. Soft, breathable fabric for all-day comfort.",
    image: "/images/products/product-3.png",
    category: "vintage",
    sizes: ["S", "M", "L", "XL"],
    colors: ["navy", "gray"],
  },
  {
    id: "4",
    name: "Urban Street Tee",
    price: 39000,
    description:
      "Bold street-style design perfect for the modern urbanite. Premium quality cotton construction.",
    image: "/images/products/product-4.png",
    category: "street",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "red"],
  },
  {
    id: "5",
    name: "Seoul Skyline Tee",
    price: 45000,
    description:
      "Beautiful skyline silhouette showcasing Seoul's iconic landmarks. Comfortable and stylish.",
    image: "/images/products/product-5.png",
    category: "skyline",
    sizes: ["S", "M", "L", "XL"],
    colors: ["blue", "gray"],
  },
  {
    id: "6",
    name: "K-Culture Heritage Tee",
    price: 52000,
    description:
      "Celebrate Korean heritage with this artistic design. Premium fabric with cultural significance.",
    image: "/images/products/product-6.png",
    category: "culture",
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "black"],
  },
];

// API functions
const getProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockProducts;
};

const getProduct = async (id: string): Promise<Product | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  const product = mockProducts.find((p) => p.id === id);
  return product || null;
};

const getProductsByCategory = async (category: string): Promise<Product[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockProducts.filter((p) => p.category === category);
};

// Query keys factory
const productKeys = createQueryKeys("products");

// Product queries using queryOptions for better type safety
export const productQueries = {
  // Get all products
  list: (filters?: { category?: string; search?: string }) =>
    queryOptions({
      queryKey: productKeys.list(filters),
      queryFn: () => getProducts(),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    }),

  // Get single product by ID
  detail: (id: string) =>
    queryOptions({
      queryKey: productKeys.detail(id),
      queryFn: () => getProduct(id),
      enabled: !!id,
      staleTime: 10 * 60 * 1000, // 10 minutes
      gcTime: 15 * 60 * 1000, // 15 minutes
    }),

  // Get products by category
  byCategory: (category: string) =>
    queryOptions({
      queryKey: productKeys.byCategory(category),
      queryFn: () => getProductsByCategory(category),
      enabled: !!category,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    }),

  // Export keys for invalidation purposes
  keys: productKeys,
} as const;

// Custom hooks - Abstract implementation details and provide clean API
export const useProducts = (filters?: {
  category?: string;
  search?: string;
}) => {
  return useQuery(productQueries.list(filters));
};

export const useProduct = (id: string) => {
  return useQuery(productQueries.detail(id));
};

export const useProductsByCategory = (category: string) => {
  return useQuery(productQueries.byCategory(category));
};
