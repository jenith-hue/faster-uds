import styles from "./Button.module.css";
import {
  BUTTON_CATEGORY_NORMAL,
  BUTTON_ICON_ONLY_SHAPE_SQUARE,
  BUTTON_TYPE_BUTTON,
  BUTTON_VARIANT_PRIMARY,
  ICON_POSITION_END,
  ICON_POSITION_START,
  SIZE_MEDIUM,
} from "../../const";
import type { ButtonProps } from "./Button.types";
import { getButtonClassName, getIconPositionClass } from "./Button.utils";

// export type {
//   ButtonCategory,
//   ButtonIconOnlyShape,
//   ButtonIconPosition,
//   ButtonProps,
//   ButtonSize,
//   ButtonVariant,
// } from "./Button.types";

export function Button({
  category = BUTTON_CATEGORY_NORMAL,
  variant = BUTTON_VARIANT_PRIMARY,
  size = SIZE_MEDIUM,
  loading = false,
  icon,
  iconPosition = ICON_POSITION_START,
  iconOnlyShape = BUTTON_ICON_ONLY_SHAPE_SQUARE,
  fullWidth = false,
  className = "",
  type = BUTTON_TYPE_BUTTON,
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
      ) : icon && iconPosition === ICON_POSITION_START ? (
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
      {!loading && !isIconOnly && icon && iconPosition === ICON_POSITION_END ? (
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
