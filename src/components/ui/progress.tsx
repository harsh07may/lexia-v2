"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { DEFAULT_POINTS_START } from "@/constants";
import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  indicatorClassName,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  indicatorClassName?: string;
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-secondary relative h-4 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full w-full flex-1 bg-green-500 transition-all",
          indicatorClassName,
        )}
        style={{
          transform: `translateX(-${100 - (value ?? DEFAULT_POINTS_START)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
