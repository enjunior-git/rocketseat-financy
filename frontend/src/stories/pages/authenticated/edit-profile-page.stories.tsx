import type { Meta, StoryObj } from "@storybook/react-vite";
import { EditProfilePage } from "@/pages/edit-profile-page";
import { withAuthenticatedPageLayout } from "./authenticated-page-story-layout";

const meta = {
  title: "Pages/Authenticated/Edit Profile",
  component: EditProfilePage,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withAuthenticatedPageLayout],
  tags: ["autodocs"],
  args: {
    email: "account@example.com",
    name: "Test Account",
  },
} satisfies Meta<typeof EditProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
