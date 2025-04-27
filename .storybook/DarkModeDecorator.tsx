// DarkModeDecorator.tsx
import React, { useEffect, useState } from "react";
import { useDarkMode } from "storybook-dark-mode";
import type { PartialStoryFn, StoryContext } from "@storybook/types";
import type { ReactRenderer } from "@storybook/react";

export const DarkModeDecorator = (
  Story: PartialStoryFn<ReactRenderer>,
  context: StoryContext<ReactRenderer>
) => {
  const isDark = useDarkMode();
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Sync localStorage for your app's theme logic
    if (isDark) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
    // Force re-mount so useTheme picks up the change
    setKey((k) => k + 1);

    // Also update Tailwind dark class for Storybook visuals
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className={isDark ? "dark" : ""} key={key}>
      <div className="min-h-screen bg-background text-foreground">
        <Story />
      </div>
    </div>
  );
};
