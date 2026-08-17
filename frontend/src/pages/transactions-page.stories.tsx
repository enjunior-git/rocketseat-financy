import type { Meta, StoryObj } from "@storybook/react-vite";

import { TransactionsPage } from "./transactions-page";

const meta = {
  title: "Pages/TransactionsPage",
  component: TransactionsPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TransactionsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
