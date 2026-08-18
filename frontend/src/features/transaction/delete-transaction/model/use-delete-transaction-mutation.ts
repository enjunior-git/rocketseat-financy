import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categoriesQueryKey } from "@/entities/category";
import { transactionSummaryQueryKey } from "@/entities/transaction";
import { transactionsQueryKey } from "@/entities/transaction";
import { deleteTransaction } from "@/entities/transaction";

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
