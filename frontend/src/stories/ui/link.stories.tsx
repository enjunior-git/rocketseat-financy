import type { Meta, StoryObj } from "@storybook/react-vite";

import { Link } from "@/shared/ui/link";

const meta = {
  title: "UI/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
    },
    href: {
      control: "text",
    },
  },
  args: {
    children: "Label",
    href: "#",
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
