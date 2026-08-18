import type { Meta, StoryObj } from "@storybook/react-vite";

import { RegisterPage } from "@/pages/register-page";

const meta = {
  title: "Pages/Auth/Register",
  component: RegisterPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RegisterPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
