import type { Meta, StoryObj } from "@storybook/react-vite";

import { PaginationButton } from "@/shared/ui/pagination-button";

const meta = {
  title: "UI/Buttons/Pagination",
  component: PaginationButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    page: {
      control: "text",
    },
    variant: {
      control: "inline-radio",
      options: ["primary", "outline"],
    },
    current: {
      control: "boolean",
    },
  },
  args: {
    page: "1",
    variant: "outline",
    current: false,
  },
} satisfies Meta<typeof PaginationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = {};

export const Primary: Story = {
  args: {
    variant: "primary",
    current: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
