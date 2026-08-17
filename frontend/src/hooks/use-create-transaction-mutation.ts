import { useMutation, useQueryClient } from "@tanstack/react-query";

import { transactionsQueryKey } from "@/hooks/use-transactions-query";
import { createTransaction } from "@/lib/transactions/create-transaction";
import type { CreateTransactionInput } from "@/types";

const useCreateTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTransactionInput) => createTransaction(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: transactionsQueryKey });
    },
  });
};

export { useCreateTransactionMutation };
