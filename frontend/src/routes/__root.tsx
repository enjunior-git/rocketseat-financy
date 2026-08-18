import { createRootRoute, Outlet } from "@tanstack/react-router";

import { GenericErrorPage } from "@/pages/generic-error-page";
import { NotFoundPage } from "@/pages/not-found-page";

export const Route = createRootRoute({
  component: () => <Outlet />,
  errorComponent: ({ error, reset }) => <GenericErrorPage error={error} reset={reset} />,
  notFoundComponent: NotFoundPage,
});
