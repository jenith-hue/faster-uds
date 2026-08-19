import type { HTMLAttributes, ReactNode } from "react";

export type DialogProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
};

export type DialogHeaderProps = { title: string; id?: string; onClose?: () => void };
export type DialogContentProps = { children: ReactNode };
