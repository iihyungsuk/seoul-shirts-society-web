import { ProductPage } from "@/pages/product";
import { Layout } from "@/widgets/layout";

// 페이지 컴포넌트를 async로 만들어 params를 올바르게 처리
export default async function ProductRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Next.js 15: params is a promise-like object, so await it first
  const { id } = await params;

  return (
    <Layout>
      {/* Pass the resolved id to client component */}
      <ProductPage productId={id} />
    </Layout>
  );
}
