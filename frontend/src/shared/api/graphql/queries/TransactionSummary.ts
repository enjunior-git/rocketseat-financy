import { gql } from "@apollo/client";

export const TRANSACTION_SUMMARY_QUERY = gql`
  query TransactionSummary {
    transactionSummary {
      totalIncomeMonthly
      totalExpensesMonthly
      totalBalance
      totalCategoriesAmount
      totalTransactionsAmount
      mostUsedCategory {
        id
        title
        colour
        transactionsAmount
        totalExpensesAmount
      }
      categories {
        id
        title
        colour
        transactionsAmount
        totalExpensesAmount
      }
    }
  }
`;
