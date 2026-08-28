import { apolloClient } from "@/shared/api/apollo";
import { toApiError, UNKNOWN_ERROR_MESSAGE } from "@/shared/api/errors";
import { REGISTER_MUTATION } from "@/shared/api/graphql/mutations/Register";
import type { RegisterInput, User } from "@/shared/api/types";

type RegisterMutationData = {
  register: {
    user: User;
    token: string;
    refreshToken: string;
  };
};

type RegisterResult = RegisterMutationData["register"];

const registerUser = async (input: RegisterInput): Promise<RegisterResult> => {
  try {
    const { data } = await apolloClient.mutate<RegisterMutationData, { data: RegisterInput }>({
      mutation: REGISTER_MUTATION,
      variables: {
        data: input,
      },
    });

    if (!data?.register) {
      throw new Error(UNKNOWN_ERROR_MESSAGE);
    }

    return data.register;
  } catch (error) {
    throw toApiError(error);
  }
};

export type { RegisterResult };
export { registerUser };
