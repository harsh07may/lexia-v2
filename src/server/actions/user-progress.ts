"use server";
import { DEFAULT_HEARTS_MAX, POINTS_TO_REFILL } from "@/constants";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  getCourseById,
  getUserProgress,
  getUserSubscription,
} from "../db/queries";

export async function getUserId() {
  const session = await auth();
  const userId = session?.user.id;

  return userId;
}

export const upsertUserProgress = async (courseId: number) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  const course = await getCourseById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  if (!course.units.length || !course.units[0]?.lessons.length) {
    throw new Error("Course is empty");
  }

  const existingUserProgress = await getUserProgress();

  // Update or Insert course in UserProgress.
  if (existingUserProgress) {
    await db.userProgress.update({
      where: { userId: user.id },
      data: {
        activeCourseId: courseId,
        userName: user.name ?? "Anon",
        userImageSrc: user.image ?? "/mascot.svg",
      },
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
  }

  await db.userProgress.create({
    data: {
      userId: user.id,
      activeCourseId: courseId,
      userName: user.name ?? "Anon",
      userImageSrc: user.image ?? "/mascot.svg",
    },
  });
  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};

// Reduce the users Hearts/Lives.
export const reduceHearts = async (challengeId: number) => {
  const userId = await getUserId();
  if (!userId) throw new Error("Unauthorized");

  const currentUserProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();
  const challenge = await db.challenge.findFirst({
    where: { id: challengeId },
  });

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  if (!challenge) {
    throw new Error("Challenge not found");
  }

  const lessonId = challenge.lessonId;
  const isPractice = await isPracticeChallenge(userId, challengeId);

  if (isPractice) {
    return { error: "practice" };
  }

  if (userSubscription?.isActive) {
    return { error: "subscription" };
  }

  if (currentUserProgress.hearts === 0) {
    return { error: "hearts" };
  }

  await db.userProgress.update({
    where: { userId: userId },
    data: { hearts: Math.max(currentUserProgress.hearts - 1, 0) },
  });

  revalidateAllPaths();
  revalidatePath(`/lesson/${lessonId}`);
};

// Refill hearts, with appropriate points or shop purchase.
export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  if (currentUserProgress.hearts === DEFAULT_HEARTS_MAX) {
    throw new Error("Hearts are already full");
  }

  if (currentUserProgress.points < POINTS_TO_REFILL) {
    throw new Error("Not enough points");
  }

  await db.userProgress.update({
    where: { userId: currentUserProgress.userId },
    data: {
      hearts: DEFAULT_HEARTS_MAX,
      points: currentUserProgress.points - POINTS_TO_REFILL,
    },
  });

  revalidateAllPaths();
};

/*************** HELPER FUNCTIONS ***************/
const isPracticeChallenge = async (userId: string, challengeId: number) => {
  const existingChallengeProgress = await db.challengeProgress.findFirst({
    where: { userId: userId, challengeId: challengeId },
  });
  return !!existingChallengeProgress;
};

const revalidateAllPaths = () => {
  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
};
