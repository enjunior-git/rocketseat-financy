import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/entities/session";
import type { RegisterInput } from "@/shared/api/types";
import { registerUser } from "../api/register";

const useRegisterMutation = () => {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: (input: RegisterInput) => registerUser(input),
    onSuccess: ({ refreshToken, token, user }) => {
      setSession({ refreshToken, token, user });
    },
  });
};

export { useRegisterMutation };
