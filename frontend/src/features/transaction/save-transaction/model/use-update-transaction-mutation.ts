import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categoriesQueryKey } from "@/entities/category";
import { transactionSummaryQueryKey } from "@/entities/transaction";
import { transactionsQueryKey } from "@/entities/transaction";
import { type UpdateTransactionVariables, updateTransaction } from "@/entities/transaction";

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
