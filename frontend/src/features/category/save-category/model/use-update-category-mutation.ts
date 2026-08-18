import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  categoriesQueryKey,
  type UpdateCategoryVariables,
  updateCategory,
} from "@/entities/category";
import { transactionSummaryQueryKey, transactionsQueryKey } from "@/entities/transaction";

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
