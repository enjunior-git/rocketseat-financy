import type { Meta, StoryObj } from "@storybook/react-vite";

import { withPageQueryState } from "./page-story-mocks";
import { DashboardPage } from "./dashboard-page";

const meta = {
  title: "Pages/DashboardPage",
  component: DashboardPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [withPageQueryState("default")],
};

export const Loading: Story = {
  decorators: [withPageQueryState("loading")],
};

export const ErrorState: Story = {
  decorators: [withPageQueryState("error")],
};
