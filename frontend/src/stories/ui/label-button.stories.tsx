import type { Meta, StoryObj } from "@storybook/react-vite";
import { UserRoundPlus } from "lucide-react";

import { Button } from "@/shared/ui/button";

const meta = {
  title: "UI/Buttons/Label",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "outline"],
    },
    size: {
      control: "inline-radio",
      options: ["label", "label-sm"],
    },
    children: {
      control: "text",
    },
  },
  args: {
    variant: "default",
    size: "label",
    children: "Label",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Button {...args}>
      <UserRoundPlus />
      {args.children}
    </Button>
  ),
};

export const DefaultSize: Story = {
  render: () => (
    <div className="grid grid-cols-2 items-center gap-x-10">
      <Button variant="default" size="label">
        <UserRoundPlus />
        Label
      </Button>
      <Button variant="outline" size="label">
        <UserRoundPlus />
        Label
      </Button>
    </div>
  ),
};

export const Small: Story = {
  render: () => (
    <div className="grid grid-cols-2 items-center gap-x-10">
      <Button variant="default" size="label-sm">
        <UserRoundPlus />
        Label
      </Button>
      <Button variant="outline" size="label-sm">
        <UserRoundPlus />
        Label
      </Button>
    </div>
  ),
};
