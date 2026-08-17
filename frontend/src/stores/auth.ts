import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RegisterResult } from "@/lib/auth/register";
import type { User } from "@/types";

type AuthSession = Pick<RegisterResult, "refreshToken" | "token" | "user">;

type AuthState = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setSession: (session: AuthSession) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      setSession: ({ refreshToken, token, user }) => {
        set({
          user,
          token,
          refreshToken,
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
