import Link from "next/link";
import SignIn from "../components/sign-in";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <SignIn />
    </main>
  );
}
