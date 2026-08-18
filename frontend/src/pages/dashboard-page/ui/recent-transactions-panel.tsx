import { CircleArrowDown, CircleArrowUp, Plus } from "lucide-react";

import { TransactionFormDialog } from "@/features/transaction/save-transaction";
import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { Tag } from "@/shared/ui/tag";
import type { RecentTransaction } from "../model/dashboard-summary";
import { DashboardSectionHeader } from "./dashboard-section-header";

type RecentTransactionsPanelProps = {
  errorMessage?: string;
  isError: boolean;
  isLoading: boolean;
  transactions: RecentTransaction[];
};

function RecentTransactionsPanel({
  errorMessage,
  isError,
  isLoading,
  transactions,
}: RecentTransactionsPanelProps) {
  return (
    <Card className="gap-0 overflow-hidden rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] py-0 ring-0">
      <DashboardSectionHeader
        title="Recent transactions"
        actionTo="/transactions"
        actionLabel="View all"
      />

      <div>
        {isLoading ? <RecentTransactionsSkeleton /> : null}

        {isError && errorMessage ? <DashboardStatus message={errorMessage} /> : null}

        {!isLoading && !isError && transactions.length === 0 ? (
          <DashboardStatus message="No transactions yet." />
        ) : null}

        {transactions.map((transaction) => (
          <TransactionRow key={`${transaction.description}-${transaction.date}`} {...transaction} />
        ))}
      </div>

      <TransactionFormDialog
        mode="create"
        trigger={
          <button
            type="button"
            className="flex h-16 w-full items-center justify-center gap-2 border-t border-[var(--gray-200)] text-sm leading-5 font-medium text-[var(--brand-base)] transition-colors hover:bg-[var(--green-light)] focus-visible:ring-2 focus-visible:ring-[var(--brand-base)] focus-visible:outline-none"
          >
            <Plus aria-hidden="true" className="size-4 stroke-[1.75]" />
            New transaction
          </button>
        }
      />
    </Card>
  );
}

function DashboardStatus({ message }: { message: string }) {
  return (
    <div className="border-b border-[var(--gray-200)] px-6 py-8 last:border-b-0">
      <p className="text-sm leading-5 text-[var(--gray-600)]">{message}</p>
    </div>
  );
}

function TransactionRow({
  amount,
  category,
  categoryVariant,
  date,
  description,
  icon: Icon,
  iconClassName,
  type,
}: RecentTransaction) {
  const TypeIcon = type === "income" ? CircleArrowUp : CircleArrowDown;

  return (
    <article className="grid min-h-[82px] grid-cols-[auto_minmax(0,1fr)] items-center gap-4 border-b border-[var(--gray-200)] px-6 last:border-b-0 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto]">
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-[8px] [&_svg]:size-4 [&_svg]:stroke-[1.75]",
          iconClassName,
        )}
      >
        <Icon aria-hidden="true" />
      </span>

      <div className="min-w-0">
        <h3 className="truncate text-base leading-6 font-medium text-[var(--gray-800)]">
          {description}
        </h3>
        <p className="text-sm leading-5 text-[var(--gray-500)]">{date}</p>
      </div>

      <Tag variant={categoryVariant} className="hidden sm:inline-flex">
        {category}
      </Tag>

      <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:justify-end">
        <Tag variant={categoryVariant} className="sm:hidden">
          {category}
        </Tag>

        <div className="flex min-w-[132px] items-center justify-end gap-2">
          <strong className="text-sm leading-5 font-bold text-[var(--gray-800)]">{amount}</strong>
          <TypeIcon
            aria-hidden="true"
            className={cn(
              "size-4 shrink-0 stroke-[1.75]",
              type === "income" ? "text-[var(--green-dark)]" : "text-[var(--red-base)]",
            )}
          />
        </div>
      </div>
    </article>
  );
}

function RecentTransactionsSkeleton() {
  return (
    <>
      {[160, 220, 184, 240, 176].map((width) => (
        <article
          key={width}
          className="grid min-h-[82px] grid-cols-[auto_minmax(0,1fr)] items-center gap-4 border-b border-[var(--gray-200)] px-6 last:border-b-0 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto]"
        >
          <Skeleton className="size-10 shrink-0" />

          <div className="min-w-0">
            <Skeleton className="h-5 max-w-full" style={{ width }} />
            <Skeleton className="mt-2 h-4 w-20" />
          </div>

          <Skeleton className="hidden h-7 w-24 sm:block" />
          <Skeleton className="h-5 w-28 justify-self-end" />
        </article>
      ))}
    </>
  );
}

export { RecentTransactionsPanel };
