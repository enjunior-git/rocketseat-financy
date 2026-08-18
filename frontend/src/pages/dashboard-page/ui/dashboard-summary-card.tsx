import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import type { SummaryCard as SummaryCardData } from "../model/dashboard-summary";

const summaryToneClassNames = {
  purple: "text-[var(--purple-base)]",
  green: "text-[var(--green-dark)]",
  red: "text-[var(--red-base)]",
} as const;

function DashboardSummaryCard({ amount, icon: Icon, label, tone }: SummaryCardData) {
  return (
    <Card className="gap-0 overflow-visible rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-6 py-6 ring-0">
      <div className="flex items-center gap-3">
        <Icon
          aria-hidden="true"
          className={cn("size-4 shrink-0 stroke-[1.75]", summaryToneClassNames[tone])}
        />
        <span className="text-xs leading-4 font-semibold tracking-[0.08em] text-[var(--gray-500)] uppercase">
          {label}
        </span>
      </div>

      <p className="mt-5 text-[28px] leading-9 font-bold text-[var(--gray-800)]">{amount}</p>
    </Card>
  );
}

function DashboardSummaryCardSkeleton() {
  return (
    <Card className="gap-0 overflow-visible rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-6 py-6 ring-0">
      <div className="flex items-center gap-3">
        <Skeleton className="size-4 shrink-0" />
        <Skeleton className="h-4 w-32" />
      </div>

      <Skeleton className="mt-5 h-9 w-44" />
    </Card>
  );
}

export { DashboardSummaryCard, DashboardSummaryCardSkeleton };
