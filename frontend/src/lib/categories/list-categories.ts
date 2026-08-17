import { apolloClient } from "@/lib/apollo";
import { LIST_CATEGORIES_QUERY } from "@/lib/graphql/queries/ListCategories";
import type { Category } from "@/types";

type ListCategoriesQueryData = {
  listCategories: Category[];
};

const listCategories = async (): Promise<Category[]> => {
  const { data } = await apolloClient.query<ListCategoriesQueryData>({
    query: LIST_CATEGORIES_QUERY,
    fetchPolicy: "network-only",
  });

  if (!data?.listCategories) {
    throw new Error("Categories query did not return a category list.");
  }

  return data.listCategories;
};

export { listCategories };
