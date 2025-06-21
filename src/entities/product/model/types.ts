export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
}

// Base interface for product with selected options
// Can be extended by cart, wishlist, order, etc.
export interface ProductSelection {
  product: Product;
  size: string;
  color: string;
}
