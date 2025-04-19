// app/quests/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col px-6 md:flex-row md:gap-4 lg:gap-[48px]">
      <div className="sticky top-[60px] z-50 border-b-2 bg-white py-3 md:hidden">
        <Skeleton className="h-[90px] w-full rounded-md" />
      </div>

      <div className="flex flex-1 flex-col items-center">
        <Skeleton className="mt-10 h-[90px] w-[90px] rounded-full" />
        <Skeleton className="my-6 h-8 w-40" />
        <Skeleton className="mb-6 h-5 w-72" />

        <div className="flex w-full flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex w-full items-center gap-x-4 border-t-2 p-4"
            >
              <Skeleton className="h-[60px] w-[60px] rounded-full" />
              <div className="flex w-full flex-col gap-y-2">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 hidden md:block">
        <Skeleton className="h-[200px] w-[250px]" />
      </div>
    </div>
  );
}
