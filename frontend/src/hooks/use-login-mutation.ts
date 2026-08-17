import { useMutation } from "@tanstack/react-query";

import { loginUser } from "@/lib/auth/login";
import { useAuthStore } from "@/stores/auth";
import type { LoginInput } from "@/types";

const useLoginMutation = () => {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: (input: LoginInput) => loginUser(input),
    onSuccess: ({ refreshToken, token, user }) => {
      setSession({ refreshToken, token, user });
    },
  });
};

export { useLoginMutation };
