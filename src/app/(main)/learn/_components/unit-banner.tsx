import Link from "next/link";
import { cn } from "@/lib/utils";
import { NotebookText } from "lucide-react";

import { Button } from "@/components/ui/button";

type UnitBannerProps = {
  title: string;
  description: string;
  access: boolean;
};

const UnitBanner = ({ title, description, access }: UnitBannerProps) => (
  <div
    className={cn(
      "flex w-full items-center justify-between gap-2 rounded-xl bg-green-500 p-5 text-white",
      {
        "bg-neutral-200 text-neutral-400": !access,
      },
    )}
  >
    <div className="space-y-1.5">
      <h3 className="text-xl font-bold lg:text-2xl">{title}</h3>
      <p className="text-base lg:text-lg">{description}</p>
    </div>

    <Link
      href="/lesson"
      aria-disabled={!access}
      className={cn("self-start", {
        "pointer-events-none": !access,
      })}
    >
      <Button
        size="sm"
        variant={!access ? "locked" : "secondary"}
        disabled={!access}
        className={cn("flex border-2 border-b-4 active:border-b-2", {
          "border-neutral-500 text-neutral-400": !access,
        })}
      >
        <NotebookText className="h-4 w-4 lg:mr-2" />
        <span className="hidden lg:block">Continue</span>
      </Button>
    </Link>
  </div>
);

export default UnitBanner;
