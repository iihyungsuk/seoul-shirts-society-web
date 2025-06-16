"use client";

import { FormEvent, useState } from "react";

import { useRouter } from "next/navigation";

import { useCartStore } from "@/features/cart";
import {
  PaymentInfo,
  ShippingAddress,
  useCheckoutStore,
} from "@/features/checkout";
import { Button } from "@/shared/ui/button";

export const CheckoutPage = () => {
  const router = useRouter();
  const {
    step,
    setStep,
    shippingAddress,
    setShippingAddress,
    paymentInfo,
    setPaymentInfo,
  } = useCheckoutStore();
  const { items, getTotalPrice, clearCart } = useCartStore();

  const [errors, setErrors] = useState<Record<string, string>>({});

  // 배송 정보 입력 폼 처리
  const handleShippingSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 데이터 추출 및 유효성 검증
    const formData = new FormData(e.currentTarget);
    const newAddress: ShippingAddress = {
      fullName: formData.get("fullName") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      postalCode: formData.get("postalCode") as string,
      country: formData.get("country") as string,
      phone: formData.get("phone") as string,
    };

    // 간단한 유효성 검사
    const newErrors: Record<string, string> = {};
    if (!newAddress.fullName) newErrors.fullName = "이름을 입력하세요";
    if (!newAddress.address) newErrors.address = "주소를 입력하세요";
    if (!newAddress.city) newErrors.city = "도시를 입력하세요";
    if (!newAddress.postalCode) newErrors.postalCode = "우편번호를 입력하세요";
    if (!newAddress.phone) newErrors.phone = "전화번호를 입력하세요";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setShippingAddress(newAddress);
    setStep("payment");
    setErrors({});
  };

  // 결제 정보 입력 폼 처리
  const handlePaymentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newPayment: PaymentInfo = {
      cardNumber: formData.get("cardNumber") as string,
      cardholderName: formData.get("cardholderName") as string,
      expiryDate: formData.get("expiryDate") as string,
      cvv: formData.get("cvv") as string,
    };

    // 간단한 유효성 검사
    const newErrors: Record<string, string> = {};
    if (!newPayment.cardNumber) newErrors.cardNumber = "카드번호를 입력하세요";
    if (!newPayment.cardholderName)
      newErrors.cardholderName = "카드 소유자 이름을 입력하세요";
    if (!newPayment.expiryDate) newErrors.expiryDate = "만료일을 입력하세요";
    if (!newPayment.cvv) newErrors.cvv = "CVV를 입력하세요";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setPaymentInfo(newPayment);
    setStep("review");
    setErrors({});
  };

  // 주문 완료 처리
  const handleCompleteOrder = () => {
    // 실제 구현에서는 여기서 API 요청을 보내 주문을 처리합니다.
    clearCart();
    router.push("/checkout/success");
  };

  // 장바구니가 비어있는 경우
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-8 text-3xl font-light text-neutral-900 md:text-4xl">
            결제
          </h1>
          <div className="flex flex-col items-center justify-center space-y-6 rounded-lg bg-white p-12 text-center shadow-sm">
            <h2 className="text-xl font-light text-neutral-700">
              장바구니가 비어있습니다
            </h2>
            <p className="text-neutral-600">
              결제하기 위해 장바구니에 상품을 추가해주세요
            </p>
            <Button onClick={() => router.push("/")} className="mt-4 px-8 py-3">
              쇼핑 계속하기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-light text-neutral-900 md:text-4xl">
          결제
        </h1>

        {/* 결제 단계 표시 */}
        <div className="mb-8 flex">
          <div
            className={`flex-1 border-b-2 pb-2 text-center text-sm font-medium ${
              step === "shipping"
                ? "border-neutral-900 text-neutral-900"
                : "border-neutral-300 text-neutral-500"
            }`}
          >
            1. 배송 정보
          </div>
          <div
            className={`flex-1 border-b-2 pb-2 text-center text-sm font-medium ${
              step === "payment"
                ? "border-neutral-900 text-neutral-900"
                : "border-neutral-300 text-neutral-500"
            }`}
          >
            2. 결제 정보
          </div>
          <div
            className={`flex-1 border-b-2 pb-2 text-center text-sm font-medium ${
              step === "review"
                ? "border-neutral-900 text-neutral-900"
                : "border-neutral-300 text-neutral-500"
            }`}
          >
            3. 주문 확인
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* 입력 폼 영역 */}
          <div className="lg:col-span-2">
            {step === "shipping" && (
              <form
                onSubmit={handleShippingSubmit}
                className="rounded-lg bg-white p-6 shadow-sm"
              >
                <h2 className="mb-6 text-xl font-medium text-neutral-900">
                  배송 정보
                </h2>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-1 block text-sm font-medium text-neutral-700"
                    >
                      이름
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      defaultValue={shippingAddress.fullName}
                      className="w-full rounded-md border border-neutral-300 p-2 text-sm outline-none focus:border-neutral-900"
                      placeholder="홍길동"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="mb-1 block text-sm font-medium text-neutral-700"
                    >
                      주소
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      defaultValue={shippingAddress.address}
                      className="w-full rounded-md border border-neutral-300 p-2 text-sm outline-none focus:border-neutral-900"
                      placeholder="서울특별시 강남구 테헤란로 123"
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-1 block text-sm font-medium text-neutral-700"
                      >
                        도시
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        defaultValue={shippingAddress.city}
                        className="w-full rounded-md border border-neutral-300 p-2 text-sm outline-none focus:border-neutral-900"
                        placeholder="서울"
                      />
                      {errors.city && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="postalCode"
                        className="mb-1 block text-sm font-medium text-neutral-700"
                      >
                        우편번호
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        defaultValue={shippingAddress.postalCode}
                        className="w-full rounded-md border border-neutral-300 p-2 text-sm outline-none focus:border-neutral-900"
                        placeholder="06194"
                      />
                      {errors.postalCode && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.postalCode}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="mb-1 block text-sm font-medium text-neutral-700"
                    >
                      국가
                    </label>
                    <select
                      id="country"
                      name="country"
                      defaultValue={shippingAddress.country}
                      className="w-full rounded-md border border-neutral-300 p-2 text-sm outline-none focus:border-neutral-900"
                    >
                      <option value="Korea">대한민국</option>
                      <option value="USA">미국</option>
                      <option value="Japan">일본</option>
                      <option value="China">중국</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1 block text-sm font-medium text-neutral-700"
                    >
                      연락처
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      defaultValue={shippingAddress.phone}
                      className="w-full rounded-md border border-neutral-300 p-2 text-sm outline-none focus:border-neutral-900"
                      placeholder="010-1234-5678"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button type="submit" className="px-8 py-2">
                    다음 단계
                  </Button>
                </div>
              </form>
            )}

            {step === "payment" && (
              <form
                onSubmit={handlePaymentSubmit}
                className="rounded-lg bg-white p-6 shadow-sm"
              >
                <h2 className="mb-6 text-xl font-medium text-neutral-900">
                  결제 정보
                </h2>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="mb-1 block text-sm font-medium text-neutral-700"
                    >
                      카드 번호
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      defaultValue={paymentInfo.cardNumber}
                      className="w-full rounded-md border border-neutral-300 p-2 text-sm outline-none focus:border-neutral-900"
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="cardholderName"
                      className="mb-1 block text-sm font-medium text-neutral-700"
                    >
                      카드 소유자 이름
                    </label>
                    <input
                      type="text"
                      id="cardholderName"
                      name="cardholderName"
                      defaultValue={paymentInfo.cardholderName}
                      className="w-full rounded-md border border-neutral-300 p-2 text-sm outline-none focus:border-neutral-900"
                      placeholder="홍길동"
                    />
                    {errors.cardholderName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.cardholderName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="mb-1 block text-sm font-medium text-neutral-700"
                      >
                        만료일
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        defaultValue={paymentInfo.expiryDate}
                        className="w-full rounded-md border border-neutral-300 p-2 text-sm outline-none focus:border-neutral-900"
                        placeholder="MM/YY"
                      />
                      {errors.expiryDate && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="cvv"
                        className="mb-1 block text-sm font-medium text-neutral-700"
                      >
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        defaultValue={paymentInfo.cvv}
                        className="w-full rounded-md border border-neutral-300 p-2 text-sm outline-none focus:border-neutral-900"
                        placeholder="123"
                      />
                      {errors.cvv && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="border border-neutral-300 bg-white px-6 py-2 text-neutral-900 hover:border-neutral-400"
                  >
                    이전 단계
                  </Button>
                  <Button type="submit" className="px-8 py-2">
                    다음 단계
                  </Button>
                </div>
              </form>
            )}

            {step === "review" && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-medium text-neutral-900">
                  주문 확인
                </h2>

                {/* 배송 정보 요약 */}
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-medium tracking-wide text-neutral-900 uppercase">
                    배송 정보
                  </h3>
                  <div className="rounded-md bg-neutral-50 p-4 text-sm">
                    <p className="font-medium">{shippingAddress.fullName}</p>
                    <p>{shippingAddress.address}</p>
                    <p>
                      {shippingAddress.city}, {shippingAddress.postalCode}
                    </p>
                    <p>{shippingAddress.country}</p>
                    <p className="mt-2">{shippingAddress.phone}</p>
                  </div>
                </div>

                {/* 결제 정보 요약 */}
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-medium tracking-wide text-neutral-900 uppercase">
                    결제 정보
                  </h3>
                  <div className="rounded-md bg-neutral-50 p-4 text-sm">
                    <p className="font-medium">{paymentInfo.cardholderName}</p>
                    <p>
                      카드번호: **** **** ****{" "}
                      {paymentInfo.cardNumber.slice(-4)}
                    </p>
                    <p>만료일: {paymentInfo.expiryDate}</p>
                  </div>
                </div>

                {/* 주문 상품 요약 */}
                <div>
                  <h3 className="mb-2 text-sm font-medium tracking-wide text-neutral-900 uppercase">
                    주문 상품
                  </h3>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.size}-${item.color}`}
                        className="flex items-center justify-between rounded-md border border-neutral-200 p-3 text-sm"
                      >
                        <div className="flex items-center">
                          <span className="mr-2 font-medium">
                            {item.product.name} ({item.size}, {item.color})
                          </span>
                          <span className="text-neutral-600">
                            x{item.quantity}
                          </span>
                        </div>
                        <span className="font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button
                    onClick={() => setStep("payment")}
                    className="border border-neutral-300 bg-white px-6 py-2 text-neutral-900 hover:border-neutral-400"
                  >
                    이전 단계
                  </Button>
                  <Button onClick={handleCompleteOrder} className="px-8 py-2">
                    주문 완료
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* 주문 요약 */}
          <div className="h-fit rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-medium text-neutral-900">
              주문 요약
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">상품 가격</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">배송비</span>
                <span>무료</span>
              </div>
              <div className="my-4 border-t border-neutral-200"></div>
              <div className="flex justify-between text-base font-medium">
                <span>총 결제 금액</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
