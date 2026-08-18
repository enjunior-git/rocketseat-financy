import { CircleArrowDown, CircleArrowUp, WalletCards } from "lucide-react";

import {
  categoryIconToneByColor,
  formatTransactionCount,
  getCategoryColor,
  getCategoryIcon,
} from "@/entities/category";
import { formatCurrency, formatDate, formatSignedCurrency } from "@/entities/transaction";
import type {
  CategoryTransactionSummary,
  Transaction,
  TransactionSummary,
} from "@/shared/api/types";
import type { TagProps } from "@/shared/ui/tag";

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

export type { DashboardCategorySummary, RecentTransaction, SummaryCard };
export { getSummaryCards, toCategorySummary, toRecentTransaction };
