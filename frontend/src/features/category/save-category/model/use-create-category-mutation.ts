import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesQueryKey, createCategory } from "@/entities/category";
import { transactionSummaryQueryKey } from "@/entities/transaction";
import type { CreateCategoryInput } from "@/shared/api/types";

const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateCategoryInput) => createCategory(input),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: categoriesQueryKey }),
        queryClient.invalidateQueries({ queryKey: transactionSummaryQueryKey }),
      ]);
    },
  });
};

export { useCreateCategoryMutation };
