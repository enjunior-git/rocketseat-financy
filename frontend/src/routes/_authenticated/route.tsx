import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { useAuthStore } from "@/stores/auth";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {
    if (!useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => (
    <AuthenticatedLayout>
      <Outlet />
    </AuthenticatedLayout>
  ),
});
