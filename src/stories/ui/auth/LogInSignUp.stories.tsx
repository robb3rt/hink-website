import { Meta, StoryObj } from '@storybook/react';
import { AuthButtons } from '@/components/auth/AuthButtons';

interface StoryProps {
  isLoggedIn?: boolean;
  className?: string;
}

const meta: Meta<StoryProps> = {
  title: 'Auth/LogInSignUp',
  component: AuthButtons,
  parameters: { layout: 'centered' },
  argTypes: {
    isLoggedIn: { control: 'boolean', description: 'Whether the user is logged in' },
    className: { control: 'text', description: 'Additional classes' },
  },
};
export default meta;
type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: { isLoggedIn: false, className: '' },
};

export const LoggedIn: Story = {
  args: { isLoggedIn: true, className: '' },
}; 