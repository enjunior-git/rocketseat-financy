import { useMutation } from "@tanstack/react-query";

import { updateUser } from "@/lib/users/update-user";
import { useAuthStore } from "@/stores/auth";
import type { UpdateUserInput } from "@/types";

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
