import { ChevronLeft, ChevronRight } from "lucide-react";

import { useDeleteTransactionMutation } from "@/features/transaction/delete-transaction";
import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/card";
import { IconButton } from "@/shared/ui/icon-button";
import { PaginationButton } from "@/shared/ui/pagination-button";
import type { TransactionRow } from "../model/transaction-row";
import { TransactionTableRow } from "./transaction-table-row";
import { TransactionTableSkeletonRows } from "./transaction-table-skeleton";

type TransactionTableProps = {
  isError: boolean;
  isLoading: boolean;
  resultCount: number;
  totalCount: number;
  transactions: TransactionRow[];
  errorMessage?: string;
};

function TransactionTable({
  errorMessage,
  isError,
  isLoading,
  resultCount,
  totalCount,
  transactions,
}: TransactionTableProps) {
  const deleteTransactionMutation = useDeleteTransactionMutation();
  const firstResult = resultCount > 0 ? 1 : 0;

  return (
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
            {isLoading ? (
              <TransactionTableSkeletonRows />
            ) : (
              transactions.map((transaction) => (
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

      {isError && errorMessage ? <TransactionStatus message={errorMessage} /> : null}

      {!isLoading && !isError && totalCount === 0 ? (
        <TransactionStatus message="No transactions yet." />
      ) : null}

      {!isLoading && !isError && totalCount > 0 && resultCount === 0 ? (
        <TransactionStatus message="No transactions match these filters." />
      ) : null}

      <footer className="flex flex-col gap-4 border-t border-[var(--gray-200)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-5 text-[var(--gray-700)]">
          {firstResult} to {resultCount} | {resultCount} results
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

function TransactionStatus({ message }: { message: string }) {
  return (
    <div className="border-t border-[var(--gray-200)] px-6 py-8">
      <p className="text-sm leading-5 text-[var(--gray-600)]">{message}</p>
    </div>
  );
}

export { TransactionTable };
