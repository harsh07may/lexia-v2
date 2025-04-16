"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Card } from "./card";
import type { Course, UserProgress } from "@prisma/client";
import { upsertUserProgress } from "@/server/actions/user-progress";
import { isRedirectError } from "next/dist/client/components/redirect-error";

type ListProps = {
  courses: Course[];
  activeCourseId?: UserProgress["activeCourseId"];
};

function List({ courses, activeCourseId }: ListProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleClick = (id: number) => {
    if (pending) return;

    if (id === activeCourseId) {
      startTransition(() => router.push("/learn"));
    }

    startTransition(() => {
      upsertUserProgress(id).catch((err) => {
        if (isRedirectError(err)) {
          toast.success("Course activated 🚀");
          return;
        }
        toast.error("Oops! That course tripped on a verb. Try another one!");
      });
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={handleClick}
          disabled={pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
}
export default List;
