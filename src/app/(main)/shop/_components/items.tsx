"use client";

import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DEFAULT_HEARTS_MAX, POINTS_TO_REFILL } from "@/constants";
import { refillHearts } from "@/server/actions/user-progress";

type ItemsProps = {
  hearts: number;
  points: number;
};

const RefillButton = ({ hearts, points }: ItemsProps) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === DEFAULT_HEARTS_MAX || points < POINTS_TO_REFILL) {
      return;
    }

    startTransition(() => {
      refillHearts().catch(() => toast.error("Something went wrong."));
    });
  };

  return (
    <div className="flex w-full flex-col items-center gap-x-4 gap-y-4 border-t-2 p-4 lg:flex-row">
      <Image src="/icons/heart.svg" alt="Heart" height={60} width={60} />

      <div className="flex-1">
        <p className="text-base font-bold text-neutral-700 lg:text-xl">
          Refill hearts
        </p>
      </div>

      <Button
        size="sm"
        onClick={onRefillHearts}
        disabled={
          pending || hearts === DEFAULT_HEARTS_MAX || points < POINTS_TO_REFILL
        }
      >
        {hearts === DEFAULT_HEARTS_MAX ? (
          "full"
        ) : (
          <div className="flex items-center">
            <Image src="/points.svg" alt="Points" height={20} width={20} />
            <p>{POINTS_TO_REFILL}</p>
          </div>
        )}
      </Button>
    </div>
  );
};

export default RefillButton;
