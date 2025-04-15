import Image from "next/image";

import { Loader2 } from "lucide-react";

import { auth } from "@/server/auth";
import SignIn from "@/components/sign-in";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = async () => {
  const session = await auth();

  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="mx-auto flex h-full items-center justify-between lg:max-w-screen-lg">
        <div className="flex items-center gap-x-3 pt-8 pb-7 pl-4">
          <Image src={"/mascot.svg"} height={40} width={40} alt="mascot" />
          <h1 className="text-2xl font-extrabold tracking-wide text-green-500">
            Lexia
          </h1>
        </div>
        {/* On Loading */}
        {/* <ClerkLoading>
          <Loader2 className="text-muted-foreground h-5 w-5 animate-spin" />
        </ClerkLoading> */}

        {/* After Loaded, show User button*/}
        <div className="flex items-center gap-2">
          {session && (
            <Avatar>
              <AvatarImage src={session.user.image ?? undefined} />
              <AvatarFallback>
                <Image
                  src="/mascot.svg"
                  height={10}
                  width={10}
                  alt="user-img"
                />
              </AvatarFallback>
            </Avatar>
          )}

          {/* On Signout, show sign-in button */}
          {!session && <SignIn mode="SIGNIN" />}
        </div>
      </div>
    </header>
  );
};
export default Header;
