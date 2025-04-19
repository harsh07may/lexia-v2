import { cn } from "@/lib/utils";

import type { Challenge, ChallengeOption } from "@prisma/client";
import Card from "./card";

type ChallengeProps = {
  options: ChallengeOption[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  disabled?: boolean;
  selectedOption?: number;
  type: Challenge["type"];
};

const ChallengeSection = ({
  options,
  onSelect,
  status,
  disabled,
  selectedOption,
  type,
}: ChallengeProps) => {
  return (
    <div
      className={cn("grid gap-2", {
        "grid-cols-1": type === "ASSIST",
        "grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))]":
          type === "SELECT",
      })}
    >
      {options.map((option, i) => (
        <Card
          key={option.id}
          text={option.text}
          imageSrc={option.imageSrc}
          shortcut={`${i + 1}`}
          selected={selectedOption === option.id}
          onClick={() => onSelect(option.id)}
          status={status}
          audioSrc={option.audioSrc}
          disabled={disabled}
          type={type}
        />
      ))}
    </div>
  );
};

export default ChallengeSection;
