import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Dialog } from "../Dialog";

describe("Dialog a11y", () => {
  it("has dialog role and aria-modal", () => {
    render(
      <Dialog open onOpenChange={() => undefined} title="Test dialog">
        Content
      </Dialog>
    );

    expect(screen.getByRole("dialog", { name: "Test dialog" })).toHaveAttribute(
      "aria-modal",
      "true"
    );
  });

  it("focuses when opened", async () => {
    render(
      <Dialog open onOpenChange={() => undefined} title="Modal">
        Content
      </Dialog>
    );

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.getByRole("dialog")).toHaveFocus();
  });

  it("closes with escape", async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();

    render(
      <Dialog open onOpenChange={handleClose} title="Modal" closable>
        Content
      </Dialog>
    );

    await user.keyboard("{Escape}");
    expect(handleClose).toHaveBeenCalledWith(false);
  });

  it("exposes close button label", () => {
    render(
      <Dialog open onOpenChange={() => undefined} title="Dialog" closable>
        Content
      </Dialog>
    );

    expect(screen.getByRole("button", { name: "Close dialog" })).toBeInTheDocument();
  });
});
