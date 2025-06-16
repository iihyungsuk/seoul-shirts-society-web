import { type Product } from "../model/types";

// Mock data for products
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic White Tee",
    price: 29.99,
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
    price: 34.99,
    description:
      "Subtle branding with our minimalist logo. Made from premium cotton blend for ultimate comfort.",
    image: "/images/products/product-2.png",
    category: "logo",
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "black"],
  },
  {
    id: "3",
    name: "Graphic Print Tee",
    price: 39.99,
    description:
      "Express yourself with our unique graphic print design. Limited edition artwork.",
    image: "/images/products/product-3.png",
    category: "graphic",
    sizes: ["S", "M", "L"],
    colors: ["white"],
  },
  {
    id: "4",
    name: "Oversized Fit Tee",
    price: 44.99,
    description:
      "Contemporary oversized fit for a relaxed, modern look. Drop shoulders and extended length.",
    image: "/images/products/product-4.png",
    category: "oversized",
    sizes: ["M", "L", "XL"],
    colors: ["white", "cream"],
  },
  {
    id: "5",
    name: "Embroidered Detail Tee",
    price: 49.99,
    description:
      "Subtle hand-embroidered details elevate this premium tee. Each piece is slightly unique.",
    image: "/images/products/product-5.png",
    category: "premium",
    sizes: ["S", "M", "L"],
    colors: ["white"],
  },
  {
    id: "6",
    name: "Eco-Friendly Tee",
    price: 39.99,
    description:
      "Made from recycled materials and organic cotton. Sustainability never looked so good.",
    image: "/images/products/product-6.png",
    category: "eco",
    sizes: ["S", "M", "L", "XL"],
    colors: ["white", "natural"],
  },
];

// Simulate API fetch delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Product queries
export const productQueries = {
  list: () => ({
    queryKey: ["products"],
    queryFn: async () => {
      await delay(500); // Simulate network delay
      return mockProducts;
    },
  }),

  detail: (id: string) => ({
    queryKey: ["products", id],
    queryFn: async () => {
      await delay(300); // Simulate network delay
      const product = mockProducts.find((p) => p.id === id);

      if (!product) {
        throw new Error(`Product with id ${id} not found`);
      }

      return product;
    },
  }),

  byCategory: (category: string) => ({
    queryKey: ["products", "category", category],
    queryFn: async () => {
      await delay(500);
      return mockProducts.filter((p) => p.category === category);
    },
  }),
};
