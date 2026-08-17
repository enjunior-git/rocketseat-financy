import { apolloClient } from "@/lib/apollo";
import { CREATE_TRANSACTION_MUTATION } from "@/lib/graphql/mutations/CreateTransaction";
import type { CreateTransactionInput, Transaction } from "@/types";

type CreateTransactionMutationData = {
  createTransaction: Transaction;
};

const createTransaction = async (input: CreateTransactionInput): Promise<Transaction> => {
  const { data } = await apolloClient.mutate<
    CreateTransactionMutationData,
    { data: CreateTransactionInput }
  >({
    mutation: CREATE_TRANSACTION_MUTATION,
    variables: {
      data: input,
    },
  });

  if (!data?.createTransaction) {
    throw new Error("Transaction creation did not return a transaction.");
  }

  return data.createTransaction;
};

export { createTransaction };
