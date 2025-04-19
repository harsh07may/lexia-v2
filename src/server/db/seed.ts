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
      data: [
        {
          id: 1,
          courseId: 1,
          title: "Unit 1",
          description: "Learn the basics of Spanish",
          order: 1,
        },
        {
          id: 2,
          courseId: 1,
          title: "Unit 2",
          description: "Intermediate Level",
          order: 2,
        },
      ],
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
        { id: 4, unitId: 2, order: 2, title: "Phrases" },
        { id: 5, unitId: 2, order: 3, title: "Sentences" },
      ],
    });

    await db.challenge.createMany({
      data: [
        {
          id: 1,
          lessonId: 1,
          type: "SELECT",
          question: 'Which one of these is "the man"?',
          order: 1,
        },
        {
          id: 2,
          lessonId: 1,
          type: "SELECT",
          question: 'Which one of these is "the woman"?',
          order: 2,
        },
        {
          id: 3,
          lessonId: 2,
          type: "ASSIST",
          question: '"the boy"',
          order: 2,
        },
        {
          id: 4,
          lessonId: 3,
          type: "SELECT",
          question: 'Which one of these is "the zombie"?',
          order: 1,
        },
        {
          id: 5,
          lessonId: 3,
          type: "SELECT",
          question: 'Which one of these is "the robot"?',
          order: 2,
        },
        {
          id: 6,
          lessonId: 4,
          type: "SELECT",
          question: 'Which one of these is "the girl"?',
          order: 1,
        },
        {
          id: 7,
          lessonId: 5,
          type: "ASSIST",
          question: '"the zombie"',
          order: 1,
        },
      ],
    });

    await db.challengeOption.createMany({
      data: [
        {
          challengeId: 1,
          imageSrc: "/assets/man.svg",
          correct: true,
          text: "el hombre",
          audioSrc: "/courses/es/audio/es_man.mp3",
        },
        {
          challengeId: 1,
          imageSrc: "/assets/woman.svg",
          correct: false,
          text: "la mujer",
          audioSrc: "/courses/es/audio/es_woman.mp3",
        },
        {
          challengeId: 1,
          imageSrc: "/assets/robot.svg",
          correct: false,
          text: "el robot",
          audioSrc: "/courses/es/audio/es_robot.mp3",
        },
      ],
    });

    await db.challengeOption.createMany({
      data: [
        {
          challengeId: 2,
          correct: false,
          text: "el hombre",
          audioSrc: "/courses/es/audio/es_man.mp3",
        },
        {
          challengeId: 2,
          correct: true,
          text: "la mujer",
          audioSrc: "/courses/es/audio/es_woman.mp3",
        },
        {
          challengeId: 2,
          correct: false,
          text: "el robot",
          audioSrc: "/courses/es/audio/es_robot.mp3",
        },
      ],
    });

    await db.challengeOption.createMany({
      data: [
        {
          challengeId: 3,
          correct: true,
          text: "el chico",
          audioSrc: "/courses/es/audio/es_boy.mp3",
        },
        {
          challengeId: 3,
          correct: false,
          text: "la mujer",
          audioSrc: "/courses/es/audio/es_woman.mp3",
        },
        {
          challengeId: 3,
          correct: false,
          text: "el robot",
          audioSrc: "/courses/es/audio/es_robot.mp3",
        },
      ],
    });

    await db.challengeOption.createMany({
      data: [
        {
          challengeId: 4,
          correct: true,
          text: "el zombie",
          audioSrc: "/courses/es/audio/es_zombie.mp3",
        },
        {
          challengeId: 4,
          correct: false,
          text: "la mujer",
          audioSrc: "/courses/es/audio/es_woman.mp3",
        },
        {
          challengeId: 4,
          correct: false,
          text: "el nina",
          audioSrc: "/courses/es/audio/es_girl.mp3",
        },
      ],
    });

    await db.challengeOption.createMany({
      data: [
        {
          challengeId: 5,
          correct: true,
          text: "el robot",
          audioSrc: "/courses/es/audio/es_robot.mp3",
        },
        {
          challengeId: 5,
          correct: false,
          text: "la mujer",
          audioSrc: "/courses/es/audio/es_woman.mp3",
        },
        {
          challengeId: 5,
          correct: false,
          text: "el nina",
          audioSrc: "/courses/es/audio/es_girl.mp3",
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
