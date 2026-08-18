import { apolloClient } from "@/shared/api/apollo";
import { TRANSACTION_SUMMARY_QUERY } from "@/shared/api/graphql/queries/TransactionSummary";
import type { TransactionSummary } from "@/shared/api/types";

type TransactionSummaryQueryData = {
  transactionSummary: TransactionSummary;
};

const getTransactionSummary = async (): Promise<TransactionSummary> => {
  const { data } = await apolloClient.query<TransactionSummaryQueryData>({
    query: TRANSACTION_SUMMARY_QUERY,
    fetchPolicy: "network-only",
  });

  if (!data?.transactionSummary) {
    throw new Error("Transaction summary query did not return a summary.");
  }

  return data.transactionSummary;
};

export { getTransactionSummary };
