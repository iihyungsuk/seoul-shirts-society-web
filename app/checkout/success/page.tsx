import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { Layout } from "@/widgets/layout";

export default function OrderSuccessPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-neutral-50 p-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center space-y-6 rounded-lg bg-white p-12 text-center shadow-sm">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-neutral-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-light text-neutral-900 md:text-3xl">
              주문이 완료되었습니다
            </h1>
            <p className="max-w-md text-neutral-600">
              주문해주셔서 감사합니다. 주문 확인 이메일이 곧 발송될 예정입니다.
              주문과 관련하여 문의사항이 있으시면 고객센터로 연락해주세요.
            </p>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
              <Link href="/">
                <Button className="px-8 py-3">쇼핑 계속하기</Button>
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-8 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-400"
              >
                주문 내역 보기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
