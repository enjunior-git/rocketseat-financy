import { useQuery } from "@tanstack/react-query";

import { listCategories } from "../api/list-categories";

const categoriesQueryKey = ["categories"] as const;

const useCategoriesQuery = () => {
  return useQuery({
    queryKey: categoriesQueryKey,
    queryFn: listCategories,
  });
};

export { categoriesQueryKey, useCategoriesQuery };
