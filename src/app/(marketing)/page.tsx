import SignIn from "@/components/sign-in";
import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/server/auth";
import Image from "next/image";
import Link from "next/link";

/**
 * Home page of the application. It contains a hero image, headers and auth button.
 * @link  https://www.figma.com/design/o7kLTNBD54bhmvPScLiDAL/Lexia-%7C-Language-Learning?node-id=1-2116&m=dev
 */
const HomePage = async () => {
  const session = await auth();
  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-1 flex-col items-center justify-center gap-2 px-6 py-4 lg:flex-row">
      <div className="relative mb-8 h-[240px] w-[540px] lg:mb-0 lg:h-[424px] lg:w-[424px]">
        <Image fill src="/hero.svg" alt="Hero" />
      </div>

      <div className="flex flex-col items-center gap-y-8">
        <div className="flex max-w-fit items-center justify-center rounded-full border border-neutral-200 bg-white/75 px-5 py-1 shadow-md backdrop-blur transition-all hover:border-neutral-300">
          <Link
            target="_blank"
            referrerPolicy="no-referrer"
            href="https://github.com/harsh07may/lexia"
            className="text-sm font-semibold text-neutral-700"
          >
            Star on GitHub 🌟
          </Link>
        </div>

        <h1 className="-mt-4 max-w-[480px] text-center text-xl font-bold text-neutral-600 lg:text-3xl">
          Learn, refine, and master your language skills with Lingo.
        </h1>

        <div className="flex w-full max-w-[330px] flex-col items-center gap-y-3">
          {/* <ClerkLoading>
            <SignedOut>
              <div className="flex flex-col gap-y-3">
                <div className="ring-border h-[48px] w-[330px] animate-pulse rounded-xl bg-gray-200 ring" />

                <div className="ring-border flex h-[48px] w-[330px] items-center justify-center rounded-xl ring">
                  <div className="h-5 w-56 animate-pulse rounded-xl bg-gray-200" />
                </div>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="ring-border h-[48px] w-[330px] animate-pulse rounded-xl bg-gray-200 ring" />
            </SignedIn>
          </ClerkLoading> */}

          {!session && (
            <>
              <SignIn mode="SIGNIN" />
              <SignIn mode="SIGNUP" />
            </>
          )}

          {session && (
            <Button size="lg" variant="secondary" className="w-full" asChild>
              <Link href="/learn">Continue Learning</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
