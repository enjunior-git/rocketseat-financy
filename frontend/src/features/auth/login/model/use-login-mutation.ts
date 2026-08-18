import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/entities/session";
import type { LoginInput } from "@/shared/api/types";
import { loginUser } from "../api/login";

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
