import { apolloClient } from "@/shared/api/apollo";
import { CREATE_CATEGORY_MUTATION } from "@/shared/api/graphql/mutations/CreateCategory";
import type { Category, CreateCategoryInput } from "@/shared/api/types";

type CreateCategoryMutationData = {
  createCategory: Category;
};

const createCategory = async (input: CreateCategoryInput): Promise<Category> => {
  const { data } = await apolloClient.mutate<
    CreateCategoryMutationData,
    { data: CreateCategoryInput }
  >({
    mutation: CREATE_CATEGORY_MUTATION,
    variables: {
      data: input,
    },
  });

  if (!data?.createCategory) {
    throw new Error("Category creation did not return a category.");
  }

  return data.createCategory;
};

export { createCategory };
