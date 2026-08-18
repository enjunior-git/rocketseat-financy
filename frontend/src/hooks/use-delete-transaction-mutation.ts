import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categoriesQueryKey } from "@/hooks/use-categories-query";
import { transactionSummaryQueryKey } from "@/hooks/use-transaction-summary-query";
import { transactionsQueryKey } from "@/hooks/use-transactions-query";
import { deleteTransaction } from "@/lib/transactions/delete-transaction";

const useDeleteTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: transactionsQueryKey }),
        queryClient.invalidateQueries({ queryKey: categoriesQueryKey }),
        queryClient.invalidateQueries({ queryKey: transactionSummaryQueryKey }),
      ]);
    },
  });
};

export { useDeleteTransactionMutation };
