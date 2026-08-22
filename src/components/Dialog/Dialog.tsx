import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "@/components/Dialog/Dialog.module.css";
import type { DialogProps } from "@/components/Dialog/Dialog.types";

// export type { DialogProps } from "./Dialog.types";

export function Dialog({
  open,
  onOpenChange,
  title,
  closable = false,
  footer,
  divider = false,
  size = "medium",
  children,
  ...props
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();

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

  const showHeader = Boolean(title) || closable;

  return createPortal(
    <div
      className={styles["faster-dialog__backdrop"]}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <div
        ref={dialogRef}
        className={`${styles["faster-dialog"]} ${styles[`faster-dialog--${size}`]}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        data-divider={divider ? "true" : "false"}
        {...props}
      >
        {showHeader ? (
          <header
            className={`${styles["faster-dialog__header"]} ${
              divider ? styles["faster-dialog__header--divider"] : ""
            }`}
            data-divider={divider ? "true" : "false"}
          >
            {title ? (
              <h2 id={titleId} className={styles["faster-dialog__title"]}>
                {title}
              </h2>
            ) : (
              <span />
            )}
            {closable ? (
              <button
                className={styles["faster-dialog__close"]}
                type="button"
                aria-label="Close dialog"
                onClick={() => onOpenChange(false)}
              >
                ×
              </button>
            ) : null}
          </header>
        ) : null}
        <div
          className={styles["faster-dialog__body"]}
          data-divider={divider ? "true" : "false"}
        >
          {children}
        </div>
        {footer ? (
          <footer
            className={`${styles["faster-dialog__footer"]} ${
              divider ? styles["faster-dialog__footer--divider"] : ""
            }`}
            data-divider={divider ? "true" : "false"}
          >
            {footer}
          </footer>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
