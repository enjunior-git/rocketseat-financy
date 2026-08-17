import {
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  Clapperboard,
  Fuel,
  Gift,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  ShoppingCart,
  Trash2,
  Utensils,
} from "lucide-react";

import { Navbar } from "@/components/navigation/navbar";
import { ActionAlertDialog } from "@/components/ui/action-alert-dialog";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { PaginationButton } from "@/components/ui/pagination-button";
import { Select, type SelectOption } from "@/components/ui/select";
import { Tag, type TagProps } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

type Transaction = {
  amount: string;
  category: string;
  categoryVariant: TagProps["variant"];
  date: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconClassName: string;
  type: "income" | "expense";
};

const filterOptions = {
  type: [
    { label: "All", value: "all" },
    { label: "Income", value: "income" },
    { label: "Expense", value: "expense" },
  ],
  category: [
    { label: "All", value: "all" },
    { label: "Food", value: "food" },
    { label: "Transport", value: "transport" },
    { label: "Market", value: "market" },
    { label: "Investment", value: "investment" },
    { label: "Utilities", value: "utilities" },
    { label: "Salary", value: "salary" },
  ],
  period: [
    { label: "November / 2025", value: "2025-11" },
    { label: "December / 2025", value: "2025-12" },
    { label: "October / 2025", value: "2025-10" },
  ],
} satisfies Record<string, SelectOption[]>;

const transactions: Transaction[] = [
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
  {
    description: "Rent",
    date: "11/26/25",
    category: "Utilities",
    categoryVariant: "yellow",
    amount: "- R$ 1.700,00",
    type: "expense",
    icon: Gift,
    iconClassName: "bg-[var(--yellow-light)] text-[var(--yellow-base)]",
  },
  {
    description: "Freelance",
    date: "11/24/25",
    category: "Salary",
    categoryVariant: "green",
    amount: "+ R$ 2.500,00",
    type: "income",
    icon: BriefcaseBusiness,
    iconClassName: "bg-[var(--green-light)] text-[var(--green-base)]",
  },
  {
    description: "Grocery shopping",
    date: "11/22/25",
    category: "Market",
    categoryVariant: "orange",
    amount: "- R$ 150,00",
    type: "expense",
    icon: ShoppingCart,
    iconClassName: "bg-[var(--orange-light)] text-[var(--orange-base)]",
  },
  {
    description: "Cinema",
    date: "12/18/25",
    category: "Entertainment",
    categoryVariant: "pink",
    amount: "- R$ 88,00",
    type: "expense",
    icon: Clapperboard,
    iconClassName: "bg-[var(--pink-light)] text-[var(--pink-base)]",
  },
];

