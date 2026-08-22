import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonCategory = "normal" | "danger";
export type ButtonVariant = "primary" | "outline" | "ghost" | "link";
export type ButtonSize = "large" | "medium" | "small";
export type ButtonIconPosition = "start" | "end";
export type ButtonIconOnlyShape = "square" | "round";

type ButtonNativeProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

type ButtonSharedProps = ButtonNativeProps & {
  category?: ButtonCategory & {};
  variant?: ButtonVariant & {};
  size?: ButtonSize & {};
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
};

type ButtonLabelProps = ButtonSharedProps & {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: ButtonIconPosition & {};
  iconOnlyShape?: never;
  "aria-label"?: string;
};

type ButtonIconOnlyProps = ButtonSharedProps & {
  children?: never;
  icon: ReactNode;
  iconPosition?: never;
  iconOnlyShape?: ButtonIconOnlyShape & {};
  "aria-label": string;
  variant?: Exclude<ButtonVariant, "link"> & {};
};

export type ButtonProps = ButtonLabelProps | ButtonIconOnlyProps;
