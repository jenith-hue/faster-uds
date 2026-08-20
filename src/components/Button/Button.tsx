import styles from "./Button.module.css";
import type { ButtonIconPosition, ButtonProps } from "./Button.types";

export type {
  ButtonIconPosition,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from "./Button.types";

function getIconPositionClass(position: ButtonIconPosition) {
  return position === "end"
    ? styles["faster-button__icon--end"]
    : styles["faster-button__icon--start"];
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "start",
  fullWidth = false,
  className = "",
  type = "button",
  disabled = false,
  children,
  "aria-busy": ariaBusy,
  "aria-label": ariaLabel,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const isIconOnly = Boolean(icon) && !children;
  const busy = loading || ariaBusy;
  const classes = [
    styles["faster-button"],
    styles[`faster-button--${variant}`],
    styles[`faster-button--${size}`],
    fullWidth ? styles["faster-button--full-width"] : "",
    isIconOnly ? styles["faster-button--icon-only"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading ? (
        <span className={styles["faster-button__spinner"]} aria-hidden="true" />
      ) : icon && iconPosition === "start" ? (
        <span
          className={`${styles["faster-button__icon"]} ${getIconPositionClass(
            iconPosition
          )}`}
          aria-hidden="true"
        >
          {icon}
        </span>
      ) : null}
      {children ? (
        <span className={styles["faster-button__label"]}>{children}</span>
      ) : null}
      {!loading && icon && iconPosition === "end" ? (
        <span
          className={`${styles["faster-button__icon"]} ${getIconPositionClass(
            iconPosition
          )}`}
          aria-hidden="true"
        >
          {icon}
        </span>
      ) : null}
    </>
  );

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={busy || undefined}
      aria-label={ariaLabel}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
}
