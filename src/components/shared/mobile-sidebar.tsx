import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { getUserSubscription } from "@/server/db/queries";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
// import { Promo } from "@/components";
import { sidebarItems } from "@/constants";
import Promo from "./promo";

const MobileSidebar = async () => {
  const userSubscriptionData = getUserSubscription();
  const [userSubscription] = await Promise.all([userSubscriptionData]);
  const isPro = !!userSubscription?.isActive;

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="h-9 w-9 text-white" />
      </SheetTrigger>
      <SheetContent
        className="z-[100] flex h-full flex-col border-r-2 p-0 px-4"
        side="left"
      >
        <SheetTitle className="hidden">Menu</SheetTitle>
        <SheetClose asChild>
          <Link href="/learn">
            <div className="flex items-center gap-x-3 px-4 py-8">
              <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />

              <h1 className="text-3xl font-extrabold tracking-wide text-green-600">
                Lexia
              </h1>
            </div>
          </Link>
        </SheetClose>

        <div className="flex flex-1 flex-col gap-y-2">
          {sidebarItems.map((item, i) => (
            <SheetClose asChild key={i}>
              <Link
                href={item.href}
                className={cn(
                  buttonVariants({
                    variant: "sidebarOutline",
                    className: "h-[52px] justify-start",
                  }),
                )}
              >
                <Image
                  alt={item.label}
                  src={item.iconSrc}
                  height={32}
                  width={32}
                  className="mr-5 md:mr-3 lg:mr-5"
                />

                {item.label}
              </Link>
            </SheetClose>
          ))}
        </div>

        <Promo
          className={cn("mb-4", {
            hidden: isPro,
          })}
        />
      </SheetContent>
    </Sheet> 
  );
};

export default MobileSidebar;
