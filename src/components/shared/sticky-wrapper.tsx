import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const StickyWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <div
    className={cn(
      "sticky bottom-6 hidden min-h-[calc(100svh-48px)] self-end md:block md:w-[210px] lg:w-[256px] xl:w-[368px]",
      className,
    )}
  >
    <div className="sticky top-6 flex flex-col gap-y-4">{children}</div>
  </div>
);

export default StickyWrapper;
