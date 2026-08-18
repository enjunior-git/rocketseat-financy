import { Link, type LinkProps } from "@tanstack/react-router";
import {
  BriefcaseBusiness,
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  Fuel,
  Gift,
  Plus,
  RefreshCw,
  ShoppingCart,
  Utensils,
  WalletCards,
} from "lucide-react";

import { TransactionFormDialog } from "@/components/forms/transaction-form-dialog";
import { Navbar } from "@/components/navigation/navbar";
import { Card } from "@/components/ui/card";
import { Tag, type TagProps } from "@/components/ui/tag";
import { useTransactionSummaryQuery } from "@/hooks/use-transaction-summary-query";
import { useTransactionsQuery } from "@/hooks/use-transactions-query";
import { cn } from "@/lib/utils";
import type { CategoryTransactionSummary, Transaction, TransactionSummary } from "@/types";

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

const categoryIconByValue: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  education: Gift,
  entertainment: RefreshCw,
  fitness: RefreshCw,
  food: Utensils,
  gifts: Gift,
  health: Gift,
  home: Gift,
  income: WalletCards,
  pets: ShoppingCart,
  savings: RefreshCw,
  shopping: ShoppingCart,
  transport: Fuel,
  utilities: Gift,
  work: BriefcaseBusiness,
};

const categoryIconToneByColor = {
  blue: "bg-[var(--blue-light)] text-[var(--blue-base)]",
  gray: "bg-[var(--gray-200)] text-[var(--gray-700)]",
  green: "bg-[var(--green-light)] text-[var(--green-base)]",
  orange: "bg-[var(--orange-light)] text-[var(--orange-base)]",
  pink: "bg-[var(--pink-light)] text-[var(--pink-base)]",
  purple: "bg-[var(--purple-light)] text-[var(--purple-base)]",
  red: "bg-[var(--red-light)] text-[var(--red-base)]",
  yellow: "bg-[var(--yellow-light)] text-[var(--yellow-base)]",
} satisfies Record<NonNullable<TagProps["variant"]>, string>;

const getCategoryColor = (colour?: string): NonNullable<TagProps["variant"]> => {
  if (colour && colour in categoryIconToneByColor) {
    return colour as NonNullable<TagProps["variant"]>;
  }

  return "gray";
};

const getCategoryIcon = (icon?: string) => {
  if (!icon) {
    return BriefcaseBusiness;
  }

  return categoryIconByValue[icon] ?? BriefcaseBusiness;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
};

const formatSignedCurrency = (amount: number, type: Transaction["type"]) => {
  return `${type === "income" ? "+" : "-"} ${formatCurrency(amount)}`;
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    timeZone: "UTC",
  }).format(new Date(date));
};

const formatTransactionCount = (count: number) => {
  return count === 1 ? "1 item" : `${count} items`;
};

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
    <main className="min-h-screen bg-[var(--gray-100)]">
      <Navbar activeItem="Dashboard" userInitials="CT" />

      <section className="mx-auto grid w-full max-w-[1280px] gap-6 px-6 py-12 sm:px-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {summaryCards.map((card) => (
            <SummaryCard key={card.label} {...card} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <Card className="gap-0 overflow-hidden rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] py-0 ring-0">
            <DashboardSectionHeader
              title="Recent transactions"
              actionTo="/transactions"
              actionLabel="View all"
            />

            <div>
              {transactionsQuery.isLoading ? (
                <DashboardStatus message="Loading transactions..." />
              ) : null}

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
            <DashboardSectionHeader
              title="Categories"
              actionTo="/categories"
              actionLabel="Manage"
            />

            <div className="flex flex-col gap-4 px-6 py-6">
              {summaryQuery.isLoading ? (
                <p className="text-sm leading-5 text-[var(--gray-600)]">Loading categories...</p>
              ) : null}

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
    </main>
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

export { DashboardPage };
