import { apolloClient } from "@/lib/apollo";
import { LOGIN_MUTATION } from "@/lib/graphql/mutations/Login";
import type { LoginInput, User } from "@/types";

type LoginMutationData = {
  login: {
    user: User;
    token: string;
    refreshToken: string;
  };
};

type LoginResult = LoginMutationData["login"];

const loginUser = async (input: LoginInput): Promise<LoginResult> => {
  const { data } = await apolloClient.mutate<LoginMutationData, { data: LoginInput }>({
    mutation: LOGIN_MUTATION,
    variables: {
      data: input,
    },
  });

  if (!data?.login) {
    throw new Error("Login did not return an auth session.");
  }

  return data.login;
};

export type { LoginResult };
export { loginUser };
