// app/leaderboard/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col px-6 md:flex-row md:gap-4 lg:gap-[48px]">
      {/* Top sticky UserProgress for mobile */}
      <div className="sticky top-[60px] z-50 border-b-2 bg-white py-3 md:hidden">
        <Skeleton className="h-[90px] w-full rounded-md" />
      </div>

      {/* Main Feed */}
      <div className="mt-7 flex w-full flex-1 flex-col items-center">
        <Skeleton className="h-[90px] w-[90px] rounded-full" />
        <Skeleton className="my-6 h-8 w-40" />
        <Skeleton className="mb-6 h-5 w-72" />
        <Skeleton className="mb-4 h-1 w-full rounded-full" />

        {/* Fake Top 10 leaderboard entries */}
        <div className="flex w-full flex-col gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex w-full items-center justify-between gap-4 rounded-xl p-2 px-4"
            >
              <Skeleton className="h-5 w-5" />

              <div className="flex w-[87%] items-center gap-2 md:w-[84%] lg:w-[90%]">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-5 flex-1" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Sidebar */}
      <div className="mt-6 hidden md:block">
        <Skeleton className="h-[200px] w-[250px]" />
      </div>
    </div>
  );
}
