// DarkModeDecorator.tsx
import { useEffect, useRef } from "react";
import { useDarkMode } from "storybook-dark-mode";
import { addons } from "@storybook/preview-api";
import { UPDATE_DARK_MODE_EVENT_NAME } from "storybook-dark-mode"; // Event for dark mode updates
import type { PartialStoryFn, StoryContext } from "@storybook/types";
import type { ReactRenderer } from "@storybook/react";

export const DarkModeDecorator = (
  Story: PartialStoryFn<ReactRenderer>,
  context: StoryContext<ReactRenderer>
) => {
  const darkMode = useDarkMode(); // Get dark mode state from the plugin
  const isDarkModeRef = useRef<boolean>(darkMode); // Ref to track current dark mode state

  useEffect(() => {
    const channel = addons.getChannel();

    // Function to toggle the 'dark' class
    const applyDarkMode = (isDark: boolean) => {
      document.body.classList.toggle("dark", isDark);
    };

    // Initial application of dark mode
    applyDarkMode(darkMode);

    // Sync with dark mode changes from the plugin
    const handleDarkModeChange = (isDark: boolean) => {
      if (isDarkModeRef.current !== isDark) {
        isDarkModeRef.current = isDark;
        applyDarkMode(isDark);

        // Force a re-render of the current story
        channel.emit("storybook/force-reRender");
      }
    };

    // Listen for dark mode toggle events
    channel.on(UPDATE_DARK_MODE_EVENT_NAME, handleDarkModeChange);

    // Cleanup event listener on unmount
    return () => {
      channel.off(UPDATE_DARK_MODE_EVENT_NAME, handleDarkModeChange);
    };
  }, [darkMode]);

  // Return the story as a function
  return Story(context);
};
