import type { Decorator } from "@storybook/react-vite";

import { AuthenticatedLayout } from "@/widgets/layout";

const withAuthenticatedPageLayout: Decorator = (Story) => (
  <AuthenticatedLayout userFullName="Test Account">
    <Story />
  </AuthenticatedLayout>
);

export { withAuthenticatedPageLayout };