function TransactionsPage() {
  return (
    <main className="min-h-screen bg-[var(--gray-100)]">
      <Navbar activeItem="Transactions" userInitials="CT" />

      <section className="mx-auto w-full max-w-[1280px] px-6 py-12 sm:px-10">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[28px] leading-9 font-bold text-[var(--gray-800)]">Transactions</h1>
            <p className="mt-1 text-base leading-6 text-[var(--gray-600)]">
              Manage all your financial transactions
            </p>
          </div>

          <TodoAlertDialog
            trigger={
              <Button type="button" size="label-sm" className="w-fit">
                <Plus />
                New transaction
              </Button>
            }
          />
        </header>

        <section className="mt-9 rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-6 py-6">
          <div className="grid gap-4 lg:grid-cols-4">
            <Input
              label="Search"
              type="search"
              placeholder="Search by description"
              icon={<Search />}
            />
            <Select label="Type" defaultValue="all" options={filterOptions.type} />
            <Select label="Category" defaultValue="all" options={filterOptions.category} />
            <Select label="Period" defaultValue="2025-11" options={filterOptions.period} />
          </div>
        </section>

        <section className="mt-9 overflow-hidden rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] table-fixed">
              <thead>
                <tr className="h-14 border-b border-[var(--gray-200)] text-left">
                  <TableHead className="w-[34%]">Description</TableHead>
                  <TableHead className="w-[12%] text-center">Date</TableHead>
                  <TableHead className="w-[16%] text-center">Category</TableHead>
                  <TableHead className="w-[14%] text-center">Type</TableHead>
                  <TableHead className="w-[13%] text-right">Amount</TableHead>
                  <TableHead className="w-[11%] text-right">Actions</TableHead>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <TransactionTableRow
                    key={`${transaction.description}-${transaction.date}`}
                    {...transaction}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <footer className="flex flex-col gap-4 border-t border-[var(--gray-200)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-5 text-[var(--gray-700)]">1 to 10 | 27 results</p>

            <div className="flex items-center gap-2">
              <IconButton type="button" aria-label="Previous page" icon={<ChevronLeft />} />
              <PaginationButton page={1} current />
              <PaginationButton page={2} />
              <PaginationButton page={3} />
              <IconButton type="button" aria-label="Next page" icon={<ChevronRight />} />
            </div>
          </footer>
        </section>
      </section>
    </main>
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "px-6 text-xs leading-4 font-semibold tracking-[0.08em] text-[var(--gray-500)] uppercase",
        className,
      )}
      {...props}
    />
  );
}

function TransactionTableRow({
  amount,
  category,
  categoryVariant,
  date,
  description,
  icon: Icon,
  iconClassName,
  type,
}: Transaction) {
  const TypeIcon = type === "income" ? CircleArrowUp : CircleArrowDown;

  return (
    <tr className="h-[74px] border-b border-[var(--gray-200)] last:border-b-0">
      <td className="px-6">
        <div className="flex min-w-0 items-center gap-4">
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-[8px] [&_svg]:size-4 [&_svg]:stroke-[1.75]",
              iconClassName,
            )}
          >
            <Icon aria-hidden="true" />
          </span>
          <span className="truncate text-base leading-6 font-medium text-[var(--gray-800)]">
            {description}
          </span>
        </div>
      </td>
      <td className="px-6 text-center text-sm leading-5 text-[var(--gray-600)]">{date}</td>
      <td className="px-6 text-center">
        <Tag variant={categoryVariant}>{category}</Tag>
      </td>
      <td className="px-6 text-center">
        <span
          className={cn(
            "inline-flex items-center gap-2 text-sm leading-5 font-medium",
            type === "income" ? "text-[var(--green-dark)]" : "text-[var(--red-base)]",
          )}
        >
          <TypeIcon aria-hidden="true" className="size-4 stroke-[1.75]" />
          {type === "income" ? "Income" : "Expense"}
        </span>
      </td>
      <td className="px-6 text-right text-sm leading-5 font-bold text-[var(--gray-800)]">
        {amount}
      </td>
      <td className="px-6">
        <div className="ml-auto flex w-20 items-center justify-end gap-2">
          <ActionAlertDialog
            title="Delete transaction?"
            description={`This will delete "${description}" from your transaction history.`}
            actionLabel="Delete"
            actionVariant="destructive"
            media={<Trash2 aria-hidden="true" className="text-[var(--red-base)]" />}
            trigger={
              <IconButton
                type="button"
                tone="danger"
                aria-label={`Delete ${description}`}
                icon={<Trash2 />}
              />
            }
          />
          <TodoAlertDialog
            trigger={
              <IconButton type="button" aria-label={`Edit ${description}`} icon={<Pencil />} />
            }
          />
        </div>
      </td>
    </tr>
  );
}

function TodoAlertDialog({ trigger }: { trigger: React.ReactElement }) {
  return (
    <ActionAlertDialog
      title="Feature coming soon"
      description="This action is not available yet."
      actionLabel="OK"
      media={<Plus aria-hidden="true" className="text-[var(--brand-base)]" />}
      trigger={trigger}
    />
  );
}

export { TransactionsPage };
