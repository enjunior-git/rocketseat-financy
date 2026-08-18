import { gql } from "@apollo/client";

export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($data: CreateCategoryRequest!) {
    createCategory(data: $data) {
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
