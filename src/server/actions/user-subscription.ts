"use server";

import { PRICE_ID } from "@/constants";
import { absoluteUrl } from "@/lib/utils";
import { auth } from "@/server/auth";
import { getUserSubscription } from "@/server/db/queries";
import type {
  SubscriptionCreatedEvent,
  SubscriptionUpdatedEvent,
} from "@paddle/paddle-node-sdk";
import { db } from "../db";

const returnUrl = absoluteUrl("/shop");

export const createSubscription = async (
  eventData: SubscriptionCreatedEvent | SubscriptionUpdatedEvent,
) => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    throw new Error("Unauthorized");
  }

  const userSubscription = await getUserSubscription();
  if (userSubscription?.id) {
    await db.userSubscription.update({
      data: {
        userId: user.id,
        paddlePriceId: PRICE_ID,
        paddleCustomerId: eventData.data.customerId,
        paddleSubscriptionId: eventData.data.id,
        stripeCurrentPeriodEnd:
          eventData.data.currentBillingPeriod?.endsAt ?? Date.now().toString(),
      },
      where: {
        userId: user.id,
      },
    });
    return { success: true, message: "Subscription updated exists" };
  }

  await db.userSubscription.create({
    data: {
      userId: user.id,
      paddlePriceId: PRICE_ID,
      paddleCustomerId: eventData.data.customerId,
      paddleSubscriptionId: eventData.data.id,
      stripeCurrentPeriodEnd:
        eventData.data.currentBillingPeriod?.endsAt ?? Date.now().toString(),
    },
  });

  return { success: true, message: "Subscription created successfully" };
};
