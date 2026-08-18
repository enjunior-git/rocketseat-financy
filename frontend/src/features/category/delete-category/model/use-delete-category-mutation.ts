import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categoriesQueryKey } from "@/entities/category";
import { transactionSummaryQueryKey } from "@/entities/transaction";
import { transactionsQueryKey } from "@/entities/transaction";
import { deleteCategory } from "@/entities/category";

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
