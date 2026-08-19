import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonIconPosition = "start" | "end";

type ButtonNativeProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export type ButtonProps = ButtonNativeProps & {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: ButtonIconPosition;
  fullWidth?: boolean;
};
