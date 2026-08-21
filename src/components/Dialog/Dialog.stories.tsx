import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "./Dialog";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dialog supports small, medium, and large widths, optional title and close button, optional divider treatment, and consistent modal spacing from the shared spacing tokens.",
      },
    },
  },
  args: {
    open: false,
    size: "medium",
    divider: false,
    onOpenChange: () => undefined,
    children: null,
  },
  argTypes: {
    size: { control: "radio", options: ["small", "medium", "large"] },
    divider: { control: "boolean" },
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

function Example({
  title = "Delete project",
  showTitle = true,
  showClose = true,
  divider = false,
  size = "medium",
}: {
  title?: string;
  showTitle?: boolean;
  showClose?: boolean;
  divider?: boolean;
  size?: "small" | "medium" | "large";
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog open={open} onOpenChange={setOpen} size={size} divider={divider}>
        {showTitle || showClose ? (
          <DialogHeader
            id="dialog-title"
            title={showTitle ? title : undefined}
            onClose={showClose ? () => setOpen(false) : undefined}
          />
        ) : null}
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
export const Small: Story = { render: () => <Example size="small" /> };
export const Large: Story = { render: () => <Example size="large" /> };
export const WithoutDivider: Story = {
  render: () => <Example divider={false} />,
};
export const WithDivider: Story = {
  render: () => <Example divider />,
};
export const WithoutTitle: Story = {
  render: () => <Example showTitle={false} />,
};
export const WithoutCloseButton: Story = {
  render: () => <Example showClose={false} />,
};
export const TitleAndCloseHidden: Story = {
  render: () => <Example showTitle={false} showClose={false} />,
};
