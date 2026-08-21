import { createContext, useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Dialog.module.css";
import {
  BUTTON_TYPE_BUTTON,
  DATA_FALSE,
  DATA_TRUE,
  DIALOG_ARIA_MODAL,
  DIALOG_CLOSE_ICON,
  DIALOG_CLOSE_LABEL,
  DIALOG_ROLE,
  SIZE_MEDIUM,
} from "../../const";
import type {
  DialogContentProps,
  DialogHeaderProps,
  DialogProps,
  DialogSize,
} from "./Dialog.types";

export type {
  DialogContentProps,
  DialogHeaderProps,
  DialogProps,
  DialogSize,
} from "./Dialog.types";

type DialogContextValue = {
  divider: boolean;
  size: DialogSize;
};

const DialogContext = createContext<DialogContextValue>({
  divider: false,
  size: SIZE_MEDIUM,
});

function useDialogContext() {
  return useContext(DialogContext);
}

export function Dialog({
  open,
  onOpenChange,
  size = SIZE_MEDIUM,
  divider = false,
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
      <DialogContext.Provider value={{ divider, size }}>
        <div
          ref={dialogRef}
          className={`${styles["faster-dialog"]} ${styles[`faster-dialog--${size}`]}`}
          role={DIALOG_ROLE}
          aria-modal={DIALOG_ARIA_MODAL}
          tabIndex={-1}
          data-divider={divider ? DATA_TRUE : DATA_FALSE}
          {...props}
        >
          {children}
        </div>
      </DialogContext.Provider>
    </div>,
    document.body,
  );
}

export function DialogHeader({ title, id, onClose }: DialogHeaderProps) {
  const { divider } = useDialogContext();
  const hasTitle = title !== null && title !== undefined && title !== "";
  const hasClose = Boolean(onClose);

  if (!hasTitle && !hasClose) return null;

  return (
    <header
      className={`${styles["faster-dialog__header"]} ${
        divider ? styles["faster-dialog__header--divider"] : ""
      }`}
      data-divider={divider ? DATA_TRUE : DATA_FALSE}
    >
      {hasTitle ? (
        <h2 id={id} className={styles["faster-dialog__title"]}>
          {title}
        </h2>
      ) : null}
      {hasClose ? (
        <button
          className={styles["faster-dialog__close"]}
          type={BUTTON_TYPE_BUTTON}
          aria-label={DIALOG_CLOSE_LABEL}
          onClick={onClose}
        >
          {DIALOG_CLOSE_ICON}
        </button>
      ) : null}
    </header>
  );
}

export function DialogBody({ children }: DialogContentProps) {
  const { divider } = useDialogContext();

  return (
    <div
      className={styles["faster-dialog__body"]}
      data-divider={divider ? DATA_TRUE : DATA_FALSE}
    >
      {children}
    </div>
  );
}

export function DialogFooter({ children }: DialogContentProps) {
  const { divider } = useDialogContext();

  return (
    <footer
      className={`${styles["faster-dialog__footer"]} ${
        divider ? styles["faster-dialog__footer--divider"] : ""
      }`}
      data-divider={divider ? DATA_TRUE : DATA_FALSE}
    >
      {children}
    </footer>
  );
}
