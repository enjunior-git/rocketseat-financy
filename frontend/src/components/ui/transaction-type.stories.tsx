import type { Meta, StoryObj } from "@storybook/react-vite";

import { TransactionType } from "./transaction-type";

const meta = {
  title: "UI/TransactionType",
  component: TransactionType,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["in", "out"],
    },
    children: {
      control: "text",
    },
  },
  args: {
    type: "in",
  },
} satisfies Meta<typeof TransactionType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const In: Story = {};

export const Out: Story = {
  args: {
    type: "out",
  },
};

export const Both: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-10">
      <TransactionType type="in" />
      <TransactionType type="out" />
    </div>
  ),
};
