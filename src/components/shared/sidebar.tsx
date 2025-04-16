import Link from "next/link";
import Image from "next/image";
import { auth } from "@/server/auth";
import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";
import UserButton from "./user-button";
import SidebarItem from "./sidebar-item";
import { sidebarItems } from "@/constants";

type SidebarProps = {
  className?: string;
};

const Sidebar = async ({ className }: SidebarProps) => {
  const session = await auth();
  const user = session?.user;

  return (
    <div
      className={cn(
        "top-0 left-0 flex h-full flex-col border-r-2 px-4 md:fixed md:w-[225px] lg:w-[256px]",
        className,
      )}
    >
      <Link href="/learn">
        <div className="flex items-center gap-x-3 px-4 py-8">
          <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />

          <h1 className="text-3xl font-extrabold tracking-wide text-green-600">
            Lexia
          </h1>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-y-2">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            href={item.href}
            iconSrc={item.iconSrc}
          />
        ))}
      </div>

      <Separator className="h-1" />

      <div className="mt-4 flex flex-col gap-y-4">
        <div className="mb-4 flex items-center justify-center gap-x-2">
          {/* <ClerkLoading>
            <SignedIn>
              <Button
                disabled
                size="rounded"
                className="ring-border h-[40px] w-[40px] animate-pulse bg-gray-200 ring"
              />

              <div className="flex h-[52px] w-[158px] flex-col gap-y-1 p-2">
                <div className="h-16 animate-pulse rounded-xl bg-gray-200" />
                <div className="h-12 animate-pulse rounded-xl bg-gray-200" />
              </div>
            </SignedIn>
          </ClerkLoading> */}
          <div>
            {user && (
              <div className="flex w-full rounded-md">
                <UserButton session={session} />

                <div className="flex w-full flex-col p-2">
                  <span className="text-sm font-bold">
                    {user?.name ?? "Anon"}
                  </span>

                  <span className="text-xs font-semibold">{user.email}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
