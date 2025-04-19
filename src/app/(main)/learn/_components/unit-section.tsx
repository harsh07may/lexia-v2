import UnitBanner from "./unit-banner";
import LessonButton from "./lesson-button";
import type { Lesson, Unit } from "@prisma/client";

type UnitProps = {
  id: number;
  title: string;
  description: string;
  lessons: (Lesson & {
    completed: boolean;
  })[];
  activeLesson:
    | (Lesson & {
        unit: Unit;
      })
    | undefined;
  activeLessonPercentage: number;
};

const UnitSection = ({
  id,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: UnitProps) => {
  let unitAccess = false;
  const allCompletedLessons = lessons.every((lesson) => lesson.completed);

  if (activeLesson?.unitId === id || allCompletedLessons) unitAccess = true;

  return (
    <>
      <UnitBanner title={title} description={description} access={unitAccess} />

      <div className="relative flex flex-col items-center">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              id={lesson.id}
              key={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </>
  );
};

export default UnitSection;
