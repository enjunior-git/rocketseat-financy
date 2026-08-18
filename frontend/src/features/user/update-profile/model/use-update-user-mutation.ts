import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/entities/session";
import { updateUser } from "@/entities/user";
import type { UpdateUserInput } from "@/shared/api/types";

const useUpdateUserMutation = () => {
  const updateUserInStore = useAuthStore((state) => state.updateUser);

  return useMutation({
    mutationFn: (input: UpdateUserInput) => updateUser(input),
    onSuccess: (user) => {
      updateUserInStore(user);
    },
  });
};

export { useUpdateUserMutation };
