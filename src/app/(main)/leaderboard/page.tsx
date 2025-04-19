import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getTopTenUsers,
  getUserProgress,
  getUserSubscription,
} from "@/server/db/queries";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import {
  FeedWrapper,
  Promo,
  Quests,
  StickyWrapper,
  UserProgress,
} from "@/components/shared";

import { auth } from "@/server/auth";

const LeaderboardPage = async () => {
  const session = await auth();

  const leaderboardData = getTopTenUsers();
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [leaderboard, userProgress, userSubscription] = await Promise.all([
    leaderboardData,
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
          <Image
            src="/icons/leaderboard.svg"
            alt="Leaderboard"
            height={90}
            width={90}
          />

          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
            Leaderboard
          </h1>

          <p className="text-muted-foreground mb-6 text-center text-lg text-balance">
            See where you stand among other learners in the community.
          </p>

          <Separator className="mb-4 h-0.5 rounded-full" />

          {leaderboard.map((userProgress, index) => (
            <div
              key={userProgress.userId}
              className="flex w-full items-center justify-between gap-4 rounded-xl p-2 px-4 hover:bg-gray-200/50"
            >
              <p className="font-bold text-lime-700">{index + 1}</p>

              <div className="flex w-[87%] items-center gap-2 md:w-[84%] lg:w-[90%]">
                <Avatar className="h-8 w-8 border bg-green-500 lg:h-10 lg:w-10">
                  <AvatarImage
                    className="object-cover"
                    src={userProgress.userImageSrc}
                  />
                </Avatar>

                <p className="flex-1 font-bold text-neutral-800">
                  {session?.user?.id === userProgress.userId &&
                  session.user?.name !== userProgress.userName
                    ? (session.user.name ?? "Anon")
                    : userProgress.userName}
                </p>

                <p className="text-muted-foreground text-sm lg:text-base">
                  {userProgress.points} XP
                </p>
              </div>
            </div>
          ))}
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
        <Quests points={userProgress.points} />
      </StickyWrapper>
    </div>
  );
};

export default LeaderboardPage;
