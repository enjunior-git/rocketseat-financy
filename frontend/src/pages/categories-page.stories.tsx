import type { Meta, StoryObj } from "@storybook/react-vite";

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

export const Default: Story = {};
