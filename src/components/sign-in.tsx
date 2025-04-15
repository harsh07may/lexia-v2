import { signIn } from "@/server/auth";
import { Button } from "./ui/button";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button className="cursor-pointer" type="button" variant="danger">
        Signin with GitHub
      </Button>
    </form>
  );
}
