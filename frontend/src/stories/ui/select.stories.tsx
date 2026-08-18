import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mail } from "lucide-react";

import { Select } from "@/shared/ui/select";

const options = [
  { label: "Option 1", value: "option-1" },
  { label: "Option 2", value: "option-2" },
  { label: "Option 3", value: "option-3" },
];

const meta = {
  title: "UI/Inputs/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    icon: {
      control: false,
    },
    options: {
      control: false,
    },
  },
  args: {
    label: "Label",
    placeholder: "Placeholder",
    defaultValue: "option-1",
    defaultOpen: true,
    icon: <Mail />,
    options,
    className: "w-[460px]",
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutIcon: Story = {
  args: {
    icon: undefined,
  },
};
