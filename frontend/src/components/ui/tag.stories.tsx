import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tag } from "./tag";

const meta = {
  title: "UI/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["gray", "blue", "purple", "pink", "red", "orange", "yellow", "green"],
    },
    children: {
      control: "text",
    },
  },
  args: {
    children: "Label",
    variant: "gray",
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex max-w-xl flex-wrap items-center justify-center gap-x-10 gap-y-10">
      <Tag variant="gray">Label</Tag>
      <Tag variant="blue">Label</Tag>
      <Tag variant="purple">Label</Tag>
      <Tag variant="pink">Label</Tag>
      <Tag variant="red">Label</Tag>
      <Tag variant="orange">Label</Tag>
      <Tag variant="yellow">Label</Tag>
      <Tag variant="green">Label</Tag>
    </div>
  ),
};
