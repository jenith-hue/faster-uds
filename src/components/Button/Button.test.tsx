import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./Button";
import styles from "./Button.module.css";

describe("Button", () => {
  it("renders every supported variant", () => {
    for (const variant of ["primary", "secondary", "ghost"] as const) {
      const { unmount } = render(<Button variant={variant}>Save</Button>);
      expect(screen.getByRole("button")).toHaveClass(
        styles[`faster-button--${variant}`]
      );
      unmount();
    }
  });

  it("applies size and layout modifiers", () => {
    const { rerender } = render(
      <Button size="sm" fullWidth>
        Save
      </Button>
    );

    expect(screen.getByRole("button")).toHaveClass(
      styles["faster-button--sm"],
      styles["faster-button--full-width"]
    );

    rerender(<Button size="lg">Save</Button>);

    expect(screen.getByRole("button")).toHaveClass(styles["faster-button--lg"]);
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
});
