import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // Move vendor libraries to a separate chunk
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
