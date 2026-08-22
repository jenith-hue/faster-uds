import type { InputHTMLAttributes, ReactNode } from "react";

export type InputSize = "large" | "medium" | "small";
export type InputIconPosition = "start" | "end";
export type InputType = InputHTMLAttributes<HTMLInputElement>["type"] | "currency";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  label?: string;
  helperText?: string;
  error?: string;
  size?: "large" | "medium" | "small";
  type?: InputHTMLAttributes<HTMLInputElement>["type"] | "currency";
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  prefix?: ReactNode;
  suffix?: ReactNode;
  clearable?: boolean;
  clearAriaLabel?: string;
  onClear?: () => void;
};
