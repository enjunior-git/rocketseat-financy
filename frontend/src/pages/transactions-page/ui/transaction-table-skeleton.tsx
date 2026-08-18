import { Skeleton } from "@/shared/ui/skeleton";

function TransactionTableSkeletonRows() {
  return (
    <>
      {[230, 180, 260, 210, 240].map((width) => (
        <tr key={width} className="h-[74px] border-b border-[var(--gray-200)] last:border-b-0">
          <td className="px-6">
            <div className="flex min-w-0 items-center gap-4">
              <Skeleton className="size-10 shrink-0" />
              <Skeleton className="h-5 max-w-full" style={{ width }} />
            </div>
          </td>
          <td className="px-6">
            <Skeleton className="mx-auto h-5 w-20" />
          </td>
          <td className="px-6">
            <Skeleton className="mx-auto h-7 w-24" />
          </td>
          <td className="px-6">
            <Skeleton className="mx-auto h-5 w-24" />
          </td>
          <td className="px-6">
            <Skeleton className="ml-auto h-5 w-24" />
          </td>
          <td className="px-6">
            <div className="ml-auto flex w-20 items-center justify-end gap-2">
              <Skeleton className="size-8" />
              <Skeleton className="size-8" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export { TransactionTableSkeletonRows };
