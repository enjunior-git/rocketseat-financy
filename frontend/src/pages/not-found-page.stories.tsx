import type { Meta, StoryObj } from "@storybook/react-vite";

import { NotFoundPage } from "./not-found-page";

const meta = {
  title: "Pages/Errors/NotFound",
  component: NotFoundPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NotFoundPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
