// import Sidebar from "@/components/shared/sidbar";
import { MobileHeader, Sidebar } from "@/components/shared";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

const MainLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  if (!session) redirect("/");
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden md:flex" />

      <main className="h-full pt-[60px] md:pt-0 md:pl-[225px] lg:pl-[256px]">
        <div className="mx-auto h-full max-w-[1056px]">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
