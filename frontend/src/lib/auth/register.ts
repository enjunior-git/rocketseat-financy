import { apolloClient } from "@/lib/apollo";
import { REGISTER_MUTATION } from "@/lib/graphql/mutations/Register";
import type { RegisterInput, User } from "@/types";

type RegisterMutationData = {
  register: {
    user: User;
    token: string;
    refreshToken: string;
  };
};

type RegisterResult = RegisterMutationData["register"];

const registerUser = async (input: RegisterInput): Promise<RegisterResult> => {
  const { data } = await apolloClient.mutate<RegisterMutationData, { data: RegisterInput }>({
    mutation: REGISTER_MUTATION,
    variables: {
      data: input,
    },
  });

  if (!data?.register) {
    throw new Error("Registration did not return an auth session.");
  }

  return data.register;
};

export type { RegisterResult };
export { registerUser };
