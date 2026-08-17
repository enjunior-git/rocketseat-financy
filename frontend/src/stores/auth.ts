import { create } from "zustand";
import { persist } from "zustand/middleware";
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

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  register: (input: RegisterInput) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      register: async (input: RegisterInput) => {
        try {
          const { data } = await apolloClient.mutate<RegisterMutationData, { data: RegisterInput }>(
            {
              mutation: REGISTER_MUTATION,
              variables: {
                data: {
                  name: input.name,
                  email: input.email,
                  password: input.password,
                },
              },
            },
          );

          if (!data?.register) {
            return;
          }

          const { token, user } = data.register;

          set({
            user,
            token,
            isAuthenticated: true,
          });
        } catch (err) {
          console.error(err);
          throw err;
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
