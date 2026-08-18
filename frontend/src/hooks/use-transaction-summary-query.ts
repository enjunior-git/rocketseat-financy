import { useQuery } from "@tanstack/react-query";

import { getTransactionSummary } from "@/lib/transactions/transaction-summary";

const transactionSummaryQueryKey = ["transaction-summary"] as const;

const useTransactionSummaryQuery = () => {
  return useQuery({
    queryKey: transactionSummaryQueryKey,
    queryFn: getTransactionSummary,
  });
};

export { transactionSummaryQueryKey, useTransactionSummaryQuery };
