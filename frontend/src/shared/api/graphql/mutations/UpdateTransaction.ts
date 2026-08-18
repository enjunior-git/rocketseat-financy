import { gql } from "@apollo/client";

export const UPDATE_TRANSACTION_MUTATION = gql`
  mutation UpdateTransaction($id: String!, $data: UpdateTransactionRequest!) {
    updateTransaction(id: $id, data: $data) {
      id
      description
      date
      amount
      categoryId
      type
      createdAt
      updatedAt
    }
  }
`;
