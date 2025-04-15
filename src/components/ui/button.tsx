import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-white hover:bg-slate-100 text-slate-500 border-slate-200 border-2 border-b-4 active:border-b-2",

        defaultOutline:
          "bg-transparent hover:bg-slate-100 text-slate-500 border-transparent border-0",

        primary:
          "bg-sky-400 hover:bg-sky-400/90 text-primary-foreground border-sky-500 border-b-4 active:border-b-0",

        primaryOutline: "bg-transparent hover:bg-slate-100 text-sky-500",

        secondary:
          "bg-green-500 hover:bg-green-500/90 text-primary-foreground border-green-600 border-b-4 active:border-b-0",

        secondaryOutline: "bg-transparent hover:bg-slate-100 text-green-500",

        danger:
          "bg-rose-500 hover:bg-rose-500/90 text-primary-foreground border-rose-600 border-b-4 active:border-b-0",

        dangerOutline: "bg-transparent hover:bg-slate-100 text-rose-500",

        super:
          "bg-indigo-500 hover:bg-indigo-500/90 text-primary-foreground border-indigo-600 border-b-4 active:border-b-0",

        superOutline: "bg-transparent hover:bg-slate-100 text-indigo-500",

        sidebar:
          "bg-sky-500/15 hover:bg-sky-500/20 text-sky-500 border-sky-300 border-2 transition-none",

        sidebarOutline:
          "bg-transparent hover:bg-slate-100 text-slate-500 border-2 border-transparent transition-none",

        locked:
          "bg-neutral-200 hover:bg-neutral-200/90 text-primary-foreground border-neutral-400 border-b-4 active:border-b-0",
      },
      size: {
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full",
        default: "h-11 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
