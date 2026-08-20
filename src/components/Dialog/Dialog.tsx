import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Dialog.module.css";
import type {
  DialogContentProps,
  DialogHeaderProps,
  DialogProps,
} from "./Dialog.types";

export type {
  DialogContentProps,
  DialogHeaderProps,
  DialogProps,
} from "./Dialog.types";

export function Dialog({
  open,
  onOpenChange,
  children,
  ...props
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocus.current = document.activeElement as HTMLElement;
    const timer = window.setTimeout(() => dialogRef.current?.focus(), 0);
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };

    document.addEventListener("keydown", escape);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", escape);
      previousFocus.current?.focus();
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return createPortal(
    <div
      className={styles["faster-dialog__backdrop"]}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <div
        ref={dialogRef}
        className={styles["faster-dialog"]}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export function DialogHeader({ title, id, onClose }: DialogHeaderProps) {
  return (
    <header className={styles["faster-dialog__header"]}>
      <h2 id={id} className={styles["faster-dialog__title"]}>
        {title}
      </h2>
      {onClose && (
        <button
          className={styles["faster-dialog__close"]}
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
        >
          ×
        </button>
      )}
    </header>
  );
}

export function DialogBody({ children }: DialogContentProps) {
  return <div className={styles["faster-dialog__body"]}>{children}</div>;
}

export function DialogFooter({ children }: DialogContentProps) {
  return <footer className={styles["faster-dialog__footer"]}>{children}</footer>;
}
