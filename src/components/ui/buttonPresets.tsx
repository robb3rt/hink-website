import { ButtonProps } from "@/components/ui/button"; // Import ButtonProps from Button.tsx

export const smallButtonPreset: ButtonProps = {
  size: "sm",
  variant: "default",
  className: "some-custom-class",
};

export const largeButtonPreset: ButtonProps = {
  size: "lg",
  variant: "outline",
  className: "some-other-custom-class",
};
