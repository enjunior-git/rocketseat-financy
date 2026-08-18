import type { Decorator } from "@storybook/react-vite";

import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";

const withAuthenticatedPageLayout: Decorator = (Story) => (
  <AuthenticatedLayout userFullName="Test Account">
    <Story />
  </AuthenticatedLayout>
);

export { withAuthenticatedPageLayout };
