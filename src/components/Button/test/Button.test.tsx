import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "../Button";
import styles from "../Button.module.css";

describe("Button", () => {
  it("renders every supported category and variant pair", () => {
    const cases = [
      { category: "normal", variant: "primary" },
      { category: "normal", variant: "outline" },
      { category: "normal", variant: "ghost" },
      { category: "normal", variant: "link" },
      { category: "danger", variant: "primary" },
      { category: "danger", variant: "outline" },
      { category: "danger", variant: "ghost" },
      { category: "danger", variant: "link" },
    ] as const;

    for (const testCase of cases) {
      const { unmount } = render(<Button {...testCase}>Save</Button>);
      expect(screen.getByRole("button")).toHaveClass(
        styles[`faster-button--${testCase.category}`],
        styles[`faster-button--${testCase.variant}`]
      );
      unmount();
    }
  });

  it("renders every supported size", () => {
    const cases = [
      { size: "small", className: styles["faster-button--small"] },
      { size: "medium", className: styles["faster-button--medium"] },
      { size: "large", className: styles["faster-button--large"] },
    ] as const;

    for (const testCase of cases) {
      const { unmount } = render(<Button size={testCase.size}>Save</Button>);
      expect(screen.getByRole("button")).toHaveClass(testCase.className);
      unmount();
    }
  });

  it("applies full width and custom class name", () => {
    render(
      <Button fullWidth className="custom-button">
        Save
      </Button>
    );

    expect(screen.getByRole("button")).toHaveClass(
      styles["faster-button--full-width"],
      "custom-button"
    );
  });

  it("renders icons in the requested position", () => {
    const icon = <span data-testid="icon">+</span>;

    const { rerender } = render(
      <Button icon={icon} iconPosition="start">
        Add
      </Button>
    );

    const startButton = screen.getByRole("button");
    expect(startButton.firstElementChild).toHaveClass(
      styles["faster-button__icon"]
    );
    expect(startButton).toHaveTextContent("Add");

    rerender(
      <Button icon={icon} iconPosition="end">
        Add
      </Button>
    );

    const endButton = screen.getByRole("button");
    expect(endButton.lastElementChild).toHaveClass(
      styles["faster-button__icon"]
    );
  });

  it("renders icon only buttons", () => {
    const icon = <span data-testid="icon">+</span>;

    const { rerender } = render(
      <Button aria-label="Add item" icon={icon} iconOnlyShape="square" />
    );

    const squareButton = screen.getByRole("button", { name: "Add item" });
    expect(squareButton).toHaveClass(styles["faster-button--icon-square"]);
    expect(squareButton.firstElementChild).toHaveClass(
      styles["faster-button__icon"]
    );

    rerender(<Button aria-label="Add item" icon={icon} iconOnlyShape="round" />);

    const roundButton = screen.getByRole("button", { name: "Add item" });
    expect(roundButton).toHaveClass(styles["faster-button--icon-round"]);
    expect(roundButton).toHaveAttribute("type", "button");
    expect(roundButton).not.toHaveTextContent("Save");
  });

  it("uses default button type and respects explicit type", () => {
    const { rerender } = render(<Button>Save</Button>);

    expect(screen.getByRole("button")).toHaveAttribute("type", "button");

    rerender(<Button type="submit">Save</Button>);

    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("fires click and prevents disabled or loading interaction", () => {
    const click = jest.fn();

    const { rerender } = render(<Button onClick={click}>Save</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(click).toHaveBeenCalledTimes(1);

    rerender(
      <Button disabled onClick={click}>
        Save
      </Button>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(click).toHaveBeenCalledTimes(1);

    rerender(
      <Button loading onClick={click}>
        Save
      </Button>
    );
    const loadingButton = screen.getByRole("button");
    expect(loadingButton).toBeDisabled();
    expect(loadingButton).toHaveAttribute("aria-busy", "true");
    fireEvent.click(loadingButton);
    expect(click).toHaveBeenCalledTimes(1);
  });

  it("reflects aria-busy when passed directly", () => {
    render(<Button aria-busy>Save</Button>);

    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });
});
