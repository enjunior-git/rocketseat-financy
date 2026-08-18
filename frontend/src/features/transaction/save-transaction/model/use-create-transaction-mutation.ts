import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTransaction,
  transactionSummaryQueryKey,
  transactionsQueryKey,
} from "@/entities/transaction";
import type { CreateTransactionInput } from "@/shared/api/types";

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
