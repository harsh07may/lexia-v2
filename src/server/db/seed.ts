import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const main = async () => {
  try {
    console.log("🟠 Seeding database");

    // await db.userProgress.deleteMany();
    // await db.userSubscription.deleteMany();

    await db.course.deleteMany();
    await db.unit.deleteMany();
    await db.lesson.deleteMany();
    await db.challenge.deleteMany();
    await db.challengeOption.deleteMany();
    await db.challengeProgress.deleteMany();

    await db.course.createMany({
      data: [
        {
          id: 1,
          title: "Spanish",
          imageSrc: "/courses/es.svg",
        },
        {
          id: 2,
          title: "Italian",
          imageSrc: "/courses/it.svg",
        },
        {
          id: 3,
          title: "French",
          imageSrc: "/courses/fr.svg",
        },
        {
          id: 4,
          title: "Croatian",
          imageSrc: "/courses/hr.svg",
        },
        {
          id: 5,
          title: "Japanese",
          imageSrc: "/courses/jp.svg",
        },
      ],
    });

    await db.unit.createMany({
      data: {
        id: 1,
        courseId: 1,
        title: "Unit 1",
        description: "Learn the basics of Spanish",
        order: 1,
      },
    });

    await db.lesson.createMany({
      data: [
        {
          id: 1,
          unitId: 1,
          order: 1,
          title: "Nouns",
        },
        {
          id: 2,
          unitId: 1,
          order: 2,
          title: "Verbs",
        },
        {
          id: 3,
          unitId: 1,
          order: 3,
          title: "Adjectives",
        },
      ],
    });

    await db.challenge.createMany({
      data: [
        {
          id: 1,
          lessonId: 1,
          type: "SELECT",
          order: 1,
          question: 'Which one of these is the "the man"?',
        },
        {
          id: 2,
          lessonId: 1,
          type: "ASSIST",
          order: 2,
          question: '"the man"',
        },
      ],
    });

    await db.challengeOption.createMany({
      data: [
        {
          challengeId: 1,
          imageSrc: "/man.svg",
          correct: true,
          text: "el hombre",
          audioSrc: "/es_man.mp3",
        },
        {
          challengeId: 1,
          imageSrc: "/woman.svg",
          correct: false,
          text: "la mujer",
          audioSrc: "/es_woman.mp3",
        },
        {
          challengeId: 1,
          imageSrc: "/robot.svg",
          correct: false,
          text: "el robot",
          audioSrc: "/es_robot.mp3",
        },
      ],
    });

    await db.challengeOption.createMany({
      data: [
        {
          challengeId: 2,
          correct: true,
          text: "el hombre",
          audioSrc: "/es_man.mp3",
        },
        {
          challengeId: 2,
          correct: false,
          text: "la mujer",
          audioSrc: "/es_woman.mp3",
        },
        {
          challengeId: 2,
          correct: false,
          text: "el robot",
          audioSrc: "/es_robot.mp3",
        },
      ],
    });

    console.log("🟢 Seeding finished");
  } catch (error) {
    console.log(error);
    throw new Error("🔴 Failed to seed database");
  }
};

await main();
