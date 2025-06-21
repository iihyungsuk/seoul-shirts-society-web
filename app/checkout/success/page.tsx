"use client";

import { Suspense, useEffect, useState } from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useCartStore } from "@/entities/cart";
import { Button } from "@/shared/ui/button";

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCartStore();

  const [isConfirming, setIsConfirming] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<{
    orderId: string;
    method: string;
    totalAmount: number;
    orderName: string;
  } | null>(null);

  useEffect(() => {
    const confirmPayment = async () => {
      if (!searchParams) {
        setError("결제 정보를 불러올 수 없습니다.");
        setIsConfirming(false);
        return;
      }

      const paymentKey = searchParams.get("paymentKey");
      const orderId = searchParams.get("orderId");
      const amount = searchParams.get("amount");

      if (!paymentKey || !orderId || !amount) {
        setError("결제 정보가 올바르지 않습니다.");
        setIsConfirming(false);
        return;
      }

      try {
        const response = await fetch("/api/payments/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: parseInt(amount),
          }),
        });

        if (!response.ok) {
          throw new Error("결제 승인에 실패했습니다.");
        }

        const data = await response.json();

        if (data.success) {
          setPaymentInfo(data.payment);
          // 결제 성공 시 장바구니 비우기
          clearCart();
        } else {
          throw new Error(data.error || "결제 승인에 실패했습니다.");
        }
      } catch (error) {
        console.error("Payment confirmation error:", error);
        setError(
          error instanceof Error
            ? error.message
            : "결제 승인 중 오류가 발생했습니다.",
        );
      } finally {
        setIsConfirming(false);
      }
    };

    confirmPayment();
  }, [searchParams, clearCart]);

  if (isConfirming) {
    return (
      <div className="min-h-screen bg-neutral-50 p-8">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col items-center justify-center space-y-6 rounded-lg bg-white p-12 text-center shadow-sm">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900"></div>
            <h2 className="text-xl font-light text-neutral-700">
              결제를 확인하는 중입니다...
            </h2>
            <p className="text-neutral-600">잠시만 기다려주세요.</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
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
            <h2 className="text-xl font-light text-neutral-700">
              결제 승인 실패
            </h2>
            <p className="text-neutral-600">{error}</p>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => router.push("/cart")}>
                장바구니로 돌아가기
              </Button>
              <Button onClick={() => router.push("/")}>홈으로 가기</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center justify-center space-y-6 rounded-lg bg-white p-12 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-light text-neutral-900">
              주문이 완료되었습니다!
            </h2>
            <p className="text-neutral-600">주문해 주셔서 감사합니다.</p>
          </div>

          {paymentInfo && (
            <div className="w-full max-w-md space-y-3 rounded-lg bg-neutral-50 p-4 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">주문번호</span>
                <span className="font-medium">{paymentInfo.orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">결제수단</span>
                <span className="font-medium">{paymentInfo.method}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">결제금액</span>
                <span className="font-medium">
                  {paymentInfo.totalAmount?.toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">주문상품</span>
                <span className="font-medium">{paymentInfo.orderName}</span>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Link href="/">
              <Button variant="outline">쇼핑 계속하기</Button>
            </Link>
            <Link href="/">
              <Button>홈으로 가기</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<CheckoutSuccessLoading />}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}

function CheckoutSuccessLoading() {
  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center justify-center space-y-6 rounded-lg bg-white p-12 text-center shadow-sm">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900"></div>
          <h2 className="text-xl font-light text-neutral-700">
            결제를 확인하는 중입니다...
          </h2>
          <p className="text-neutral-600">잠시만 기다려주세요.</p>
        </div>
      </div>
    </div>
  );
}
