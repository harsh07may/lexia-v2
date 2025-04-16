import Sidebar from "@/components/shared/sidebar";
import type { PropsWithChildren } from "react";
// import { MobileHeader, Sidebar } from "@/components";

const MainLayout = ({ children }: PropsWithChildren) => (
  <>
    {/* <MobileHeader /> */}
    <Sidebar className="hidden md:flex" />

    <main className="h-full pt-[60px] md:pt-0 md:pl-[225px] lg:pl-[256px]">
      <div className="mx-auto h-full max-w-[1056px]">{children}</div>
    </main>
  </>
);

export default MainLayout;
