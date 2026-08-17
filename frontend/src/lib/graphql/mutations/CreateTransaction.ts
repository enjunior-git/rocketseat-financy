import { gql } from "@apollo/client";

export const CREATE_TRANSACTION_MUTATION = gql`
  mutation CreateTransaction($data: CreateTransactionRequest!) {
    createTransaction(data: $data) {
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
