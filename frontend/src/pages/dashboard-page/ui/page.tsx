import { useTransactionSummaryQuery } from "@/entities/transaction";
import { useTransactionsQuery } from "@/entities/transaction";
import {
  getSummaryCards,
  toCategorySummary,
  toRecentTransaction,
} from "../model/dashboard-summary";
import { CategorySummaryPanel } from "./category-summary-panel";
import { DashboardSummaryCard, DashboardSummaryCardSkeleton } from "./dashboard-summary-card";
import { RecentTransactionsPanel } from "./recent-transactions-panel";

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
              <DashboardSummaryCardSkeleton key={label} />
            ))
          : summaryCards.map((card) => <DashboardSummaryCard key={card.label} {...card} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <RecentTransactionsPanel
          errorMessage={transactionsQuery.error?.message}
          isError={transactionsQuery.isError}
          isLoading={transactionsQuery.isLoading}
          transactions={recentTransactions}
        />

        <CategorySummaryPanel
          categories={categories}
          errorMessage={summaryQuery.error?.message}
          isError={summaryQuery.isError}
          isLoading={summaryQuery.isLoading}
        />
      </div>
    </section>
  );
}

export { DashboardPage };
