import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Dialog } from "../Dialog";
import styles from "../Dialog.module.css";

describe("Dialog", () => {
  it("is absent when closed and present when open", () => {
    const change = jest.fn();
    const { rerender } = render(
      <Dialog open={false} onOpenChange={change}>
        Body
      </Dialog>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    rerender(
      <Dialog open onOpenChange={change} title="Confirm">
        Body
      </Dialog>
    );

    expect(screen.getByRole("dialog", { name: "Confirm" })).toBeInTheDocument();
  });

  it("renders title, close, body, and footer", () => {
    const footer = <button type="button">Delete</button>;

    render(
      <Dialog
        open
        onOpenChange={() => undefined}
        title="Delete project"
        closable
        footer={footer}
      >
        Body
      </Dialog>
    );

    expect(screen.getByRole("heading", { name: "Delete project" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close dialog" })).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toHaveTextContent("Delete");
  });

  it("allows title or close to be omitted", () => {
    const { rerender } = render(
      <Dialog open onOpenChange={() => undefined} closable>
        Body
      </Dialog>
    );

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close dialog" })).toBeInTheDocument();

    rerender(
      <Dialog open onOpenChange={() => undefined} title="Only title">
        Body
      </Dialog>
    );

    expect(screen.getByRole("heading", { name: "Only title" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Close dialog" })).not.toBeInTheDocument();
  });

  it("applies size and divider classes", () => {
    const { rerender } = render(
      <Dialog open onOpenChange={() => undefined} title="Title" size="small" divider>
        Body
      </Dialog>
    );

    expect(screen.getByRole("dialog")).toHaveClass(styles["faster-dialog--small"]);
    expect(screen.getByRole("dialog")).toHaveAttribute("data-divider", "true");
    expect(screen.getByRole("heading", { name: "Title" }).parentElement).toHaveClass(
      styles["faster-dialog__header--divider"]
    );

    rerender(
      <Dialog open onOpenChange={() => undefined} title="Title" size="large">
        Body
      </Dialog>
    );

    expect(screen.getByRole("dialog")).toHaveClass(styles["faster-dialog--large"]);
  });

  it("closes from close icon, overlay, and escape", () => {
    const change = jest.fn();

    render(
      <Dialog open onOpenChange={change} title="Title" closable>
        Body
      </Dialog>
    );

    fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));
    expect(change).toHaveBeenLastCalledWith(false);

    fireEvent.mouseDown(
      document.querySelector(`.${styles["faster-dialog__backdrop"]}`)
    );
    expect(change).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(change).toHaveBeenCalledTimes(3);
  });
});
