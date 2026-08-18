import { gql } from "@apollo/client";

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($data: UpdateUserRequest!) {
    updateUser(data: $data) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;
