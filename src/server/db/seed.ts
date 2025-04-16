import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const main = async () => {
  try {
    console.log("🟠 Seeding database");

    // await db.userProgress.deleteMany();
    // await db.userSubscription.deleteMany();

    await db.course.deleteMany();
    // await db.unit.deleteMany();
    // await db.lesson.deleteMany();
    // await db.challenge.deleteMany();
    // await db.challengeOption.deleteMany();
    // await db.challengeProgress.deleteMany();

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

    console.log("🟢 Seeding finished");
  } catch (error) {
    console.log(error);
    throw new Error("🔴 Failed to seed database");
  }
};

await main();
