import styles from "@/components/Button/Button.module.css";
import type {
  ButtonCategory,
  ButtonIconOnlyShape,
  ButtonIconPosition,
  ButtonSize,
  ButtonVariant,
} from "@/components/Button/Button.types";
import { ICON_POSITION_END } from "@/const";

export function getButtonClassName(
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

export function getIconPositionClass(position: ButtonIconPosition) {
  return position === ICON_POSITION_END
    ? styles["faster-button__icon--end"]
    : styles["faster-button__icon--start"];
}
