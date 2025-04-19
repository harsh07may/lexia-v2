import { auth } from "@/server/auth";
import MobileSidebar from "./mobile-sidebar";
import UserButton from "./user-button";

async function MobileHeader() {
  const session = await auth();
  return (
    <nav className="fixed top-0 z-50 flex h-[60px] w-full items-center justify-between border-b bg-green-500 px-6 md:hidden">
      <MobileSidebar />

      <div className="flex gap-4">
        {/* TODO */}
        {/* <ClerkLoading>
          <SignedIn>
            <Button
              disabled
              size="rounded"
              className="ring-border h-[36px] w-[36px] animate-pulse bg-gray-200 ring"
            />
          </SignedIn>
        </ClerkLoading> */}

        {session && (
          <div>
            <div>
              <UserButton session={session} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
export default MobileHeader;
