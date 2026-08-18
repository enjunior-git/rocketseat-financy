import { createRootRoute, Outlet } from "@tanstack/react-router";

import { GenericErrorPage } from "@/pages/generic-error-page";
import { NotFoundPage } from "@/pages/not-found-page";

const RootComponent = () => <Outlet />;

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ({ error, reset }) => <GenericErrorPage error={error} reset={reset} />,
  notFoundComponent: NotFoundPage,
});
