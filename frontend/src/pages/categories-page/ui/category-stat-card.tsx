import type { CategoryStat } from "@/entities/category";
import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

function CategoryStatCard({ helper, icon: Icon, iconClassName, value }: CategoryStat) {
  return (
    <Card className="min-h-[108px] flex-row items-center gap-5 overflow-visible rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-6 py-0 ring-0">
      <Icon aria-hidden="true" className={cn("size-5 shrink-0 stroke-[1.75]", iconClassName)} />

      <div>
        <p className="text-[28px] leading-9 font-bold text-[var(--gray-800)]">{value}</p>
        <p className="mt-1 text-xs leading-4 font-semibold tracking-[0.08em] text-[var(--gray-500)] uppercase">
          {helper}
        </p>
      </div>
    </Card>
  );
}

function CategoryStatCardSkeleton() {
  return (
    <Card className="min-h-[108px] flex-row items-center gap-5 overflow-visible rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-6 py-0 ring-0">
      <Skeleton className="size-5 shrink-0" />

      <div className="w-full">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="mt-2 h-4 w-36" />
      </div>
    </Card>
  );
}

export { CategoryStatCard, CategoryStatCardSkeleton };
