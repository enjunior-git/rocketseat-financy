import type { Meta, StoryObj } from "@storybook/react-vite";

import { EditProfilePage } from "./edit-profile-page";

const meta = {
  title: "Pages/EditProfilePage",
  component: EditProfilePage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    email: "account@example.com",
    name: "Test Account",
  },
} satisfies Meta<typeof EditProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
