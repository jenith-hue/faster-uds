import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from "./Input";
import styles from "./Input.module.css";

describe("Input", () => {
  it("connects label and helper text to input", () => {
    render(<Input label="Email" helperText="Work email only" required />);
    const input = screen.getByLabelText(/Email/);
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-describedby");
    expect(screen.getByText("Work email only")).toHaveAttribute(
      "id",
      input.getAttribute("aria-describedby")
    );
  });

  it("supports user input and accessible error state", () => {
    render(<Input label="Email" error="Invalid email" />);
    const input = screen.getByLabelText(/Email/);
    fireEvent.change(input, { target: { value: "bad" } });
    expect(input).toHaveValue("bad");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Invalid email")).toHaveClass(
      styles["faster-input__error"]
    );
  });
});
