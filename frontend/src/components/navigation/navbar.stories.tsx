import type { Meta, StoryObj } from "@storybook/react-vite";

import { Navbar } from "./navbar";

const meta = {
  title: "Navigation/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userFullName: "Test Account",
  },
};
