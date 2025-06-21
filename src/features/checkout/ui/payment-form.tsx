import { FormEvent, useState } from "react";

import { PaymentInfo } from "@/features/checkout";
import { Button } from "@/shared/ui/button";

interface PaymentFormProps {
  initialPayment: PaymentInfo;
  onSubmit: (payment: PaymentInfo) => void;
  onBack: () => void;
}

export const PaymentForm = ({
  initialPayment,
  onSubmit,
  onBack,
}: PaymentFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payment: PaymentInfo = {
      cardNumber: formData.get("cardNumber") as string,
      cardholderName: formData.get("cardholderName") as string,
      expiryDate: formData.get("expiryDate") as string,
      cvv: formData.get("cvv") as string,
    };

    const newErrors = validatePaymentInfo(payment);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(payment);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-medium text-neutral-900">결제 정보</h2>

      <div className="space-y-4">
        <FormField
          id="cardNumber"
          label="카드 번호"
          defaultValue={initialPayment.cardNumber}
          placeholder="1234 5678 9012 3456"
          error={errors.cardNumber}
        />

        <FormField
          id="cardholderName"
          label="카드 소유자 이름"
          defaultValue={initialPayment.cardholderName}
          placeholder="홍길동"
          error={errors.cardholderName}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            id="expiryDate"
            label="만료일"
            defaultValue={initialPayment.expiryDate}
            placeholder="MM/YY"
            error={errors.expiryDate}
          />

          <FormField
            id="cvv"
            label="CVV"
            defaultValue={initialPayment.cvv}
            placeholder="123"
            error={errors.cvv}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Button type="button" onClick={onBack} className="px-4 py-2">
          이전
        </Button>
        <Button type="submit" className="px-4 py-2">
          다음
        </Button>
      </div>
    </form>
  );
};

// Extracted validation logic
const validatePaymentInfo = (payment: PaymentInfo): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!payment.cardNumber) errors.cardNumber = "카드번호를 입력하세요";
  if (!payment.cardholderName)
    errors.cardholderName = "카드 소유자 이름을 입력하세요";
  if (!payment.expiryDate) errors.expiryDate = "만료일을 입력하세요";
  if (!payment.cvv) errors.cvv = "CVV를 입력하세요";

  return errors;
};

// Reusable form field component
interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  error?: string;
}

const FormField = ({
  id,
  label,
  type = "text",
  defaultValue,
  placeholder,
  error,
}: FormFieldProps) => (
  <div>
    <label
      htmlFor={id}
      className="mb-1 block text-sm font-medium text-neutral-700"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      defaultValue={defaultValue}
      className="w-full rounded-md border border-neutral-300 p-2 text-sm outline-none focus:border-neutral-900"
      placeholder={placeholder}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);
