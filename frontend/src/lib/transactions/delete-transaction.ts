import { apolloClient } from "@/lib/apollo";
import { DELETE_TRANSACTION_MUTATION } from "@/lib/graphql/mutations/DeleteTransaction";

type DeleteTransactionMutationData = {
  deleteTransaction: boolean;
};

const deleteTransaction = async (id: string): Promise<boolean> => {
  const { data } = await apolloClient.mutate<DeleteTransactionMutationData, { id: string }>({
    mutation: DELETE_TRANSACTION_MUTATION,
    variables: {
      id,
    },
  });

  if (typeof data?.deleteTransaction !== "boolean") {
    throw new Error("Transaction deletion did not return a result.");
  }

  return data.deleteTransaction;
};

export { deleteTransaction };
