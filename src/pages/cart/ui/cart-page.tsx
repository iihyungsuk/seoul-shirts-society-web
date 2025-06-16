"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCartStore } from "@/features/cart";
import { Button } from "@/shared/ui/button";

export const CartPage = () => {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-8 text-3xl font-light text-neutral-900 md:text-4xl">
            장바구니
          </h1>
          <div className="flex flex-col items-center justify-center space-y-6 rounded-lg bg-white p-12 text-center shadow-sm">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100">
              <svg
                width="32"
                height="32"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="text-neutral-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-light text-neutral-700">
              장바구니가 비어있습니다
            </h2>
            <p className="text-neutral-600">
              쇼핑을 시작하고 마음에 드는 상품을 장바구니에 추가해 보세요
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-8 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-400"
            >
              쇼핑 계속하기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-light text-neutral-900 md:text-4xl">
          장바구니
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="rounded-lg bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row">
                    {/* Product Image */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-50">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-neutral-900">
                            {item.product.name}
                          </h3>
                          <div className="mt-1 text-xs text-neutral-600">
                            <span className="mr-2">사이즈: {item.size}</span>
                            <span>색상: {item.color}</span>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-neutral-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400"
                          >
                            −
                          </button>
                          <span className="mx-3 text-sm">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                item.quantity + 1,
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() =>
                            removeItem(item.product.id, item.size, item.color)
                          }
                          className="text-xs text-neutral-500 hover:text-neutral-900"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
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
            <Button
              onClick={handleCheckout}
              className="mt-6 w-full py-4 text-base"
            >
              결제하기
            </Button>
            <Link
              href="/"
              className="mt-4 block text-center text-sm text-neutral-600 hover:text-neutral-900"
            >
              쇼핑 계속하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
