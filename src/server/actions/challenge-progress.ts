"use server";

import { DEFAULT_HEARTS_MAX, POINTS_PER_CHALLENGE } from "@/constants";
import { auth } from "@/server/auth";
import { getUserProgress, getUserSubscription } from "@/server/db/queries";
import { revalidatePath } from "next/cache";
import { db } from "../db";

async function getUserId() {
  const session = await auth();
  const userId = session?.user.id;

  return userId;
}

export const upsertChallengeProgress = async (challengeId: number) => {
  const userId = await getUserId();

  if (!userId) throw new Error("Unauthorized");

  const userSubscription = await getUserSubscription();
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) throw new Error("User progress not found");

  const challenge = await db.challenge.findFirst({
    where: { id: challengeId },
  });
  if (!challenge) throw new Error("Challenge not found");

  const lessonId = challenge.lessonId;
  const existingChallengeProgress = await db.challengeProgress.findFirst({
    where: { userId: userId, challengeId: challengeId },
  });
  const isPractice = !!existingChallengeProgress;

  if (
    currentUserProgress.hearts === 0 &&
    !isPractice &&
    !userSubscription?.isActive
  ) {
    return { error: "hearts" };
  }

  if (isPractice) {
    await db.challengeProgress.update({
      data: {
        completed: true,
      },
      where: {
        id: existingChallengeProgress.id,
      },
    });
    await db.userProgress.update({
      data: {
        hearts: Math.min(currentUserProgress.hearts + 1, DEFAULT_HEARTS_MAX), // default maximum number of hearts = DEFAULT_HEARTS_MAX
        points: currentUserProgress.points + POINTS_PER_CHALLENGE, // default number of points = DEFAULT_POINTS_START
      },
      where: { userId: userId },
    });

    revalidateAllPaths();
    revalidatePath(`/lesson/${lessonId}`);
    return;
  }
  await db.challengeProgress.create({
    data: {
      userId: userId,
      challengeId: challengeId,
      completed: true,
    },
  });

  await db.userProgress.update({
    data: { points: currentUserProgress.points + POINTS_PER_CHALLENGE },
    where: { userId: userId },
  });

  revalidateAllPaths();
  revalidatePath(`/lesson/${lessonId}`);
};

/*************** HELPER FUNCTIONS ***************/

const revalidateAllPaths = () => {
  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};
