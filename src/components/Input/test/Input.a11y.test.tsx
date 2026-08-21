import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Input } from "../Input";
import styles from "../Input.module.css";

describe("Input a11y", () => {
  it("has proper label and input association", () => {
    render(<Input label="Username" />);
    const input = screen.getByLabelText("Username");
    expect(input).toBeInTheDocument();
    expect(input.id).toBeTruthy();
  });

  it("properly associates aria-describedby with helper text", () => {
    render(<Input label="Email" helperText="Enter work email" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-describedby");
    const hintId = input.getAttribute("aria-describedby");
    expect(screen.getByText("Enter work email")).toHaveAttribute("id", hintId);
  });

  it("shows aria-invalid on error state", () => {
    const { rerender } = render(<Input label="Email" />);
    let input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "false");

    rerender(<Input label="Email" error="Email is required" />);
    input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("announces errors with aria-live and role alert", () => {
    render(<Input label="Email" error="Email is required" />);
    const error = screen.getByText("Email is required");
    expect(error).toHaveAttribute("role", "alert");
    expect(error).toHaveAttribute("aria-live", "polite");
  });

  it("supports required attribute and indicator", () => {
    render(<Input label="Username" required />);
    const input = screen.getByLabelText(/Username/);
    expect(input).toHaveAttribute("required");
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("is keyboard accessible", async () => {
    const user = userEvent.setup();
    render(<Input label="Search" />);

    const input = screen.getByLabelText("Search");
    await user.click(input);
    await user.keyboard("test");

    expect(input).toHaveValue("test");
  });

  it("is focusable", () => {
    render(<Input label="Focus test" />);
    const input = screen.getByLabelText("Focus test");
    input.focus();
    expect(input).toHaveFocus();
  });

  it("has aria-hidden on decorative elements", () => {
    render(
      <Input
        label="Currency"
        prefix="$"
        suffix=".00"
        icon={<span>💰</span>}
      />
    );
    const prefixes = screen.getAllByText("$");
    const hidden = prefixes.find(el => el.getAttribute("aria-hidden") === "true");
    expect(hidden).toBeInTheDocument();
  });

  it("clear button has proper aria-label", () => {
    render(
      <Input
        label="Clearable"
        clearable
        onClear={() => {}}
        defaultValue="text"
      />
    );
    const clearBtn = screen.getByRole("button", { name: "Clear input" });
    expect(clearBtn).toBeInTheDocument();
  });

  it("disabled state is accessible", () => {
    render(<Input label="Disabled" disabled />);
    expect(screen.getByLabelText("Disabled")).toBeDisabled();
  });

  it("readonly state is accessible", () => {
    render(<Input label="Readonly" readOnly defaultValue="Fixed value" />);
    const input = screen.getByLabelText("Readonly");
    expect(input).toHaveAttribute("readonly");
  });
});
