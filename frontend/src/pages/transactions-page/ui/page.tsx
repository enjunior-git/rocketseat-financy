import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useCategoriesQuery } from "@/entities/category";
import { useTransactionsQuery } from "@/entities/transaction";
import { TransactionFormDialog } from "@/features/transaction/save-transaction";
import type { Category, Transaction } from "@/shared/api/types";
import { Button } from "@/shared/ui/button";
import {
  filterTransactions,
  getCategoryFilterOptions,
  getPeriodFilterOptions,
  getTypeFilterOptions,
} from "../model/transaction-filters";
import { toTransactionRow } from "../model/transaction-row";
import { TransactionFiltersCard } from "./transaction-filters-card";
import { TransactionTable } from "./transaction-table";

const emptyTransactions: Transaction[] = [];
const emptyCategories: Category[] = [];

function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  const transactionsQuery = useTransactionsQuery();
  const categoriesQuery = useCategoriesQuery();
  const transactions = transactionsQuery.data ?? emptyTransactions;
  const categoryFilterOptions = getCategoryFilterOptions(categoriesQuery.data ?? emptyCategories);
  const typeFilterOptions = getTypeFilterOptions(transactions);
  const periodFilterOptions = getPeriodFilterOptions(transactions);
  const filteredTransactions = useMemo(() => {
    return filterTransactions(transactions, {
      category: categoryFilter,
      period: periodFilter,
      search,
      type: typeFilter,
    });
  }, [categoryFilter, periodFilter, search, transactions, typeFilter]);

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

      <TransactionFiltersCard
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        typeOptions={typeFilterOptions}
        onTypeChange={setTypeFilter}
        categoryFilter={categoryFilter}
        categoryOptions={categoryFilterOptions}
        isCategoryLoading={categoriesQuery.isLoading}
        onCategoryChange={setCategoryFilter}
        periodFilter={periodFilter}
        periodOptions={periodFilterOptions}
        isTransactionLoading={transactionsQuery.isLoading}
        onPeriodChange={setPeriodFilter}
      />

      <TransactionTable
        errorMessage={transactionsQuery.error?.message}
        isError={transactionsQuery.isError}
        isLoading={transactionsQuery.isLoading}
        resultCount={filteredTransactions.length}
        totalCount={transactions.length}
        transactions={filteredTransactions.map(toTransactionRow)}
      />
    </section>
  );
}

export { TransactionsPage };
