import Image from "next/image";

import { cn } from "@/lib/utils";

type ResultCardProps = {
  value: number;
  variant: "points" | "hearts";
};

const ResultCard = ({ value, variant }: ResultCardProps) => {
  const imageSrc =
    variant === "hearts" ? "/icons/heart.svg" : "/icons/points.svg";

  return (
    <div
      className={cn("w-full rounded-2xl border-2", {
        "border-orange-400 bg-orange-400": variant === "points",
        "border-rose-500 bg-rose-500": variant === "hearts",
      })}
    >
      <div
        className={cn(
          "rounded-t-xl p-1.5 text-center text-xs font-bold text-white uppercase",
          {
            "bg-rose-500": variant === "hearts",
            "bg-orange-400": variant === "points",
          },
        )}
      >
        {variant === "hearts" ? "Hearts Left" : "Earned XP"}
      </div>

      <div
        className={cn(
          "flex items-center justify-center rounded-2xl bg-white p-6 text-lg font-bold",
          {
            "text-rose-500": variant === "hearts",
            "text-orange-400": variant === "points",
          },
        )}
      >
        <Image
          src={imageSrc}
          alt="Icon"
          height={30}
          width={30}
          className="mr-1.5"
        />

        {value}
      </div>
    </div>
  );
};

export default ResultCard;
