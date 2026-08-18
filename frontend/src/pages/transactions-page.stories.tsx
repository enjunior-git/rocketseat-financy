import type { Meta, StoryObj } from "@storybook/react-vite";

import { withAuthenticatedPageLayout } from "./authenticated-page-story-layout";
import { withPageQueryState } from "./page-story-mocks";
import { TransactionsPage } from "./transactions-page";

const meta = {
  title: "Pages/TransactionsPage",
  component: TransactionsPage,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withAuthenticatedPageLayout],
  tags: ["autodocs"],
} satisfies Meta<typeof TransactionsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [withPageQueryState("default")],
};

export const Loading: Story = {
  decorators: [withPageQueryState("loading")],
};

export const ErrorState: Story = {
  decorators: [withPageQueryState("error")],
};
