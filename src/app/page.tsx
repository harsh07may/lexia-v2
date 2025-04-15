import Link from "next/link";
import SignIn from "./api/sign-in";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <SignIn />
    </main>
  );
}
