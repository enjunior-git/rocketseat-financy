import { apolloClient } from "@/shared/api/apollo";
import { toApiError, UNKNOWN_ERROR_MESSAGE } from "@/shared/api/errors";
import { LOGIN_MUTATION } from "@/shared/api/graphql/mutations/Login";
import type { LoginInput, User } from "@/shared/api/types";

type LoginMutationData = {
  login: {
    user: User;
    token: string;
    refreshToken: string;
  };
};

type LoginResult = LoginMutationData["login"];

const loginUser = async (input: LoginInput): Promise<LoginResult> => {
  try {
    const { data } = await apolloClient.mutate<LoginMutationData, { data: LoginInput }>({
      mutation: LOGIN_MUTATION,
      variables: {
        data: input,
      },
    });

    if (!data?.login) {
      throw new Error(UNKNOWN_ERROR_MESSAGE);
    }

    return data.login;
  } catch (error) {
    throw toApiError(error);
  }
};

export type { LoginResult };
export { loginUser };
