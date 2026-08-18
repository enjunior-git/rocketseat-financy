import { apolloClient } from "@/lib/apollo";
import { UPDATE_TRANSACTION_MUTATION } from "@/lib/graphql/mutations/UpdateTransaction";
import type { Transaction, UpdateTransactionInput } from "@/types";

type UpdateTransactionMutationData = {
  updateTransaction: Transaction;
};

type UpdateTransactionVariables = {
  id: string;
  data: UpdateTransactionInput;
};

const updateTransaction = async ({
  data,
  id,
}: UpdateTransactionVariables): Promise<Transaction> => {
  const result = await apolloClient.mutate<
    UpdateTransactionMutationData,
    UpdateTransactionVariables
  >({
    mutation: UPDATE_TRANSACTION_MUTATION,
    variables: {
      id,
      data,
    },
  });

  if (!result.data?.updateTransaction) {
    throw new Error("Transaction update did not return a transaction.");
  }

  return result.data.updateTransaction;
};

export type { UpdateTransactionVariables };
export { updateTransaction };
