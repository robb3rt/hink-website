import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'react-core': ['react', 'react-dom', 'react-router-dom'],
          
          // UI Component libraries
          'ui-components': [
            '@radix-ui/react-avatar',
            '@radix-ui/react-dialog',
            '@radix-ui/react-popover',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-tooltip',
            '@radix-ui/themes'
          ],
          
          // Icons and UI utilities
          'ui-utils': ['lucide-react', 'clsx', 'tailwind-merge', 'class-variance-authority'],
          
          // Authentication and backend
          'auth': ['@supabase/supabase-js', '@supabase/auth-helpers-nextjs', '@supabase/ssr'],
        },
      },
    },
  },
  css: {
    postcss: "./postcss.config.js", // This ensures PostCSS config is used
  },
  optimizeDeps: {
    exclude: ["@storybook/react", "@storybook/addon-docs", "@mdx-js/react"],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
