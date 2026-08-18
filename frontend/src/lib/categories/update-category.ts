import { apolloClient } from "@/lib/apollo";
import { UPDATE_CATEGORY_MUTATION } from "@/lib/graphql/mutations/UpdateCategory";
import type { Category, UpdateCategoryInput } from "@/types";

type UpdateCategoryMutationData = {
  updateCategory: Category;
};

type UpdateCategoryVariables = {
  id: string;
  data: UpdateCategoryInput;
};

const updateCategory = async ({ data, id }: UpdateCategoryVariables): Promise<Category> => {
  const result = await apolloClient.mutate<UpdateCategoryMutationData, UpdateCategoryVariables>({
    mutation: UPDATE_CATEGORY_MUTATION,
    variables: {
      id,
      data,
    },
  });

  if (!result.data?.updateCategory) {
    throw new Error("Category update did not return a category.");
  }

  return result.data.updateCategory;
};

export type { UpdateCategoryVariables };
export { updateCategory };
