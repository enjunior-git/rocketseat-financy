import { Link, type LinkProps } from "@tanstack/react-router";
import {
  BriefcaseBusiness,
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  Fuel,
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
import { cn } from "@/lib/utils";

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

type CategorySummary = {
  amount: string;
  items: string;
  title: string;
  variant: TagProps["variant"];
};

const summaryCards: SummaryCard[] = [
  {
    label: "Total balance",
    amount: "R$ 12.847,32",
    icon: WalletCards,
    tone: "purple",
  },
  {
    label: "Monthly income",
    amount: "R$ 4.250,00",
    icon: CircleArrowUp,
    tone: "green",
  },
  {
    label: "Monthly expenses",
    amount: "R$ 2.180,45",
    icon: CircleArrowDown,
    tone: "red",
  },
];

const recentTransactions: RecentTransaction[] = [
  {
    description: "Salary payment",
    date: "12/01/25",
    category: "Income",
    categoryVariant: "green",
    amount: "+ R$ 4.250,00",
    type: "income",
    icon: BriefcaseBusiness,
    iconClassName: "bg-[var(--green-light)] text-[var(--green-base)]",
  },
  {
    description: "Dinner at restaurant",
    date: "11/30/25",
    category: "Food",
    categoryVariant: "blue",
    amount: "- R$ 89,50",
    type: "expense",
    icon: Utensils,
    iconClassName: "bg-[var(--blue-light)] text-[var(--blue-base)]",
  },
  {
    description: "Gas station",
    date: "11/29/25",
    category: "Transport",
    categoryVariant: "purple",
    amount: "- R$ 100,00",
    type: "expense",
    icon: Fuel,
    iconClassName: "bg-[var(--purple-light)] text-[var(--purple-base)]",
  },
  {
    description: "Market shopping",
    date: "11/28/25",
    category: "Market",
    categoryVariant: "orange",
    amount: "- R$ 156,80",
    type: "expense",
    icon: ShoppingCart,
    iconClassName: "bg-[var(--orange-light)] text-[var(--orange-base)]",
  },
  {
    description: "Investment return",
    date: "11/26/25",
    category: "Investment",
    categoryVariant: "green",
    amount: "+ R$ 340,25",
    type: "income",
    icon: RefreshCw,
    iconClassName: "bg-[var(--green-light)] text-[var(--green-base)]",
  },
];

const categories: CategorySummary[] = [
  {
    title: "Food",
    items: "12 items",
    amount: "R$ 542,30",
    variant: "blue",
  },
  {
    title: "Transport",
    items: "8 items",
    amount: "R$ 385,50",
    variant: "purple",
  },
  {
    title: "Market",
    items: "3 items",
    amount: "R$ 298,75",
    variant: "orange",
  },
  {
    title: "Entertainment",
    items: "2 items",
    amount: "R$ 186,20",
    variant: "pink",
  },
  {
    title: "Utilities",
    items: "7 items",
    amount: "R$ 245,80",
    variant: "yellow",
  },
];

const summaryToneClassNames = {
  purple: "text-[var(--purple-base)]",
  green: "text-[var(--green-dark)]",
  red: "text-[var(--red-base)]",
} as const;

function DashboardPage() {
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
