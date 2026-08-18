import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categoriesQueryKey } from "@/hooks/use-categories-query";
import { transactionSummaryQueryKey } from "@/hooks/use-transaction-summary-query";
import { transactionsQueryKey } from "@/hooks/use-transactions-query";
import {
  type UpdateTransactionVariables,
  updateTransaction,
} from "@/lib/transactions/update-transaction";

const useUpdateTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateTransactionVariables) => updateTransaction(input),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: transactionsQueryKey }),
        queryClient.invalidateQueries({ queryKey: categoriesQueryKey }),
        queryClient.invalidateQueries({ queryKey: transactionSummaryQueryKey }),
      ]);
    },
  });
};

export { useUpdateTransactionMutation };
