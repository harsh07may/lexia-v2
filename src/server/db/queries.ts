import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { cache } from "react";

/*************************** USERS ***************************/

export async function getUserId() {
  const session = await auth();
  const userId = session?.user.id;

  return userId;
}

// Get the user progress for the logged in user
export const getUserProgress = cache(async () => {
  const userId = await getUserId();

  if (!userId) {
    return null;
  }
  const data = await db.userProgress.findFirst({
    where: {
      userId: userId,
    },
    include: {
      activeCourse: true,
    },
  });

  return data;
});

// Get Top 10 users by points for leaderboard
export const getTopTenUsers = cache(async () => {
  const userId = await getUserId();

  if (!userId) {
    return [];
  }

  const data = await db.userProgress.findMany({
    orderBy: { points: "desc" },
    take: 10,
    select: { userId: true, userName: true, userImageSrc: true, points: true },
  });

  return data;
});

// Retrieves the subscription status for the currently logged-in user.
export const getUserSubscription = cache(async () => {
  const userId = await getUserId();
  const DAY_IN_MS = 86_400_000;

  if (!userId) return null;

  const data = await db.userSubscription.findFirst({
    where: { userId: userId },
  });

  if (!data) return null;

  const isActive =
    data.stripePriceId &&
    data.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now();

  return {
    ...data,
    isActive: !!isActive,
  };
});

/*************************** COURSES ***************************/

// Get the list of all courses
export const getCourses = cache(async () => {
  const data = await db.course.findMany();

  return data;
});

// Get the course by id
export const getCourseById = cache(async (courseId: number) => {
  const data = await db.course.findFirst({
    where: {
      id: courseId,
    },
    include: {
      units: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  return data;
});

// Get the list of all units in a course
export const getCourseProgress = cache(async () => {
  const userId = await getUserId();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) {
    return null;
  }

  // Get the course progress for the active course
  const unitsInActiveCourse = await db.unit.findMany({
    orderBy: { order: "asc" },
    where: {
      courseId: userProgress.activeCourseId,
    },
    include: {
      lessons: {
        orderBy: { order: "asc" },
        include: {
          unit: true,
          challenges: {
            include: {
              challengeProgress: {
                where: { userId: userId },
              },
            },
          },
        },
      },
    },
  });

  // Get the first lesson in active course that has uncompleted challenges(ie. ChallengeProgress = Null).
  const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) =>
      lesson.challenges.some(
        (challenge) =>
          !challenge.challengeProgress ||
          challenge.challengeProgress.length === 0 ||
          challenge.challengeProgress.some(
            (progress) => progress.completed === false,
          ),
      ),
    );

  return {
    activeLesson: firstUncompletedLesson,
    activeLessonId: firstUncompletedLesson?.id,
  };
});

/*************************** UNITS, LESSONS ***************************/

// Retrieves all units for the user's currently active course, including lessons and their completion status based on challenge progress.
export const getUnits = cache(async () => {
  const userId = await getUserId();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) {
    return [];
  }

  const data = await db.unit.findMany({
    orderBy: { order: "asc" },
    where: {
      courseId: userProgress.activeCourseId,
    },
    include: {
      lessons: {
        orderBy: { order: "asc" },
        include: {
          challenges: {
            orderBy: { order: "asc" },
            include: {
              challengeProgress: {
                where: { userId: userId },
              },
            },
          },
        },
      },
    },
  });

  const normalizedData = data.map((unit) => {
    const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
      if (lesson.challenges.length === 0) {
        return { ...lesson, completed: false };
      }

      // checks if all challenges within the lesson are completed
      // the outer `.every()` call checks if every `challenge` within the array meets the condition specified by the inner `.every()` call
      const allCompletedChallenges = lesson.challenges.every(
        (challenge) =>
          challenge.challengeProgress &&
          challenge.challengeProgress.length > 0 &&
          // the `every` method returns `true` if all elements in an array satisfy the provided testing function
          // checks if the `completed` property of each progress object within `challenge.challengeProgress` is truthy
          challenge.challengeProgress.every((progress) => progress.completed),
      );

      // returns the lesson object with an additional property `completed`
      return { ...lesson, completed: allCompletedChallenges };
    });

    // returns the unit object with lessons now including completed status
    return { ...unit, lessons: lessonsWithCompletedStatus };
  });

  return normalizedData;
});

// Retrieves one lesson for the user's currently active course, including lessons and their completion status based on challenge progress.
export const getLesson = cache(async (id?: number) => {
  const userId = await getUserId();

  if (!userId) {
    return null;
  }

  const courseProgress = await getCourseProgress();

  const lessonId = id ?? courseProgress?.activeLessonId;

  if (!lessonId) {
    console.warn("No lesson ID provided and no active lesson found.");
    return null;
  }

  const data = await db.lesson.findFirst({
    where: { id: lessonId },
    include: {
      challenges: {
        orderBy: { order: "asc" },
        include: {
          options: true,
          challengeProgress: {
            where: {
              userId: userId,
            },
          },
        },
      },
    },
  });

  if (!data || !data.challenges) {
    return null;
  }

  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((progress) => progress.completed);

    return { ...challenge, completed };
  });

  return { ...data, challenges: normalizedChallenges };
});

// Percentage of completion of Challenges in a Lesson
export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();

  if (!courseProgress?.activeLessonId) {
    return 0;
  }

  const lesson = await getLesson(courseProgress.activeLessonId);

  if (!lesson) {
    return 0;
  }

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed,
  );

  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100,
  );

  return percentage;
});
