import { useMutation } from "@tanstack/react-query";

import { registerUser } from "@/lib/auth/register";
import { useAuthStore } from "@/stores/auth";
import type { RegisterInput } from "@/types";

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
