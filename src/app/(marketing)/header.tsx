import { auth, signIn } from "@/server/auth";
import { Button } from "@/components/ui/button";
import UserButton from "@/components/user-button";
import Image from "next/image";

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
          {session && <UserButton session={session} />}

          {/* On Signout, show sign-in button */}
          {!session && (
            <form
              action={async () => {
                "use server";
                await signIn();
              }}
            >
              <Button type="submit" variant="primary">
                Sign In
              </Button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
