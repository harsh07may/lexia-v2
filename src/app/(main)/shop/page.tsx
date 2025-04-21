import Image from "next/image";
import { redirect } from "next/navigation";

import {
  FeedWrapper,
  Quests,
  StickyWrapper,
  UserProgress,
} from "@/components/shared";
import { auth } from "@/server/auth";
import { getUserProgress, getUserSubscription } from "@/server/db/queries";
import CheckoutButton from "./_components/checkout";
import RefillButton from "./_components/items";

const ShopPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  const session = await auth();
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-col px-6 md:flex-row md:gap-4 lg:gap-[48px]">
      <div className="sticky top-[60px] z-50 border-b-2 bg-white py-3 md:hidden">
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
      </div>

      <FeedWrapper>
        <div className="mt-7 flex w-full flex-col items-center">
          <Image src="/icons/shop.svg" alt="Shop" height={90} width={90} />

          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
            Shop
          </h1>

          <p className="text-muted-foreground mb-6 text-center text-lg text-balance">
            Spend your points on cool stuff.
          </p>
          <ul className="w-full">
            <RefillButton
              hearts={userProgress.hearts}
              points={userProgress.points}
            />
            <div className="flex w-full flex-col items-center gap-x-4 gap-y-4 border-t-2 p-4 pt-8 lg:flex-row">
              <Image
                src="/icons/unlimited.svg"
                alt="Unlimited"
                height={60}
                width={60}
              />

              <div className="flex-1">
                <p className="text-base font-bold text-neutral-700 lg:text-xl">
                  Unlimited hearts
                </p>
              </div>

              <CheckoutButton
                userEmail={session?.user.email ?? undefined}
                hasActiveSubscription={isPro}
              />
            </div>
          </ul>
        </div>
      </FeedWrapper>

      <StickyWrapper className="mt-6">
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />

        <Quests points={userProgress.points} />
      </StickyWrapper>
    </div>
  );
};

export default ShopPage;
