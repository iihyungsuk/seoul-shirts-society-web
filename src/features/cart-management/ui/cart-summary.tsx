"use client";

import Image from "next/image";
import Link from "next/link";

import { type CartItem } from "@/entities/cart";
import { formatPrice } from "@/entities/product";
import { Button } from "@/shared/ui/button";

import { useCartSummaryOperations } from "../model/hooks";

export interface CartSummaryProps {
  onCheckout?: () => void;
  showContinueShopping?: boolean;
  showCheckoutButton?: boolean;
}

export const CartSummary = ({
  onCheckout,
  showContinueShopping = false,
  showCheckoutButton = true,
}: CartSummaryProps) => {
  const {
    getSelectedItems,
    getSelectedTotalPrice,
    hasSelectedItems,
    hasHydrated,
  } = useCartSummaryOperations();

  if (!hasHydrated) {
    return <CartSummarySkeleton />;
  }

  const selectedItems = getSelectedItems();
  const subtotal = getSelectedTotalPrice();
  const hasItems = hasSelectedItems();

  const shippingCost = subtotal >= 50000 ? 0 : 3000;
  const totalAmount = subtotal + shippingCost;

  const formattedShippingCost =
    shippingCost === 0 ? "무료" : formatPrice(shippingCost);

  const isCheckoutDisabled = !hasItems || totalAmount <= 0;

  return (
    <div className="h-fit rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-medium text-neutral-900">주문 요약</h2>

      {!hasItems ? (
        <EmptySelectionMessage />
      ) : (
        <PricingBreakdown
          items={selectedItems}
          formattedSubtotal={formatPrice(subtotal)}
          formattedShippingCost={formattedShippingCost}
          formattedTotal={formatPrice(totalAmount)}
        />
      )}

      {showCheckoutButton && onCheckout && (
        <Button
          onClick={onCheckout}
          disabled={isCheckoutDisabled}
          className="mt-6 w-full py-4 text-base"
        >
          {!hasItems ? "상품을 선택해주세요" : "결제하기"}
        </Button>
      )}
      {showContinueShopping && <ContinueShoppingLink />}
    </div>
  );
};

const CartSummarySkeleton = () => (
  <div className="h-fit rounded-lg bg-white p-6 shadow-sm">
    <div className="h-6 w-24 animate-pulse rounded bg-neutral-200" />
    <div className="mt-4 space-y-3">
      <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
      <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200" />
      <div className="h-10 w-full animate-pulse rounded bg-neutral-200" />
    </div>
  </div>
);

const EmptySelectionMessage = () => (
  <div className="py-8 text-center">
    <p className="text-sm text-neutral-500">선택된 상품이 없습니다</p>
    <p className="mt-1 text-xs text-neutral-400">
      주문하실 상품을 선택해주세요
    </p>
  </div>
);

interface PricingBreakdownProps {
  items: CartItem[];
  formattedSubtotal: string;
  formattedShippingCost: string;
  formattedTotal: string;
}

const PricingBreakdown = ({
  items,
  formattedSubtotal,
  formattedShippingCost,
  formattedTotal,
}: PricingBreakdownProps) => (
  <>
    <CartItems items={items} />
    <div className="space-y-2">
      <PriceRow label="상품 가격" value={formattedSubtotal} />
      <PriceRow label="배송비" value={formattedShippingCost} />
      <div className="my-4 border-t border-neutral-200"></div>
      <TotalPriceRow totalPrice={formattedTotal} />
    </div>
  </>
);

interface CartItemsProps {
  items: CartItem[];
}

const CartItems = ({ items }: CartItemsProps) => (
  <div className="mb-6 space-y-3">
    {items.map((item, index) => (
      <CartItemRow
        key={`${item.product.id}-${item.size}-${item.color}-${index}`}
        item={item}
        isFirstItem={index === 0}
      />
    ))}
  </div>
);

interface CartItemRowProps {
  item: CartItem;
  isFirstItem: boolean;
}

const CartItemRow = ({ item, isFirstItem }: CartItemRowProps) => {
  return (
    <div className="flex gap-3">
      {/* Product Image */}
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-neutral-50">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-contain p-1"
          sizes="48px"
          priority={isFirstItem}
        />
      </div>

      {/* Product Details */}
      <div className="min-w-0 flex-1">
        <div className="flex justify-between">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-neutral-900">
              {item.product.name}
            </p>
            <p className="text-xs text-neutral-600">
              {item.size} / {item.color} / ×{item.quantity}
            </p>
          </div>
          <span className="ml-2 text-sm font-medium text-neutral-900">
            ₩{(item.product.price * item.quantity).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

interface PriceRowProps {
  label: string;
  value: string;
}

const PriceRow = ({ label, value }: PriceRowProps) => (
  <div className="flex justify-between text-sm">
    <span className="font-medium text-neutral-900">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

interface TotalPriceRowProps {
  totalPrice: string;
}

const TotalPriceRow = ({ totalPrice }: TotalPriceRowProps) => (
  <div className="flex justify-between text-base font-medium">
    <span>총 결제 금액</span>
    <span>{totalPrice}</span>
  </div>
);

const ContinueShoppingLink = () => (
  <Link
    href="/"
    className="mt-4 block text-center text-sm text-neutral-600 hover:text-neutral-900"
  >
    쇼핑 계속하기
  </Link>
);
