export type { Product, ProductSelection } from "./model/types";

export { ProductCard, ProductGrid } from "./ui";

export {
  useProducts,
  useProduct,
  useProductsByCategory,
} from "./api/product.queries";

export {
  findProductSelectionIndex,
  validateProductSelection,
  formatPrice,
} from "./lib/product-utils";
