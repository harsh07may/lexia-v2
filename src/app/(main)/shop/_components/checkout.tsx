"use client";
import { Button } from "@/components/ui/button";
import { PRICE_ID } from "@/constants";
import { initializePaddle, type Environments } from "@paddle/paddle-js";

export default function CheckoutButton({
  userEmail,
  hasActiveSubscription,
}: {
  userEmail?: string;
  hasActiveSubscription: boolean;
}) {
  const openCheckout = async () => {
    await initializePaddle({
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
      environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
      checkout: {
        settings: {
          variant: "one-page",
          displayMode: "overlay",
          successUrl: "/checkout/success",
          allowLogout: !userEmail,
        },
      },
    }).then(async (paddle) => {
      if (paddle) {
        paddle.Checkout.open({
          ...(userEmail && { customer: { email: userEmail } }),
          items: [{ priceId: PRICE_ID, quantity: 1 }],
        });
      }
    });
  };

  return (
    <>
      <Button onClick={openCheckout}>
        {hasActiveSubscription ? "settings" : "upgrade"}
      </Button>
    </>
  );
}
