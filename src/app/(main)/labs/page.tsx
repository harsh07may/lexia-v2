import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { BookOpenIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { getUserProgress, getUserSubscription } from "@/server/db/queries";

import { buttonVariants } from "@/components/ui/button";
import FeedWrapper from "@/components/shared/feed-wrapper";
import Promo from "@/components/shared/promo";
import StickyWrapper from "@/components/shared/sticky-wrapper";
import UserProgress from "@/components/shared/user-progress";
import { Separator } from "@/components/ui/separator";

async function LabsPage() {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-col px-6 md:flex-row md:gap-4 lg:gap-[12px]">
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
          <Image src="/icons/lab.svg" alt="Quests" height={90} width={90} />

          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
            AI Labs !
          </h1>

          <p className="text-muted-foreground mb-6 text-center text-lg text-balance">
            Step into the Lab - where language meets AI magic✨.
          </p>
          <Separator />
          <div className="mb-8 grid gap-4 py-10 lg:grid-cols-2">
            <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <BookOpenIcon className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Writing Lab</h3>
              <p className="mb-4 text-sm text-gray-600">
                Practice writing and get instant AI feedback
              </p>
              <Link
                href="/labs/writing"
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                    className: "mt-auto",
                  }),
                )}
              >
                Try Now
              </Link>
            </div>

            <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 opacity-70 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <span className="text-gray-400">🏆</span>
              </div>
              <h3 className="mb-2 text-lg font-medium">Coming Soon</h3>
              <p className="mb-4 text-sm text-gray-600">
                More exciting features are on the way!
              </p>
              <Link
                href=""
                aria-disabled
                tabIndex={-1}
                className={cn(
                  buttonVariants({
                    variant: "defaultOutline",
                    className: "mt-auto",
                  }),
                  "pointer-events-none",
                )}
              >
                Try Now
              </Link>
            </div>
          </div>
        </div>
      </FeedWrapper>

      <StickyWrapper className="mt-6">
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />

        {!isPro && <Promo />}
      </StickyWrapper>
    </div>
  );
}
export default LabsPage;
