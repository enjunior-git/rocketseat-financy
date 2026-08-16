import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mail } from "lucide-react";

import { Input } from "./input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    helperText: {
      control: "text",
    },
    error: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    icon: {
      control: false,
    },
  },
  args: {
    label: "Label",
    helperText: "Helper",
    placeholder: "Placeholder",
    icon: <Mail />,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Simple: Story = {
  args: {
    helperText: undefined,
    icon: undefined,
  },
};

export const Filled: Story = {
  args: {
    defaultValue: "Text",
  },
};

export const ErrorState: Story = {
  args: {
    defaultValue: "Text",
    error: "Helper",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "Text",
    disabled: true,
  },
};
