import { useId } from "react";
import "./Input.css";
import type { InputProps } from "./Input.types";
export type { InputProps } from "./Input.types";
export function Input({
  id,
  label,
  helperText,
  error,
  required,
  className = "",
  "aria-describedby": describedBy,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const message = error ?? helperText;
  return (
    <div className="faster-input">
      {label && (
        <label className="faster-input__label" htmlFor={inputId}>
          {label}
          {required && (
            <span className="faster-input__required" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
      )}
      <input
        id={inputId}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy ?? (message ? hintId : undefined)}
        className={`faster-input__control ${className}`.trim()}
        {...props}
      />
      {message && (
        <p
          id={hintId}
          className={`faster-input__hint ${error ? "faster-input__error" : ""}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
