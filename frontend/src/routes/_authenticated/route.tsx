import { createFileRoute, Outlet } from "@tanstack/react-router";

const AuthenticatedLayout = () => <Outlet />;

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {
    console.log("TODO: add login validation for authenticated routes");
  },
  component: AuthenticatedLayout,
});
