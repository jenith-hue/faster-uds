import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Button } from "@/components/Button/Button";
// import styles from "../Button.module.css";

describe("Button a11y", () => {
  it("has proper button role", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
  });

  it("has type button attribute", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("respects aria-label prop", () => {
    render(<Button aria-label="Save document">Save</Button>);
    expect(screen.getByRole("button", { name: "Save document" })).toBeInTheDocument();
  });

  it("supports aria-disabled for disabled state", () => {
    render(<Button aria-disabled="true">Disabled</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
  });

  it("is keyboard accessible with enter key", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    const button = screen.getByRole("button");
    button.focus();
    await user.keyboard("{Enter}");

    expect(handleClick).toHaveBeenCalled();
  });

  it("is keyboard accessible with space key", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    const button = screen.getByRole("button");
    button.focus();
    await user.keyboard(" ");

    expect(handleClick).toHaveBeenCalled();
  });

  it("is focusable", () => {
    render(<Button>Focus me</Button>);
    const button = screen.getByRole("button");
    button.focus();
    expect(button).toHaveFocus();
  });

  it("icon-only button requires aria-label", () => {
    const { container } = render(
      <Button icon={<span>+</span>} aria-label="Add item" iconOnlyShape="square" />
    );
    expect(container.querySelector("button")).toHaveAttribute("aria-label", "Add item");
  });

  it("has accessible text content", () => {
    render(<Button>Submit Form</Button>);
    expect(screen.getByRole("button", { name: /submit form/i })).toBeInTheDocument();
  });

  it("respects aria-describedby prop", () => {
    render(
      <>
        <Button aria-describedby="help-text">Save</Button>
        <p id="help-text">Click to save changes</p>
      </>
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-describedby", "help-text");
  });

  it("inherits semantic meaning with different categories", () => {
    const { unmount } = render(<Button category="normal">Normal</Button>);
    expect(screen.getByRole("button", { name: "Normal" })).toBeInTheDocument();
    unmount();

    render(<Button category="danger">Delete</Button>);
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });
});
