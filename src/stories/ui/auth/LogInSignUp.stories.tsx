import { Meta, StoryObj } from '@storybook/react';
import { AuthButtons, AuthButtonsProps } from '@/components/auth/AuthButtons';

export default {
  title: 'Auth/LogInSignUp',
  component: AuthButtons,
  parameters: { layout: 'centered' },
  argTypes: {
    isLoggedIn: { control: 'boolean', description: 'Whether the user is logged in' },
    className: { control: 'text', description: 'Additional classes' },
    onAuthStateChange: { action: 'onAuthStateChange' }
  },
} as Meta<AuthButtonsProps & { isLoggedIn?: boolean }>;
type Story = StoryObj<AuthButtonsProps & { isLoggedIn?: boolean }>;

export const Default = {
  args: { 
    isLoggedIn: false, 
    className: '', 
    onAuthStateChange: () => {} 
  },
  render: ({ isLoggedIn, ...props }) => <AuthButtons {...props} />
} satisfies Story;

export const LoggedIn: Story = {
  args: { isLoggedIn: true, className: '', onAuthStateChange: () => {} },
  render: ({ isLoggedIn, ...props }) => <AuthButtons {...props} />
}; 