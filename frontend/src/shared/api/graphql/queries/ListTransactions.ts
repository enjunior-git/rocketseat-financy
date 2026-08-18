import { gql } from "@apollo/client";

export const LIST_TRANSACTIONS_QUERY = gql`
  query ListTransactions {
    listTransactions {
      id
      description
      date
      amount
      categoryId
      type
      category {
        id
        title
        description
        icon
        colour
        transactionsAmount
        totalExpensesAmount
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
