"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

import {
  CartSummary,
  useCartSummaryOperations,
} from "@/features/cart-management";
import { type ShippingAddress, useCheckoutStore } from "@/features/checkout";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/button";

const generateRandomString = () =>
  window.btoa(Math.random().toString()).slice(0, 20);

export const CheckoutPage = () => {
  const router = useRouter();
  const cartOps = useCartSummaryOperations();
  const { shippingAddress, setShippingAddress } = useCheckoutStore();

  const [isLoading, setIsLoading] = useState(false);
  const [widgets, setWidgets] = useState<unknown>(null);
  const [isPaymentReady, setIsPaymentReady] = useState(false);
  const paymentMethodRef = useRef<HTMLDivElement>(null);

  const selectedItems = cartOps.getSelectedItems();
  const selectedTotalPrice = cartOps.getSelectedTotalPrice();
  const hasSelectedItems = cartOps.hasSelectedItems();

  // Initialize TossPayments
  useEffect(() => {
    const initializePayments = async () => {
      if (!hasSelectedItems || selectedTotalPrice <= 0) return;

      try {
        const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY;
        if (!clientKey) {
          console.error("TossPayments client key is not configured");
          return;
        }

        const tossPayments = await loadTossPayments(clientKey);
        const widgets = tossPayments.widgets({
          customerKey: "anonymous", // 비회원 결제
        });

        await (
          widgets as unknown as {
            setAmount: (amount: {
              currency: string;
              value: number;
            }) => Promise<void>;
          }
        ).setAmount({
          currency: "KRW",
          value: selectedTotalPrice,
        });

        setWidgets(widgets);
      } catch (error) {
        console.error("Failed to initialize TossPayments:", error);
      }
    };

    initializePayments();
  }, [selectedTotalPrice, hasSelectedItems]);

  // Render payment widget
  useEffect(() => {
    const renderPaymentWidget = async () => {
      if (
        !hasSelectedItems ||
        !widgets ||
        !paymentMethodRef.current ||
        isPaymentReady
      )
        return;

      try {
        await (
          widgets as unknown as {
            renderPaymentMethods: (options: {
              selector: string;
              variantKey: string;
            }) => Promise<void>;
          }
        ).renderPaymentMethods({
          selector: "#payment-widget",
          variantKey: "DEFAULT",
        });
        setIsPaymentReady(true);
      } catch (error) {
        console.error("Failed to render payment widget:", error);
      }
    };

    renderPaymentWidget();
  }, [widgets, isPaymentReady, hasSelectedItems]);

  const handlePayment = async () => {
    if (!widgets) {
      alert("결제 시스템이 준비되지 않았습니다.");
      return;
    }

    if (
      !shippingAddress.fullName ||
      !shippingAddress.address ||
      !shippingAddress.phone
    ) {
      alert("배송 정보를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const orderId = generateRandomString();
      const orderName = `${selectedItems[0].product.name}${selectedItems.length > 1 ? ` 외 ${selectedItems.length - 1}건` : ""}`;

      await (
        widgets as unknown as {
          requestPayment: (options: {
            orderId: string;
            orderName: string;
            successUrl: string;
            failUrl: string;
            customerEmail: string;
            customerName: string;
            customerMobilePhone: string;
          }) => Promise<void>;
        }
      ).requestPayment({
        orderId,
        orderName,
        successUrl: `${window.location.origin}/checkout/success`,
        failUrl: `${window.location.origin}/checkout/fail`,
        customerEmail: "customer@example.com",
        customerName: shippingAddress.fullName,
        customerMobilePhone: shippingAddress.phone.replace(/-/g, ""),
      });
    } catch (error) {
      console.error("Payment failed:", error);
      alert("결제 요청 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // Early return for empty cart or no selected items
  if (!hasSelectedItems) {
    return <EmptyCheckoutState onBackToCart={() => router.push("/cart")} />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-2xl font-light text-neutral-900">주문/결제</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Checkout Form - Left side */}
          <div className="space-y-8 lg:col-span-2">
            {/* Shipping Information */}
            <ShippingSection
              shippingAddress={shippingAddress}
              onShippingChange={setShippingAddress}
            />

            {/* Payment Information */}
            <PaymentSection
              paymentMethodRef={paymentMethodRef}
              isPaymentReady={isPaymentReady}
            />
          </div>

          {/* Order Summary - Right side */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <CartSummary />

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={isLoading || !isPaymentReady}
                className="w-full"
                size="lg"
              >
                {isLoading
                  ? "결제 진행 중..."
                  : `${selectedTotalPrice.toLocaleString()}원 결제하기`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Local components
const EmptyCheckoutState = ({ onBackToCart }: { onBackToCart: () => void }) => (
  <div className="min-h-screen bg-neutral-50 p-8">
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col items-center justify-center space-y-6 rounded-lg bg-white p-12 text-center shadow-sm">
        <h2 className="text-xl font-light text-neutral-700">
          선택된 상품이 없습니다
        </h2>
        <p className="text-neutral-600">
          결제하기 위해 장바구니에서 상품을 선택해주세요
        </p>
        <Button onClick={onBackToCart} className="mt-4 px-8 py-3">
          장바구니로 돌아가기
        </Button>
      </div>
    </div>
  </div>
);

interface ShippingSectionProps {
  shippingAddress: ShippingAddress;
  onShippingChange: (address: ShippingAddress) => void;
}

const ShippingSection = ({
  shippingAddress,
  onShippingChange,
}: ShippingSectionProps) => {
  const handleChange = (field: keyof ShippingAddress, value: string) => {
    onShippingChange({ ...shippingAddress, [field]: value });
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-neutral-900">배송 정보</h3>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            받는 분 이름 *
          </label>
          <input
            type="text"
            value={shippingAddress.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="w-full rounded border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none"
            placeholder="이름을 입력해주세요"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            주소 *
          </label>
          <input
            type="text"
            value={shippingAddress.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full rounded border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none"
            placeholder="주소를 입력해주세요"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              우편번호
            </label>
            <input
              type="text"
              value={shippingAddress.postalCode}
              onChange={(e) => handleChange("postalCode", e.target.value)}
              className="w-full rounded border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none"
              placeholder="우편번호"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              휴대폰 번호 *
            </label>
            <input
              type="text"
              value={shippingAddress.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full rounded border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none"
              placeholder="010-0000-0000"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface PaymentSectionProps {
  paymentMethodRef: React.RefObject<HTMLDivElement | null>;
  isPaymentReady: boolean;
}

const PaymentSection = ({
  paymentMethodRef,
  isPaymentReady,
}: PaymentSectionProps) => (
  <div className="rounded-lg bg-white p-6 shadow-sm">
    <h3 className="mb-4 text-lg font-medium text-neutral-900">결제 방법</h3>
    <div
      id="payment-widget"
      ref={paymentMethodRef}
      className={cn(
        "min-h-[200px]",
        !isPaymentReady && "flex items-center justify-center",
      )}
    >
      {!isPaymentReady && (
        <div className="text-neutral-500">결제 위젯을 로드하는 중...</div>
      )}
    </div>
  </div>
);
