import { type PropsWithChildren } from "react";

const LessonLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-full w-full flex-col gap-6">{children}</div>
    </div>
  );
};

export default LessonLayout;
