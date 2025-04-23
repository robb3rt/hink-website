import React from 'react';
import type { Decorator } from '@storybook/react';
import { AuthContext } from '../../src/contexts/auth-context';

// Mock user and session data
const mockUser = {
  id: 'mock-user-id',
  email: 'user@example.com',
  user_metadata: { full_name: 'Test User', avatar_url: 'https://github.com/shadcn.png' },
  app_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  role: 'authenticated',
  updated_at: new Date().toISOString(),
};

const mockSession = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  token_type: 'bearer',
  user: mockUser,
};

// Mock auth actions
export const mockAuthActions = {
  signOut: async () => Promise.resolve(),
  signIn: async () => Promise.resolve(),
  session: null,
  user: null,
  loading: false,
  error: null,
};

export const mockAuthActionsWithSession = {
  ...mockAuthActions,
  session: mockSession,
  user: mockUser,
};

// Shared auth decorator
export const withAuth: Decorator<{ isLoggedIn?: boolean }> = (Story, context) => {
  const { isLoggedIn = false } = context.args;
  const value = isLoggedIn ? mockAuthActionsWithSession : mockAuthActions;
  return (
    <AuthContext.Provider value={value}>
      <Story />
    </AuthContext.Provider>
  );
}; 