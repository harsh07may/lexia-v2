import Image from "next/image";
import { redirect } from "next/navigation";

import { quests } from "@/constants";

import { Progress } from "@/components/ui/progress";
import { getUserProgress, getUserSubscription } from "@/server/db/queries";
import UserProgress from "@/components/shared/user-progress";
import FeedWrapper from "@/components/shared/feed-wrapper";
import StickyWrapper from "@/components/shared/sticky-wrapper";
import Promo from "@/components/shared/promo";

const QuestsPage = async () => {
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
          <Image src="/icons/quests.svg" alt="Quests" height={90} width={90} />

          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
            Quests
          </h1>

          <p className="text-muted-foreground mb-6 text-center text-lg text-balance">
            Complete quests by earning points.
          </p>

          <ul className="w-full">
            {quests.map((quest) => {
              const progress = (userProgress.points / quest.value) * 100;

              return (
                <div
                  key={quest.title}
                  className="flex w-full items-center gap-x-4 border-t-2 p-4"
                >
                  <Image
                    src="/icons/points.svg"
                    alt="Points"
                    width={60}
                    height={60}
                  />

                  <div className="flex w-full flex-col gap-y-2">
                    <p className="text-xl font-bold text-neutral-700">
                      {quest.title}
                    </p>

                    <Progress value={progress} className="h-3" />
                  </div>
                </div>
              );
            })}
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

        {!isPro && <Promo />}
      </StickyWrapper>
    </div>
  );
};

export default QuestsPage;
