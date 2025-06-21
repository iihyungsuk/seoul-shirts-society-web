import { ProductPage } from "@/pages/product";

export default async function ProductRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Next.js 15: params is a promise-like object, so await it first
  const { id } = await params;

  return <ProductPage productId={id} />;
}
