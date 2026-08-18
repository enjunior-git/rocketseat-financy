import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { Tag } from "@/shared/ui/tag";
import type { DashboardCategorySummary } from "../model/dashboard-summary";
import { DashboardSectionHeader } from "./dashboard-section-header";

type CategorySummaryPanelProps = {
  categories: DashboardCategorySummary[];
  errorMessage?: string;
  isError: boolean;
  isLoading: boolean;
};

function CategorySummaryPanel({
  categories,
  errorMessage,
  isError,
  isLoading,
}: CategorySummaryPanelProps) {
  return (
    <Card className="h-fit gap-0 overflow-hidden rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] py-0 ring-0">
      <DashboardSectionHeader title="Categories" actionTo="/categories" actionLabel="Manage" />

      <div className="flex flex-col gap-4 px-6 py-6">
        {isLoading ? <DashboardCategoriesSkeleton /> : null}

        {isError && errorMessage ? (
          <p className="text-sm leading-5 text-[var(--gray-600)]">{errorMessage}</p>
        ) : null}

        {!isLoading && !isError && categories.length === 0 ? (
          <p className="text-sm leading-5 text-[var(--gray-600)]">No categories yet.</p>
        ) : null}

        {categories.map((category) => (
          <div
            key={category.title}
            className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-5"
          >
            <Tag variant={category.variant} className="justify-self-start">
              {category.title}
            </Tag>
            <span className="text-sm leading-5 text-[var(--gray-600)]">{category.items}</span>
            <strong className="text-sm leading-5 font-bold text-[var(--gray-800)]">
              {category.amount}
            </strong>
          </div>
        ))}
      </div>
    </Card>
  );
}

function DashboardCategoriesSkeleton() {
  return (
    <>
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-5">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-20" />
        </div>
      ))}
    </>
  );
}

export { CategorySummaryPanel };
