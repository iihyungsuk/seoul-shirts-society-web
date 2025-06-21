"use client";

import { Suspense } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/shared/ui/button";

function CheckoutFailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const errorCode = searchParams?.get("code") || "UNKNOWN_ERROR";
  const errorMessage =
    searchParams?.get("message") || "알 수 없는 오류가 발생했습니다.";
  const orderId = searchParams?.get("orderId");

  const getErrorDescription = (code: string) => {
    switch (code) {
      case "PAY_PROCESS_CANCELED":
        return "사용자가 결제를 취소하였습니다.";
      case "PAY_PROCESS_ABORTED":
        return "결제 진행 중 오류가 발생하여 결제가 중단되었습니다.";
      case "CARD_COMPANY_ERROR":
        return "카드사에서 승인을 거절하였습니다. 다른 카드를 사용해 보세요.";
      case "INVALID_CARD_COMPANY":
        return "유효하지 않은 카드 정보입니다.";
      case "NOT_SUPPORTED_INSTALLMENT":
        return "지원하지 않는 할부 개월 수입니다.";
      case "EXCEED_MAX_DAILY_PAYMENT_COUNT":
        return "일일 결제 한도를 초과하였습니다.";
      case "NOT_AVAILABLE_BANK":
        return "해당 은행은 현재 서비스를 이용할 수 없습니다.";
      default:
        return "결제 처리 중 문제가 발생했습니다. 다시 시도해 주세요.";
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center justify-center space-y-6 rounded-lg bg-white p-12 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-light text-neutral-900">
              결제가 실패하였습니다
            </h2>
            <p className="text-neutral-600">{getErrorDescription(errorCode)}</p>
          </div>

          <div className="w-full max-w-md space-y-3 rounded-lg bg-neutral-50 p-4 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">오류 코드</span>
              <span className="font-medium text-red-600">{errorCode}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">오류 메시지</span>
              <span className="font-medium text-red-600">{errorMessage}</span>
            </div>
            {orderId && (
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">주문번호</span>
                <span className="font-medium">{orderId}</span>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => router.push("/cart")}>
              장바구니로 돌아가기
            </Button>
            <Button onClick={() => router.push("/checkout")}>
              다시 결제하기
            </Button>
          </div>

          <div className="pt-4 text-sm text-neutral-500">
            문제가 지속되면 고객센터로 문의해 주세요.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutFailPage() {
  return (
    <Suspense fallback={<CheckoutFailLoading />}>
      <CheckoutFailContent />
    </Suspense>
  );
}

function CheckoutFailLoading() {
  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center justify-center space-y-6 rounded-lg bg-white p-12 text-center shadow-sm">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900"></div>
          <h2 className="text-xl font-light text-neutral-700">로딩 중...</h2>
        </div>
      </div>
    </div>
  );
}
