import { NextRequest, NextResponse } from "next/server";

const TOSS_SECRET_KEY = process.env.TOSS_PAYMENTS_SECRET_KEY;

export async function POST(request: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await request.json();

    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 },
      );
    }

    if (!TOSS_SECRET_KEY) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // 토스페이먼츠 결제 승인 API 호출
    const response = await fetch(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${TOSS_SECRET_KEY}:`).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("TossPayments API error:", errorData);

      return NextResponse.json(
        {
          error: "Payment confirmation failed",
          details: errorData,
        },
        { status: response.status },
      );
    }

    const paymentData = await response.json();

    // 여기서 주문 정보를 데이터베이스에 저장할 수 있습니다
    // TODO: Save order to database
    console.log("Payment confirmed:", paymentData);

    return NextResponse.json({
      success: true,
      payment: paymentData,
    });
  } catch (error) {
    console.error("Payment confirmation error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
