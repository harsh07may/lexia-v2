import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";

const LessonLayout = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  if (!session) redirect("/");
  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-full w-full flex-col gap-6">{children}</div>
    </div>
  );
};

export default LessonLayout;
