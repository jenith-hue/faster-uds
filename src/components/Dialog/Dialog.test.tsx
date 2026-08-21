import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "./Dialog";
import styles from "./Dialog.module.css";

describe("Dialog", () => {
  it("is absent when closed and announces modal semantics when open", () => {
    const change = jest.fn();
    const { rerender } = render(
      <Dialog open={false} onOpenChange={change}>
        Text
      </Dialog>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    rerender(
      <Dialog open onOpenChange={change} aria-label="Confirm">
        Text
      </Dialog>
    );

    expect(screen.getByRole("dialog", { name: "Confirm" })).toHaveAttribute(
      "aria-modal",
      "true"
    );
  });

  it("applies size classes", () => {
    const { rerender } = render(
      <Dialog open onOpenChange={() => undefined} size="small" aria-label="Small">
        Text
      </Dialog>
    );

    expect(screen.getByRole("dialog")).toHaveClass(
      styles["faster-dialog--small"]
    );

    rerender(
      <Dialog open onOpenChange={() => undefined} size="large" aria-label="Large">
        Text
      </Dialog>
    );

    expect(screen.getByRole("dialog")).toHaveClass(
      styles["faster-dialog--large"]
    );
  });

  it("renders header without title or close button when omitted", () => {
    render(
      <Dialog open onOpenChange={() => undefined} aria-label="Plain dialog">
        <DialogHeader />
        <DialogBody>Body</DialogBody>
      </Dialog>
    );

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Close dialog" })
    ).not.toBeInTheDocument();
  });

  it("renders close button on the right when title is omitted", () => {
    render(
      <Dialog open onOpenChange={() => undefined} aria-label="No title">
        <DialogHeader onClose={() => undefined} />
        <DialogBody>Body</DialogBody>
      </Dialog>
    );

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close dialog" })).toBeInTheDocument();
  });

  it("adds body padding when divider is present", () => {
    render(
      <Dialog open onOpenChange={() => undefined} divider aria-label="Divided">
        <DialogHeader title="Title" onClose={() => undefined} />
        <DialogBody>Body</DialogBody>
      </Dialog>
    );

    expect(
      document.querySelector(`.${styles["faster-dialog__body"]}`)
    ).toHaveAttribute("data-divider", "true");
  });

  it("applies divider spacing and border classes", () => {
    render(
      <Dialog open onOpenChange={() => undefined} divider aria-label="Divided">
        <DialogHeader title="Title" onClose={() => undefined} />
        <DialogBody>Body</DialogBody>
        <DialogFooter>Actions</DialogFooter>
      </Dialog>
    );

    expect(screen.getByRole("dialog")).toHaveAttribute("data-divider", "true");
    expect(screen.getByRole("heading", { name: "Title" }).parentElement).toHaveClass(
      styles["faster-dialog__header--divider"]
    );
    expect(screen.getByRole("contentinfo")).toHaveClass(
      styles["faster-dialog__footer--divider"]
    );
  });

  it("closes on Escape, overlay click, and header close click", () => {
    const change = jest.fn();
    const { rerender } = render(
      <Dialog open onOpenChange={change} aria-label="Dialog">
        <DialogHeader title="Title" onClose={() => change(false)} />
        <DialogBody>Body</DialogBody>
      </Dialog>
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(change).toHaveBeenLastCalledWith(false);

    fireEvent.mouseDown(
      document.querySelector(`.${styles["faster-dialog__backdrop"]}`)!
    );
    expect(change).toHaveBeenCalledTimes(2);

    rerender(
      <Dialog open onOpenChange={change} aria-label="Dialog">
        <DialogHeader title="Title" onClose={() => change(false)} />
        <DialogBody>Body</DialogBody>
      </Dialog>
    );

    fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));
    expect(change).toHaveBeenCalledTimes(3);
  });
});
