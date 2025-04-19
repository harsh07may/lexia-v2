// app/labs/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function LabsLoading() {
  return (
    <div className="flex flex-col px-6 md:flex-row md:gap-4 lg:gap-[12px]">
      {/* Sticky Mobile Progress */}
      <div className="sticky top-[60px] z-50 border-b-2 bg-white py-3 md:hidden">
        <Skeleton className="h-[90px] w-full rounded-md" />
      </div>

      {/* Main Feed */}
      <div className="mt-7 flex w-full flex-1 flex-col items-center">
        <Skeleton className="h-[90px] w-[90px] rounded-full" />
        <Skeleton className="my-6 h-8 w-40" />
        <Skeleton className="mb-6 h-5 w-72" />
        <Skeleton className="mb-4 h-1 w-full rounded-full" />

        <div className="mb-8 grid w-full gap-4 py-10 lg:grid-cols-2">
          {/* Writing Lab Skeleton */}
          <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <Skeleton className="mb-4 h-12 w-12 rounded-full" />
            <Skeleton className="mb-2 h-5 w-24" />
            <Skeleton className="mb-4 h-4 w-40" />
            <Skeleton className="h-10 w-24" />
          </div>

          {/* Coming Soon Lab Skeleton */}
          <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 opacity-70 shadow-sm">
            <Skeleton className="mb-4 h-12 w-12 rounded-full" />
            <Skeleton className="mb-2 h-5 w-24" />
            <Skeleton className="mb-4 h-4 w-40" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      {/* Sidebar Sticky */}
      <div className="mt-6 hidden w-[250px] space-y-4 md:block">
        <Skeleton className="h-[90px] w-full rounded-md" />
        <Skeleton className="h-[150px] w-full rounded-md" />
      </div>
    </div>
  );
}
