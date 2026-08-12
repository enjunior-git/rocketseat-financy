import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
    children: {
      control: "text",
    },
  },
  args: {
    children: "Button",
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};
