import { Button } from "@/components/ui/button";
import type { Course } from "@prisma/client";
import { InfinityIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface UserProgressProps {
  activeCourse: Course;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
}

const UserProgress = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}: UserProgressProps) => (
  <div className="flex w-full items-center justify-between md:gap-x-0.5 lg:gap-x-2">
    <Button variant="defaultOutline" asChild>
      <Link href="/courses">
        <Image
          alt={activeCourse.title}
          src={activeCourse.imageSrc}
          height={32}
          width={32}
          className="rounded-md border"
        />
      </Link>
    </Button>

    <Button variant="defaultOutline" className="text-orange-500" asChild>
      <Link href="/shop">
        <Image
          alt="Points"
          src="/icons/points.svg"
          height={28}
          width={28}
          className="mr-2"
        />
        {points}
      </Link>
    </Button>

    <Button variant="defaultOutline" className="text-rose-500" asChild>
      <Link href="/shop">
        <Image
          alt="Hearts"
          src="/icons/heart.svg"
          height={22}
          width={22}
          className="mr-2"
        />

        {hasActiveSubscription ? (
          <InfinityIcon className="h-4 w-4 stroke-[3]" />
        ) : (
          hearts
        )}
      </Link>
    </Button>
  </div>
);

export default UserProgress;
