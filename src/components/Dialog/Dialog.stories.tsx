import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "./Dialog";
const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { open: false, onOpenChange: () => undefined, children: null },
} satisfies Meta<typeof Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;
function Example({ dismissible = true }: { dismissible?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog open={open} onOpenChange={setOpen} aria-labelledby="dialog-title">
        <DialogHeader
          id="dialog-title"
          title="Delete project"
          onClose={dismissible ? () => setOpen(false) : undefined}
        />
        <DialogBody>This action cannot be undone.</DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Delete</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
export const Default: Story = { render: () => <Example /> };
export const WithoutCloseButton: Story = {
  render: () => <Example dismissible={false} />,
};
