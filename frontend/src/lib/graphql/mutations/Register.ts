import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register($data: RegisterRequest!) {
    register(data: $data) {
      token
      refreshToken
      user {
        id
        name
        email
        createdAt
        updatedAt
      }
    }
  }
`;
