import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonCategory = "normal" | "danger";
export type ButtonVariant = "primary" | "outline" | "ghost" | "link";
export type ButtonSize = "large" | "medium" | "small";
export type ButtonIconPosition = "start" | "end";
export type ButtonIconOnlyShape = "square" | "round";

type ButtonNativeProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

type ButtonSharedProps = ButtonNativeProps & {
  category?: "normal" | "danger";
  variant?: "primary" | "outline" | "ghost" | "link";
  size?: "large" | "medium" | "small";
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
};

type ButtonLabelProps = ButtonSharedProps & {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  iconOnlyShape?: never;
  "aria-label"?: string;
};

type ButtonIconOnlyProps = ButtonSharedProps & {
  children?: never;
  icon: ReactNode;
  iconPosition?: never;
  iconOnlyShape?: "square" | "round";
  "aria-label": string;
  variant?: "primary" | "outline" | "ghost";
};

export type ButtonProps = ButtonLabelProps | ButtonIconOnlyProps;
