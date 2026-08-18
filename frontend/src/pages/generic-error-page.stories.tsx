import type { Meta, StoryObj } from "@storybook/react-vite";

import { GenericErrorPage } from "./generic-error-page";

const meta = {
  title: "Pages/Errors/Generic",
  component: GenericErrorPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    error: new globalThis.Error("The latest request failed before the page could render."),
  },
} satisfies Meta<typeof GenericErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutMessage: Story = {
  args: {
    error: undefined,
  },
};
