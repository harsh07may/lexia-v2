import { signIn } from "@/server/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <button className="cursor-pointer" type="submit">
        Signin with GitHub
      </button>
    </form>
  );
}
