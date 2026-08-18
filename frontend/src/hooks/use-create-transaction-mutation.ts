import { useMutation, useQueryClient } from "@tanstack/react-query";

import { transactionSummaryQueryKey } from "@/hooks/use-transaction-summary-query";
import { transactionsQueryKey } from "@/hooks/use-transactions-query";
import { createTransaction } from "@/lib/transactions/create-transaction";
import type { CreateTransactionInput } from "@/types";

const useCreateTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTransactionInput) => createTransaction(input),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: transactionSummaryQueryKey }),
        queryClient.invalidateQueries({ queryKey: transactionsQueryKey }),
      ]);
    },
  });
};

export { useCreateTransactionMutation };
