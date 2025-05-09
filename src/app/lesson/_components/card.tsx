import Image from "next/image";
import { useCallback } from "react";
import { useAudio, useKey } from "react-use";

import { cn } from "@/lib/utils";
import type { Challenge } from "@prisma/client";

type CardProps = {
  text: string;
  imageSrc: string | null;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  status?: "correct" | "wrong" | "none";
  audioSrc: string | null;
  disabled?: boolean;
  type: Challenge["type"];
};

const Card = ({
  text,
  imageSrc,
  shortcut,
  selected,
  onClick,
  status,
  audioSrc,
  disabled,
  type,
}: CardProps) => {
  const [audio, , controls] = useAudio({ src: audioSrc ?? "" });

  // useCallback() hook returns a memoized version of `handleClick` that only changes if one of the dependencies has changed
  // memoization is essential here because `handleClick` is being used as a dependency in another hook
  const handleClick = useCallback(() => {
    if (disabled) return;

    void controls.play();
    onClick();
  }, [disabled, onClick, controls]);

  // it is important for `useKey` to provide a stable reference to the callback function
  // useCallback() hook ensures that the `handleClick` reference remains stable across renders unless its dependencies change
  useKey(shortcut, handleClick, {}, [handleClick]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full cursor-pointer rounded-xl border-2 border-b-4 p-4 hover:bg-black/5 active:border-b-2 lg:p-6",
        {
          "border-sky-300 bg-sky-100 hover:bg-sky-100": selected,
          "border-green-300 bg-green-100 hover:bg-green-100":
            selected && status === "correct",
          "border-rose-300 bg-rose-100 hover:bg-rose-100":
            selected && status === "wrong",
          "pointer-events-none hover:bg-white": disabled,
          "w-full lg:p-3": type === "ASSIST",
        },
      )}
    >
      {audio}

      {imageSrc && (
        <div className="relative mb-4 aspect-square max-h-[80px] w-full lg:max-h-[150px]">
          <Image fill src={imageSrc} alt={text} />
        </div>
      )}

      <div
        className={cn("flex items-center justify-between", {
          "flex-row-reverse": type === "ASSIST",
        })}
      >
        {type === "ASSIST" && <div />}

        <p
          className={cn("text-sm text-neutral-600 lg:text-base", {
            "text-sky-500": selected,
            "text-green-500": selected && status === "correct",
            "text-rose-500": selected && status === "wrong",
          })}
        >
          {text}
        </p>

        <div
          className={cn(
            "flex h-[20px] w-[20px] items-center justify-center rounded-lg border-2 text-xs font-semibold text-neutral-400 lg:h-[30px] lg:w-[30px] lg:text-[15px]",
            {
              "border-sky-300 text-sky-500": selected,
              "border-green-500 text-green-500":
                selected && status === "correct",
              "border-rose-500 text-rose-500": selected && status === "wrong",
            },
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  );
};

export default Card;
