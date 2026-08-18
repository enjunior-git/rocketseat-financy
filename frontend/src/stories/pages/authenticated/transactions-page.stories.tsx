import type { Meta, StoryObj } from "@storybook/react-vite";
import { TransactionsPage } from "@/pages/transactions-page";
import { withAuthenticatedPageLayout } from "./authenticated-page-story-layout";
import { withPageQueryState } from "./page-story-mocks";

const meta = {
  title: "Pages/Authenticated/Transactions",
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
