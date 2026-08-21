import type { HTMLAttributes, ReactNode } from "react";

export type DialogSize = "small" | "medium" | "large";

export type DialogProps = Omit<HTMLAttributes<HTMLDivElement>, "title" | "children"> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  closable?: boolean;
  footer?: ReactNode;
  divider?: boolean;
  size?: DialogSize;
  children: ReactNode;
};
