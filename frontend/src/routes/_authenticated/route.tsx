import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AuthenticatedLayout } from "@/widgets/layout";
import { useAuthStore } from "@/entities/session";

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
