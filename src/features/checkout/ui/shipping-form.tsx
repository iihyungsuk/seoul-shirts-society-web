import { FormEvent, useState } from "react";

import { ShippingAddress } from "@/features/checkout";
import { Button } from "@/shared/ui/button";

interface ShippingFormProps {
  initialAddress: ShippingAddress;
  onSubmit: (address: ShippingAddress) => void;
  onBack?: () => void;
}

export const ShippingForm = ({
  initialAddress,
  onSubmit,
  onBack,
}: ShippingFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const address: ShippingAddress = {
      fullName: formData.get("fullName") as string,
      address: formData.get("address") as string,
      postalCode: formData.get("postalCode") as string,
      phone: formData.get("phone") as string,
    };

    const newErrors = validateShippingAddress(address);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-medium text-neutral-900">배송 정보</h2>

      <div className="space-y-4">
        <FormField
          id="fullName"
          label="이름"
          defaultValue={initialAddress.fullName}
          placeholder="홍길동"
          error={errors.fullName}
        />

        <FormField
          id="address"
          label="주소"
          defaultValue={initialAddress.address}
          placeholder="서울특별시 강남구 테헤란로 123"
          error={errors.address}
        />

        <FormField
          id="postalCode"
          label="우편번호"
          defaultValue={initialAddress.postalCode}
          placeholder="06194"
          error={errors.postalCode}
        />

        <FormField
          id="phone"
          label="연락처"
          type="tel"
          defaultValue={initialAddress.phone}
          placeholder="010-1234-5678"
          error={errors.phone}
        />
      </div>

      <div className="mt-8 flex justify-between">
        {onBack && (
          <Button type="button" onClick={onBack} className="px-4 py-2">
            이전
          </Button>
        )}
        <Button type="submit" className="px-4 py-2">
          다음
        </Button>
      </div>
    </form>
  );
};

// Extracted validation logic
const validateShippingAddress = (
  address: ShippingAddress,
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!address.fullName) errors.fullName = "이름을 입력하세요";
  if (!address.address) errors.address = "주소를 입력하세요";
  if (!address.postalCode) errors.postalCode = "우편번호를 입력하세요";
  if (!address.phone) errors.phone = "전화번호를 입력하세요";

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
