import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categoriesQueryKey } from "@/hooks/use-categories-query";
import { transactionSummaryQueryKey } from "@/hooks/use-transaction-summary-query";
import { transactionsQueryKey } from "@/hooks/use-transactions-query";
import { deleteCategory } from "@/lib/categories/delete-category";

const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: categoriesQueryKey }),
        queryClient.invalidateQueries({ queryKey: transactionSummaryQueryKey }),
        queryClient.invalidateQueries({ queryKey: transactionsQueryKey }),
      ]);
    },
  });
};

export { useDeleteCategoryMutation };
