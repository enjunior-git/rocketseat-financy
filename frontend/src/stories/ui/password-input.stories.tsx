import type { Meta, StoryObj } from "@storybook/react-vite";

import { PasswordInput } from "@/shared/ui/password-input";

const meta = {
  title: "UI/Inputs/Password",
  component: PasswordInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Password",
    placeholder: "Enter your password",
    helperText: "Password must be at least 8 characters",
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ErrorState: Story = {
  args: {
    error: "Password is required",
    helperText: undefined,
  },
};
