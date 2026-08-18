import { useQuery } from "@tanstack/react-query";

import { getTransactionSummary } from "../api/transaction-summary";

const transactionSummaryQueryKey = ["transaction-summary"] as const;

const useTransactionSummaryQuery = () => {
  return useQuery({
    queryKey: transactionSummaryQueryKey,
    queryFn: getTransactionSummary,
  });
};

export { transactionSummaryQueryKey, useTransactionSummaryQuery };
