import { Link, type LinkProps } from "@tanstack/react-router";
import {
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  Plus,
  WalletCards,
} from "lucide-react";

import {
  categoryIconToneByColor,
  formatTransactionCount,
  getCategoryColor,
  getCategoryIcon,
} from "@/entities/category";
import {
  formatCurrency,
  formatDate,
  formatSignedCurrency,
} from "@/entities/transaction";
import { useTransactionSummaryQuery } from "@/entities/transaction";
import { useTransactionsQuery } from "@/entities/transaction";
import { TransactionFormDialog } from "@/features/transaction/save-transaction";
import type { CategoryTransactionSummary, Transaction, TransactionSummary } from "@/shared/api/types";
import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { Tag, type TagProps } from "@/shared/ui/tag";

type SummaryCard = {
  amount: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  tone: "purple" | "green" | "red";
};

type RecentTransaction = {
  amount: string;
  category: string;
  categoryVariant: TagProps["variant"];
  date: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconClassName: string;
  type: "income" | "expense";
};

type DashboardCategorySummary = {
  amount: string;
  items: string;
  title: string;
  variant: TagProps["variant"];
};

const summaryToneClassNames = {
  purple: "text-[var(--purple-base)]",
  green: "text-[var(--green-dark)]",
  red: "text-[var(--red-base)]",
} as const;

const getSummaryCards = (summary?: TransactionSummary): SummaryCard[] => [
  {
    label: "Total balance",
    amount: formatCurrency(summary?.totalBalance ?? 0),
    icon: WalletCards,
    tone: "purple",
  },
  {
    label: "Monthly income",
    amount: formatCurrency(summary?.totalIncomeMonthly ?? 0),
    icon: CircleArrowUp,
    tone: "green",
  },
  {
    label: "Monthly expenses",
    amount: formatCurrency(summary?.totalExpensesMonthly ?? 0),
    icon: CircleArrowDown,
    tone: "red",
  },
];

const toRecentTransaction = (transaction: Transaction): RecentTransaction => {
  const categoryVariant = getCategoryColor(transaction.category?.colour);

  return {
    amount: formatSignedCurrency(transaction.amount, transaction.type),
    category: transaction.category?.title ?? "Uncategorized",
    categoryVariant,
    date: formatDate(transaction.date),
    description: transaction.description,
    icon: getCategoryIcon(transaction.category?.icon),
    iconClassName: categoryIconToneByColor[categoryVariant],
    type: transaction.type,
  };
};

const toCategorySummary = (category: CategoryTransactionSummary): DashboardCategorySummary => ({
  amount: formatCurrency(category.totalExpensesAmount),
  items: formatTransactionCount(category.transactionsAmount),
  title: category.title,
  variant: getCategoryColor(category.colour),
});

function DashboardPage() {
  const transactionsQuery = useTransactionsQuery();
  const summaryQuery = useTransactionSummaryQuery();
  const summaryCards = getSummaryCards(summaryQuery.data);
  const recentTransactions = (transactionsQuery.data ?? [])
    .slice(-5)
    .reverse()
    .map(toRecentTransaction);
  const categories = (summaryQuery.data?.categories ?? []).map(toCategorySummary);

  return (
    <section className="mx-auto grid w-full max-w-[1280px] gap-6 px-6 py-12 sm:px-10">
      <div className="grid gap-6 lg:grid-cols-3">
        {summaryQuery.isLoading
          ? ["Total balance", "Monthly income", "Monthly expenses"].map((label) => (
              <SummaryCardSkeleton key={label} />
            ))
          : summaryCards.map((card) => <SummaryCard key={card.label} {...card} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <Card className="gap-0 overflow-hidden rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] py-0 ring-0">
          <DashboardSectionHeader
            title="Recent transactions"
            actionTo="/transactions"
            actionLabel="View all"
          />

          <div>
            {transactionsQuery.isLoading ? <RecentTransactionsSkeleton /> : null}

            {transactionsQuery.isError ? (
              <DashboardStatus message={transactionsQuery.error.message} />
            ) : null}

            {!transactionsQuery.isLoading &&
            !transactionsQuery.isError &&
            recentTransactions.length === 0 ? (
              <DashboardStatus message="No transactions yet." />
            ) : null}

            {recentTransactions.map((transaction) => (
              <TransactionRow
                key={`${transaction.description}-${transaction.date}`}
                {...transaction}
              />
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

        <Card className="h-fit gap-0 overflow-hidden rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] py-0 ring-0">
          <DashboardSectionHeader title="Categories" actionTo="/categories" actionLabel="Manage" />

          <div className="flex flex-col gap-4 px-6 py-6">
            {summaryQuery.isLoading ? <DashboardCategoriesSkeleton /> : null}

            {summaryQuery.isError ? (
              <p className="text-sm leading-5 text-[var(--gray-600)]">
                {summaryQuery.error.message}
              </p>
            ) : null}

            {!summaryQuery.isLoading && !summaryQuery.isError && categories.length === 0 ? (
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
      </div>
    </section>
  );
}

function DashboardStatus({ message }: { message: string }) {
  return (
    <div className="border-b border-[var(--gray-200)] px-6 py-8 last:border-b-0">
      <p className="text-sm leading-5 text-[var(--gray-600)]">{message}</p>
    </div>
  );
}

function SummaryCard({ amount, icon: Icon, label, tone }: SummaryCard) {
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

function SummaryCardSkeleton() {
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

function DashboardSectionHeader({
  actionLabel,
  actionTo,
  title,
}: {
  actionLabel: string;
  actionTo: LinkProps["to"];
  title: string;
}) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[var(--gray-200)] px-6">
      <h2 className="text-xs leading-4 font-semibold tracking-[0.08em] text-[var(--gray-500)] uppercase">
        {title}
      </h2>

      <Link
        to={actionTo}
        className="flex items-center gap-1.5 text-sm leading-5 font-medium text-[var(--brand-base)] transition-colors hover:text-[var(--brand-dark)]"
      >
        {actionLabel}
        <ChevronRight aria-hidden="true" className="size-4 stroke-[1.75]" />
      </Link>
    </header>
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

export { DashboardPage };
