import { apolloClient } from "@/shared/api/apollo";
import { DELETE_CATEGORY_MUTATION } from "@/shared/api/graphql/mutations/DeleteCategory";

type DeleteCategoryMutationData = {
  deleteCategory: boolean;
};

const deleteCategory = async (id: string): Promise<boolean> => {
  const { data } = await apolloClient.mutate<DeleteCategoryMutationData, { id: string }>({
    mutation: DELETE_CATEGORY_MUTATION,
    variables: {
      id,
    },
  });

  if (typeof data?.deleteCategory !== "boolean") {
    throw new Error("Category deletion did not return a result.");
  }

  return data.deleteCategory;
};

export { deleteCategory };
