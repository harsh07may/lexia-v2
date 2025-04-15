import { signIn } from "@/server/auth";
import { Button } from "./ui/button";

export default function SignIn({ mode }: { mode: "SIGNIN" | "SIGNUP" }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button
        size="lg"
        type="button"
        variant={mode == "SIGNIN" ? "secondary" : "primaryOutline"}
      >
        {mode == "SIGNIN" ? "Get Started" : "I already have an account"}
      </Button>
    </form>
  );
}
