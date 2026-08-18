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
  WalletCards,
} from "lucide-react";

import {
  TransactionFormDialog,
  type TransactionFormValues,
} from "@/components/forms/transaction-form-dialog";
import { ActionAlertDialog } from "@/components/ui/action-alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { PaginationButton } from "@/components/ui/pagination-button";
import { Select, type SelectOption } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tag, type TagProps } from "@/components/ui/tag";
import { useCategoriesQuery } from "@/hooks/use-categories-query";
import { useDeleteTransactionMutation } from "@/hooks/use-delete-transaction-mutation";
import { useTransactionsQuery } from "@/hooks/use-transactions-query";
import { cn } from "@/lib/utils";
import type { Category, Transaction } from "@/types";

type TransactionRow = {
  amount: string;
  category: string;
  categoryId: string;
  categoryVariant: TagProps["variant"];
  date: string;
  description: string;
  id: string;
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
  period: [
    { label: "November / 2025", value: "2025-11" },
    { label: "December / 2025", value: "2025-12" },
    { label: "October / 2025", value: "2025-10" },
  ],
} satisfies Record<string, SelectOption[]>;

const categoryIconByValue: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  education: Gift,
  entertainment: Clapperboard,
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

function toTransactionFormValues(
  transaction: Pick<TransactionRow, "amount" | "categoryId" | "date" | "description" | "type">,
): TransactionFormValues {
  return {
    amount: transaction.amount
      .replace(/^[+-]\s*R\$\s*/, "")
      .replace(/\./g, "")
      .replace(",", "."),
    categoryId: transaction.categoryId,
    date: toInputDate(transaction.date),
    description: transaction.description,
    type: transaction.type,
  };
}

function toInputDate(date: string) {
  if (date.includes("-")) {
    return date.slice(0, 10);
  }

  const [month, day, year] = date.split("/");

  return `20${year}-${month}-${day}`;
}

function formatCurrency(amount: number, type: Transaction["type"]) {
  const formattedAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);

  return `${type === "income" ? "+" : "-"} ${formattedAmount}`;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    timeZone: "UTC",
  }).format(new Date(date));
}

function toTransactionRow(transaction: Transaction): TransactionRow {
  const category = transaction.category;
  const categoryVariant = getCategoryColor(category?.colour);

  return {
    amount: formatCurrency(transaction.amount, transaction.type),
    category: category?.title ?? "Uncategorized",
    categoryId: transaction.categoryId,
    categoryVariant,
    date: formatDate(transaction.date),
    description: transaction.description,
    id: transaction.id,
    icon: getCategoryIcon(category?.icon),
    iconClassName: categoryIconToneByColor[categoryVariant],
    type: transaction.type,
  };
}

function getCategoryFilterOptions(categories: Category[]): SelectOption[] {
  return [
    { label: "All", value: "all" },
    ...categories.map((category) => ({
      label: category.title,
      value: category.id,
    })),
  ];
}

function TransactionsPage() {
  const transactionsQuery = useTransactionsQuery();
  const categoriesQuery = useCategoriesQuery();
  const deleteTransactionMutation = useDeleteTransactionMutation();
  const transactions = transactionsQuery.data ?? [];
  const categoryFilterOptions = getCategoryFilterOptions(categoriesQuery.data ?? []);
  const firstResult = transactions.length > 0 ? 1 : 0;
  const lastResult = transactions.length;

  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 py-12 sm:px-10">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[28px] leading-9 font-bold text-[var(--gray-800)]">Transactions</h1>
            <p className="mt-1 text-base leading-6 text-[var(--gray-600)]">
              Manage all your financial transactions
            </p>
          </div>

          <TransactionFormDialog
            mode="create"
            trigger={
              <Button type="button" size="label-sm" className="w-fit">
                <Plus />
                New transaction
              </Button>
            }
          />
        </header>

        <Card className="mt-9 gap-0 overflow-visible rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-6 py-6 ring-0">
          <div className="grid gap-4 lg:grid-cols-4">
            <Input
              label="Search"
              type="search"
              placeholder="Search by description"
              icon={<Search />}
            />
            <Select label="Type" defaultValue="all" options={filterOptions.type} />
            <Select label="Category" defaultValue="all" options={categoryFilterOptions} />
            <Select label="Period" defaultValue="2025-11" options={filterOptions.period} />
          </div>
        </Card>

        <Card className="mt-9 gap-0 overflow-hidden rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] py-0 ring-0">
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
                {transactionsQuery.isLoading ? (
                  <TransactionTableSkeletonRows />
                ) : (
                  transactions.map(toTransactionRow).map((transaction) => (
                    <TransactionTableRow
                      key={`${transaction.description}-${transaction.date}`}
                      onDelete={() => deleteTransactionMutation.mutate(transaction.id)}
                      {...transaction}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {transactionsQuery.isError ? (
            <TransactionStatus message={transactionsQuery.error.message} />
          ) : null}

          {!transactionsQuery.isLoading &&
          !transactionsQuery.isError &&
          transactions.length === 0 ? (
            <TransactionStatus message="No transactions yet." />
          ) : null}

          <footer className="flex flex-col gap-4 border-t border-[var(--gray-200)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-5 text-[var(--gray-700)]">
              {firstResult} to {lastResult} | {transactions.length} results
            </p>

            <div className="flex items-center gap-2">
              <IconButton type="button" aria-label="Previous page" icon={<ChevronLeft />} />
              <PaginationButton page={1} current />
              <PaginationButton page={2} />
              <PaginationButton page={3} />
              <IconButton type="button" aria-label="Next page" icon={<ChevronRight />} />
            </div>
          </footer>
        </Card>
    </section>
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
  categoryId,
  categoryVariant,
  date,
  description,
  id,
  onDelete,
  icon: Icon,
  iconClassName,
  type,
}: TransactionRow & { onDelete: () => void }) {
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
            onAction={onDelete}
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
          <TransactionFormDialog
            mode="edit"
            transactionId={id}
            defaultValues={toTransactionFormValues({
              amount,
              categoryId,
              date,
              description,
              type,
            })}
            trigger={
              <IconButton type="button" aria-label={`Edit ${description}`} icon={<Pencil />} />
            }
          />
        </div>
      </td>
    </tr>
  );
}

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

function TransactionStatus({ message }: { message: string }) {
  return (
    <div className="border-t border-[var(--gray-200)] px-6 py-8">
      <p className="text-sm leading-5 text-[var(--gray-600)]">{message}</p>
    </div>
  );
}

export { TransactionsPage };
