import { gql } from "@apollo/client";

export const LIST_CATEGORIES_QUERY = gql`
  query ListCategories {
    listCategories {
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
  }
`;
