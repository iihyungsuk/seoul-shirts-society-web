import { create } from "zustand";

export interface ShippingAddress {
  fullName: string;
  address: string;
  postalCode: string;
  phone: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

interface CheckoutStore {
  step: "shipping" | "payment" | "review";
  shippingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;

  setStep: (step: "shipping" | "payment" | "review") => void;
  setShippingAddress: (address: ShippingAddress) => void;
  setPaymentInfo: (payment: PaymentInfo) => void;
  reset: () => void;
}

const initialShippingAddress: ShippingAddress = {
  fullName: "",
  address: "",
  postalCode: "",
  phone: "",
};

const initialPaymentInfo: PaymentInfo = {
  cardNumber: "",
  cardholderName: "",
  expiryDate: "",
  cvv: "",
};

export const useCheckoutStore = create<CheckoutStore>()((set) => ({
  step: "shipping",
  shippingAddress: initialShippingAddress,
  paymentInfo: initialPaymentInfo,

  setStep: (step) => set({ step }),
  setShippingAddress: (address) => set({ shippingAddress: address }),
  setPaymentInfo: (payment) => set({ paymentInfo: payment }),
  reset: () =>
    set({
      step: "shipping",
      shippingAddress: initialShippingAddress,
      paymentInfo: initialPaymentInfo,
    }),
}));
