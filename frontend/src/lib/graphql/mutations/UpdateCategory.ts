import { gql } from "@apollo/client";

export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory($id: String!, $data: UpdateCategoryRequest!) {
    updateCategory(id: $id, data: $data) {
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
