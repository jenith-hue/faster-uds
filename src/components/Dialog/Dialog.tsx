import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "@/components/Dialog/Dialog.module.css";
import type { DialogProps } from "@/components/Dialog/Dialog.types";
import {
  DATA_FALSE,
  DATA_TRUE,
  DIALOG_ARIA_MODAL,
  DIALOG_CLOSE_ICON,
  DIALOG_CLOSE_LABEL,
  DIALOG_ROLE,
} from "@/const";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Dialog({
  open,
  onOpenChange,
  title,
  closable = false,
  footer,
  divider = false,
  size = "medium",
  className = "",
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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        FOCUSABLE_SELECTOR,
      );
      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
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
        className={[
          styles["faster-dialog"],
          styles[`faster-dialog--${size}`],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        role={DIALOG_ROLE}
        aria-modal={DIALOG_ARIA_MODAL}
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        data-divider={divider ? DATA_TRUE : DATA_FALSE}
        {...props}
      >
        {showHeader ? (
          <header
            className={`${styles["faster-dialog__header"]} ${
              divider ? styles["faster-dialog__header--divider"] : ""
            }`}
            data-divider={divider ? DATA_TRUE : DATA_FALSE}
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
                aria-label={DIALOG_CLOSE_LABEL}
                onClick={() => onOpenChange(false)}
              >
                {DIALOG_CLOSE_ICON}
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
            data-divider={divider ? DATA_TRUE : DATA_FALSE}
          >
            {footer}
          </footer>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
