import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button"; // Adjust the import path if necessary

const meta: Meta<typeof Button> = {
  title: "UI/Button", // Storybook category and name
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ], // Options defined in buttonVariants
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"], // Options defined in buttonVariants
    },
    children: {
      control: "text",
      description: "Button label",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default = {
  args: {
    children: 'Button',
  },
} satisfies Story;

export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: "default",
    children: "Delete",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "default",
    children: "Outline Button",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
  },
};

export const IconButton: Story = {
  args: {
    size: "icon",
    children: "😀", // Add an emoji or icon
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    size: "default",
    children: "Click Me"
  }
};
