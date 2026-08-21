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

  it("renders size, icons, prefix, suffix, and clear button", () => {
    const onClear = jest.fn();
    const icon = <span data-testid="icon">S</span>;

    render(
      <Input
        label="Website"
        size="small"
        prefix="http"
        suffix=".com"
        icon={icon}
        iconPosition="end"
        clearable
        onClear={onClear}
        defaultValue="example"
        aria-label="Website"
      />
    );

    const field = screen.getByLabelText("Website").parentElement;
    expect(field).toHaveClass(styles["faster-input__field--small"]);
    expect(screen.getByText("http")).toHaveClass(styles["faster-input__addon"]);
    expect(screen.getByText(".com")).toHaveClass(styles["faster-input__addon"]);
    expect(screen.getByTestId("icon")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Clear input" }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("supports number and currency input types", () => {
    const { rerender } = render(
      <Input label="Age" type="number" defaultValue="21" />
    );

    expect(screen.getByLabelText("Age")).toHaveAttribute("type", "number");

    rerender(<Input label="Price" type="currency" defaultValue="12.50" />);

    expect(screen.getByLabelText("Price")).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("Price")).toHaveAttribute("inputmode", "decimal");
  });
});
