import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categoriesQueryKey } from "@/hooks/use-categories-query";
import { transactionSummaryQueryKey } from "@/hooks/use-transaction-summary-query";
import { transactionsQueryKey } from "@/hooks/use-transactions-query";
import { type UpdateCategoryVariables, updateCategory } from "@/lib/categories/update-category";

const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateCategoryVariables) => updateCategory(input),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: categoriesQueryKey }),
        queryClient.invalidateQueries({ queryKey: transactionsQueryKey }),
        queryClient.invalidateQueries({ queryKey: transactionSummaryQueryKey }),
      ]);
    },
  });
};

export { useUpdateCategoryMutation };
