import type { HTMLAttributes, ReactNode } from "react";

export type DialogSize = "small" | "medium" | "large";

export type DialogProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  size?: DialogSize;
  divider?: boolean;
};

export type DialogHeaderProps = {
  title?: ReactNode;
  id?: string;
  onClose?: () => void;
};

export type DialogContentProps = {
  children: ReactNode;
};
