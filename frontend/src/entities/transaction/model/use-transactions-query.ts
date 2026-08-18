import { useQuery } from "@tanstack/react-query";

import { listTransactions } from "../api/list-transactions";

const transactionsQueryKey = ["transactions"] as const;

const useTransactionsQuery = () => {
  return useQuery({
    queryKey: transactionsQueryKey,
    queryFn: listTransactions,
  });
};

export { transactionsQueryKey, useTransactionsQuery };
