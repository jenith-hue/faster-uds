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
      source: {
        type: "code",
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
    open: {
      control: "boolean",
      description:
        "Controls whether the dialog is currently mounted and visible. Must be paired with `onOpenChange` to be dismissible by the user.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onOpenChange: {
      control: false,
      description:
        "Callback fired when the dialog requests to close (e.g. Escape key, backdrop click, or the header close button). Receives the next `open` value — typically used to update the state driving the `open` prop.",
      table: {
        type: { summary: "(open: boolean) => void" },
      },
    },
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
      description:
        "Sets the dialog's width. `small` suits brief confirmations, `medium` is the general-purpose default, and `large` fits forms or content-heavy dialogs.",
      table: {
        type: { summary: '"small" | "medium" | "large"' },
        defaultValue: { summary: '"medium"' },
      },
    },
    divider: {
      control: "boolean",
      description:
        "When true, renders a visible rule between the header and body content. When false, header and body are separated only by spacing.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: false,
      description:
        "The dialog's content, typically composed from `DialogHeader`, `DialogBody`, and `DialogFooter` subcomponents in that order.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
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

// Reusable snippet builder so each story's displayed code stays in sync
// with what Example actually renders, without repeating boilerplate.
function dialogSource({
  size = "medium",
  divider = false,
  showTitle = true,
  showClose = true,
  title = "Delete project",
}: {
  size?: "small" | "medium" | "large";
  divider?: boolean;
  showTitle?: boolean;
  showClose?: boolean;
  title?: string;
}) {
  const headerProps = [
    showClose ? `onClose={() => setOpen(false)}` : null,
    showTitle ? `title="${title}"` : null,
  ]
    .filter(Boolean)
    .join(" ");

  const header =
    showTitle || showClose
      ? `  <DialogHeader id="dialog-title"${headerProps ? ` ${headerProps}` : ""} />\n`
      : "";

  return `
    <Dialog
      open={open}
      onOpenChange={setOpen}
      size="${size}"
      divider={${divider}}
    >
    ${header}  
      <DialogBody>This action cannot be undone.</DialogBody>
      <DialogFooter>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button onClick={() => setOpen(false)}>Delete</Button>
      </DialogFooter>
  </Dialog>
  `.trim();
}

export const Default: Story = {
  render: (args) => (
    <Example
      size={args.size as "small" | "medium" | "large"}
      divider={args.divider}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: dialogSource({}),
        language: "tsx",
      },
    },
  },
};

export const Small: Story = {
  render: () => <Example size="small" />,
  parameters: {
    docs: {
      source: {
        code: dialogSource({ size: "small" }),
        language: "tsx",
      },
    },
  },
};

export const Large: Story = {
  render: () => <Example size="large" />,
  parameters: {
    docs: {
      source: {
        code: dialogSource({ size: "large" }),
        language: "tsx",
      },
    },
  },
};

export const WithoutDivider: Story = {
  render: () => <Example divider={false} />,
  parameters: {
    docs: {
      source: {
        code: dialogSource({ divider: false }),
        language: "tsx",
      },
    },
  },
};

export const WithDivider: Story = {
  render: () => <Example divider />,
  parameters: {
    docs: {
      source: {
        code: dialogSource({ divider: true }),
        language: "tsx",
      },
    },
  },
};

export const WithoutTitle: Story = {
  render: () => <Example showTitle={false} />,
  parameters: {
    docs: {
      source: {
        code: dialogSource({ showTitle: false }),
        language: "tsx",
      },
    },
  },
};

export const WithoutCloseButton: Story = {
  render: () => <Example showClose={false} />,
  parameters: {
    docs: {
      source: {
        code: dialogSource({ showClose: false }),
        language: "tsx",
      },
    },
  },
};
