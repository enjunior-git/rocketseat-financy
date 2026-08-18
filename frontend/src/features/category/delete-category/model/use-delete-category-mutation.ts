import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesQueryKey, deleteCategory } from "@/entities/category";
import { transactionSummaryQueryKey, transactionsQueryKey } from "@/entities/transaction";

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
