import type { Meta, StoryObj } from "@storybook/react-vite";
import { Trash2, UserRoundPlus } from "lucide-react";

import { IconButton } from "./icon-button";

const meta = {
  title: "UI/Buttons/Icon",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["neutral", "danger"],
    },
  },
  args: {
    tone: "neutral",
    icon: <UserRoundPlus />,
    "aria-label": "Add user",
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <IconButton {...args} />,
};

export const Danger: Story = {
  args: {
    tone: "danger",
    icon: <Trash2 />,
    "aria-label": "Delete",
  },
};
