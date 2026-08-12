import type { Meta, StoryObj } from "@storybook/react-vite";
import { UserRoundPlus } from "lucide-react";

import { LabelButton } from "./label-button";

const meta = {
  title: "UI/LabelButton",
  component: LabelButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "outline"],
    },
    size: {
      control: "inline-radio",
      options: ["md", "sm"],
    },
    children: {
      control: "text",
    },
  },
  args: {
    variant: "primary",
    size: "md",
    children: "Label",
  },
} satisfies Meta<typeof LabelButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <LabelButton {...args}>
      <UserRoundPlus />
      {args.children}
    </LabelButton>
  ),
};

export const Medium: Story = {
  render: () => (
    <div className="grid grid-cols-2 items-center gap-x-10">
      <LabelButton variant="primary" size="md">
        <UserRoundPlus />
        Label
      </LabelButton>
      <LabelButton variant="outline" size="md">
        <UserRoundPlus />
        Label
      </LabelButton>
    </div>
  ),
};

export const Small: Story = {
  render: () => (
    <div className="grid grid-cols-2 items-center gap-x-10">
      <LabelButton variant="primary" size="sm">
        <UserRoundPlus />
        Label
      </LabelButton>
      <LabelButton variant="outline" size="sm">
        <UserRoundPlus />
        Label
      </LabelButton>
    </div>
  ),
};
