import { useId } from "react";
import styles from "./Input.module.css";
import type { InputProps } from "./Input.types";
import {
  ICON_POSITION_END,
  ICON_POSITION_START,
  INPUT_ARIA_LIVE_POLITE,
  INPUT_CLEAR_ICON,
  INPUT_CLEAR_LABEL,
  INPUT_INPUT_MODE_DECIMAL,
  INPUT_ROLE_ALERT,
  INPUT_TYPE_CURRENCY,
  INPUT_TYPE_TEXT,
  SIZE_MEDIUM,
} from "../../const";

// export type { InputProps } from "./Input.types";

export function Input({
  id,
  label,
  helperText,
  error,
  size = SIZE_MEDIUM,
  type = INPUT_TYPE_TEXT,
  icon,
  iconPosition = ICON_POSITION_START,
  prefix,
  suffix,
  clearable = false,
  clearAriaLabel = INPUT_CLEAR_LABEL,
  onClear,
  required,
  className = "",
  "aria-describedby": describedBy,
  disabled,
  readOnly,
  value,
  defaultValue,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const inputType = type === INPUT_TYPE_CURRENCY ? INPUT_TYPE_TEXT : type;
  const inputMode =
    type === INPUT_TYPE_CURRENCY && props.inputMode == null
      ? INPUT_INPUT_MODE_DECIMAL
      : props.inputMode;
  const message = error ?? helperText;
  const hasValue =
    value !== undefined
      ? String(value).length > 0
      : defaultValue !== undefined
        ? String(defaultValue).length > 0
        : false;
  const showClearButton =
    clearable && Boolean(onClear) && hasValue && !disabled && !readOnly;
  const fieldClasses = [
    styles["faster-input__field"],
    styles[`faster-input__field--${size}`],
    error ? styles["faster-input__field--invalid"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles["faster-input"]}>
      {label && (
        <label className={styles["faster-input__label"]} htmlFor={inputId}>
          {label}
          {required && (
            <span
              className={styles["faster-input__required"]}
              aria-hidden="true"
            >
              {" "}
              *
            </span>
          )}
        </label>
      )}
      <div className={fieldClasses}>
        {prefix ? (
          <span className={styles["faster-input__addon"]} aria-hidden="true">
            {prefix}
          </span>
        ) : null}
        {icon && iconPosition === ICON_POSITION_START ? (
          <span className={styles["faster-input__icon"]} aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <input
          id={inputId}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy ?? (message ? hintId : undefined)}
          className={`${styles["faster-input__control"]} ${className}`.trim()}
          type={inputType}
          inputMode={inputMode}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          readOnly={readOnly}
          {...props}
        />
        {icon && iconPosition === ICON_POSITION_END ? (
          <span className={styles["faster-input__icon"]} aria-hidden="true">
            {icon}
          </span>
        ) : null}
        {showClearButton ? (
          <button
            type="button"
            className={styles["faster-input__clear"]}
            aria-label={clearAriaLabel}
            onClick={onClear}
          >
            {INPUT_CLEAR_ICON}
          </button>
        ) : null}
        {suffix ? (
          <span className={styles["faster-input__addon"]} aria-hidden="true">
            {suffix}
          </span>
        ) : null}
      </div>
      {message && (
        <p
          id={hintId}
          role={error ? INPUT_ROLE_ALERT : undefined}
          aria-live={error ? INPUT_ARIA_LIVE_POLITE : undefined}
          className={`${styles["faster-input__hint"]} ${
            error ? styles["faster-input__error"] : ""
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
