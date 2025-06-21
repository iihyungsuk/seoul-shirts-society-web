import { type CartItem } from "@/entities/cart";
import { PaymentInfo, ShippingAddress } from "@/features/checkout";
import { Button } from "@/shared/ui/button";

interface OrderReviewProps {
  shippingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;
  items: CartItem[];
  onCompleteOrder: () => void;
}

export const OrderReview = ({
  shippingAddress,
  paymentInfo,
  items,
  onCompleteOrder,
}: OrderReviewProps) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-medium text-neutral-900">주문 확인</h2>

      <ShippingInfo address={shippingAddress} />
      <PaymentInfoSummary payment={paymentInfo} />
      <OrderItems items={items} />

      <div className="mt-8 flex justify-between">
        <div className="px-4 py-2"></div>
        <Button onClick={onCompleteOrder} className="px-4 py-2">
          주문 완료
        </Button>
      </div>
    </div>
  );
};

// Extracted shipping info component
const ShippingInfo = ({ address }: { address: ShippingAddress }) => (
  <div className="mb-6">
    <h3 className="mb-2 text-sm font-medium tracking-wide text-neutral-900 uppercase">
      배송 정보
    </h3>
    <div className="rounded-md bg-neutral-50 p-4 text-sm">
      <p className="font-medium">{address.fullName}</p>
      <p>{address.address}</p>
      <p className="mt-2">{address.phone}</p>
    </div>
  </div>
);

// Extracted payment info component
const PaymentInfoSummary = ({ payment }: { payment: PaymentInfo }) => (
  <div className="mb-6">
    <h3 className="mb-2 text-sm font-medium tracking-wide text-neutral-900 uppercase">
      결제 정보
    </h3>
    <div className="rounded-md bg-neutral-50 p-4 text-sm">
      <p className="font-medium">{payment.cardholderName}</p>
      <p>카드번호: **** **** **** {payment.cardNumber.slice(-4)}</p>
      <p>만료일: {payment.expiryDate}</p>
    </div>
  </div>
);

// Extracted order items component
const OrderItems = ({ items }: { items: CartItem[] }) => (
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
            <span className="text-neutral-600">x{item.quantity}</span>
          </div>
          <span className="font-medium">
            ₩{Math.round(item.product.price * item.quantity).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  </div>
);
