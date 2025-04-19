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
    <Link href="/courses">
      <Button variant="defaultOutline">
        <Image
          alt={activeCourse.title}
          src={activeCourse.imageSrc}
          height={32}
          width={32}
          className="rounded-md border"
        />
      </Button>
    </Link>

    <Link href="/shop">
      <Button variant="defaultOutline" className="text-orange-500">
        <Image
          alt="Points"
          src="/icons/points.svg"
          height={28}
          width={28}
          className="mr-2"
        />
        {points}
      </Button>
    </Link>

    <Link href="/shop">
      <Button variant="defaultOutline" className="text-rose-500">
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
      </Button>
    </Link>
  </div>
);

export default UserProgress;
