import { apolloClient } from "@/shared/api/apollo";
import { LIST_TRANSACTIONS_QUERY } from "@/shared/api/graphql/queries/ListTransactions";
import type { Transaction } from "@/shared/api/types";

type ListTransactionsQueryData = {
  listTransactions: Transaction[];
};

const listTransactions = async (): Promise<Transaction[]> => {
  const { data } = await apolloClient.query<ListTransactionsQueryData>({
    query: LIST_TRANSACTIONS_QUERY,
    fetchPolicy: "network-only",
  });

  if (!data?.listTransactions) {
    throw new Error("Transactions query did not return a transaction list.");
  }

  return data.listTransactions;
};

export { listTransactions };
