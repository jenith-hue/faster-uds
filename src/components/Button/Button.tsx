import styles from "./Button.module.css";
import type {
  ButtonCategory,
  ButtonIconOnlyShape,
  ButtonIconPosition,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from "./Button.types";

export type {
  ButtonCategory,
  ButtonIconOnlyShape,
  ButtonIconPosition,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from "./Button.types";

function getButtonClassName(
  base: string,
  category: ButtonCategory,
  variant: ButtonVariant,
  size: ButtonSize,
  iconOnlyShape?: ButtonIconOnlyShape,
) {
  return [
    styles[base],
    styles[`faster-button--${category}`],
    styles[`faster-button--${variant}`],
    styles[`faster-button--${size}`],
    iconOnlyShape ? styles[`faster-button--icon-${iconOnlyShape}`] : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function getIconPositionClass(position: ButtonIconPosition) {
  return position === "end"
    ? styles["faster-button__icon--end"]
    : styles["faster-button__icon--start"];
}

export function Button({
  category = "normal",
  variant = "primary",
  size = "medium",
  loading = false,
  icon,
  iconPosition = "start",
  iconOnlyShape = "square",
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
  const isIconOnly = children === null || children === undefined;
  const busy = loading || ariaBusy;
  const classes = [
    getButtonClassName(
      "faster-button",
      category,
      variant,
      size,
      isIconOnly ? iconOnlyShape : undefined,
    ),
    fullWidth ? styles["faster-button--full-width"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading ? (
        <span className={styles["faster-button__spinner"]} aria-hidden="true" />
      ) : isIconOnly ? (
        <span className={styles["faster-button__icon"]} aria-hidden="true">
          {icon}
        </span>
      ) : icon && iconPosition === "start" ? (
        <span
          className={`${styles["faster-button__icon"]} ${getIconPositionClass(
            iconPosition,
          )}`}
          aria-hidden="true"
        >
          {icon}
        </span>
      ) : null}
      {!isIconOnly && children !== null && children !== undefined ? (
        <span className={styles["faster-button__label"]}>{children}</span>
      ) : null}
      {!loading && !isIconOnly && icon && iconPosition === "end" ? (
        <span
          className={`${styles["faster-button__icon"]} ${getIconPositionClass(
            iconPosition,
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
