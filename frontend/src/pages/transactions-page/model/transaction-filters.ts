import type { Category, Transaction } from "@/shared/api/types";
import { getLocalLocale } from "@/shared/lib/intl";
import type { SelectOption } from "@/shared/ui/select";

type TransactionFilters = {
  category: string;
  period: string;
  search: string;
  type: string;
};

const transactionTypeFilterOptions = [
  { label: "All", value: "all" },
  { label: "Income", value: "income", disabled: true },
  { label: "Expense", value: "expense", disabled: true },
] satisfies SelectOption[];

const getCategoryFilterOptions = (categories: Category[]): SelectOption[] => {
  return [
    { label: "All", value: "all" },
    ...categories.map((category) => ({
      label: category.title,
      value: category.id,
    })),
  ];
};

const getTypeFilterOptions = (transactions: Transaction[]): SelectOption[] => {
  const availableTypes = new Set(transactions.map((transaction) => transaction.type));

  return transactionTypeFilterOptions.map((option) => ({
    ...option,
    disabled: option.value !== "all" && !availableTypes.has(option.value as Transaction["type"]),
  }));
};

const getPeriodValue = (date: string): string | null => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  const year = parsedDate.getUTCFullYear();
  const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
};

const getPeriodLabel = (period: string): string => {
  const [year, month] = period.split("-");
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1));

  return new Intl.DateTimeFormat(getLocalLocale(), {
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(date);
};

const getPeriodFilterOptions = (transactions: Transaction[]): SelectOption[] => {
  const periods = new Set<string>();

  for (const transaction of transactions) {
    const period = getPeriodValue(transaction.date);

    if (period) {
      periods.add(period);
    }
  }

  return [
    { label: "All", value: "all" },
    ...Array.from(periods)
      .sort((firstPeriod, secondPeriod) => secondPeriod.localeCompare(firstPeriod))
      .map((period) => ({
        label: getPeriodLabel(period),
        value: period,
      })),
  ];
};

const filterTransactions = (transactions: Transaction[], filters: TransactionFilters) => {
  const normalizedSearch = filters.search.trim().toLowerCase();

  return transactions.filter((transaction) => {
    if (normalizedSearch && !transaction.description.toLowerCase().includes(normalizedSearch)) {
      return false;
    }

    if (filters.type !== "all" && transaction.type !== filters.type) {
      return false;
    }

    if (filters.category !== "all" && transaction.categoryId !== filters.category) {
      return false;
    }

    if (filters.period !== "all" && getPeriodValue(transaction.date) !== filters.period) {
      return false;
    }

    return true;
  });
};

export type { TransactionFilters };
export {
  filterTransactions,
  getCategoryFilterOptions,
  getPeriodFilterOptions,
  getTypeFilterOptions,
};
