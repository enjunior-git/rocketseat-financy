import { apolloClient } from "@/shared/api/apollo";
import { UPDATE_USER_MUTATION } from "@/shared/api/graphql/mutations/UpdateUser";
import type { UpdateUserInput, User } from "@/shared/api/types";

type UpdateUserMutationData = {
  updateUser: User;
};

type UpdateUserVariables = {
  data: UpdateUserInput;
};

const updateUser = async (data: UpdateUserInput): Promise<User> => {
  const result = await apolloClient.mutate<UpdateUserMutationData, UpdateUserVariables>({
    mutation: UPDATE_USER_MUTATION,
    variables: {
      data,
    },
  });

  if (!result.data?.updateUser) {
    throw new Error("User update did not return a user.");
  }

  return result.data.updateUser;
};

export { updateUser };
