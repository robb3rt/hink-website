import '../src/index.css'
import '../src/App.css'
import type { Preview } from '@storybook/react'
import { DarkModeDecorator } from './DarkModeDecorator'
import { withAuth } from './decorators/withAuth'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
    darkMode: {
      current: 'light'
    }
  },
  
  // Apply withAuth globally so any story can use isLoggedIn arg
  decorators: [DarkModeDecorator,withAuth],
}

export default preview
