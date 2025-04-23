// DarkModeDecorator.tsx
import React, { useEffect } from "react";
import { useDarkMode } from "storybook-dark-mode";
import type { PartialStoryFn, StoryContext } from "@storybook/types";
import type { ReactRenderer } from "@storybook/react";

export const DarkModeDecorator = (
  Story: PartialStoryFn<ReactRenderer>,
  context: StoryContext<ReactRenderer>
) => {
  const isDark = useDarkMode();

  useEffect(() => {
    // Apply dark mode class to html element for Tailwind
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        <Story />
      </div>
    </div>
  );
};
