import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "../Dialog";

describe("Dialog a11y", () => {
  it("has proper dialog role and aria-modal", () => {
    render(
      <Dialog open onOpenChange={() => {}} aria-label="Test dialog">
        <DialogBody>Content</DialogBody>
      </Dialog>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("associates dialog with label via aria-label", () => {
    render(
      <Dialog open onOpenChange={() => {}} aria-label="Confirm action">
        <DialogBody>Are you sure?</DialogBody>
      </Dialog>
    );
    expect(screen.getByRole("dialog", { name: "Confirm action" })).toBeInTheDocument();
  });

  it("associates dialog with heading", () => {
    render(
      <Dialog open onOpenChange={() => {}} aria-labelledby="dialog-title">
        <DialogHeader title="Settings" id="dialog-title" />
        <DialogBody>Configure options</DialogBody>
      </Dialog>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-labelledby", "dialog-title");
  });

  it("close button has proper aria-label", () => {
    render(
      <Dialog open onOpenChange={() => {}} aria-label="Dialog">
        <DialogHeader onClose={() => {}} />
        <DialogBody>Content</DialogBody>
      </Dialog>
    );
    expect(screen.getByRole("button", { name: "Close dialog" })).toBeInTheDocument();
  });

  it("dialog receives focus when opened", async () => {
    render(
      <Dialog open onOpenChange={() => {}} aria-label="Modal">
        <DialogBody>Content</DialogBody>
      </Dialog>
    );
    const dialog = screen.getByRole("dialog");
    // Dialog uses setTimeout to focus, so wait for next tick
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(dialog).toHaveFocus();
  });

  it("keyboard accessible with escape key", async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();
    render(
      <Dialog open onOpenChange={handleClose} aria-label="Modal">
        <DialogBody>Content</DialogBody>
      </Dialog>
    );

    await user.keyboard("{Escape}");
    expect(handleClose).toHaveBeenCalled();
  });

  it("header title is semantic h2", () => {
    render(
      <Dialog open onOpenChange={() => {}} aria-label="Dialog">
        <DialogHeader title="Dialog Title" />
        <DialogBody>Content</DialogBody>
      </Dialog>
    );
    expect(screen.getByRole("heading", { level: 2, name: "Dialog Title" })).toBeInTheDocument();
  });

  it("footer has semantic role", () => {
    render(
      <Dialog open onOpenChange={() => {}} aria-label="Dialog">
        <DialogBody>Content</DialogBody>
        <DialogFooter>Actions</DialogFooter>
      </Dialog>
    );
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("body doesn't need special semantics", () => {
    render(
      <Dialog open onOpenChange={() => {}} aria-label="Dialog">
        <DialogBody>Main content here</DialogBody>
      </Dialog>
    );
    expect(screen.getByText("Main content here")).toBeInTheDocument();
  });

  it("overlay click closes dialog accessibly", async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();
    const { container } = render(
      <Dialog open onOpenChange={handleClose} aria-label="Modal">
        <DialogBody>Content</DialogBody>
      </Dialog>
    );

    const backdrop = container.querySelector("[class*='backdrop']") as HTMLElement;
    if (backdrop) {
      await user.click(backdrop);
      expect(handleClose).toHaveBeenCalled();
    }
  });
});
