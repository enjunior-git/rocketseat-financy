import type { Meta, StoryObj } from "@storybook/react-vite";

import { withPageQueryState } from "./page-story-mocks";
import { CategoriesPage } from "./categories-page";

const meta = {
  title: "Pages/CategoriesPage",
  component: CategoriesPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CategoriesPage>;

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
