import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Dialog } from "./Dialog";

const footer = (
  <>
    <Button variant="outline">Cancel</Button>
    <Button>Delete</Button>
  </>
);

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dialog takes a plain title string, optional close button, optional footer content, optional divider, and controlled open state. Body content comes from children.",
      },
      source: {
        type: "code",
      },
    },
  },
  args: {
    open: false,
    title: "Delete project",
    closable: true,
    divider: false,
    size: "medium",
    footer,
    onOpenChange: () => undefined,
    children: "This action cannot be undone.",
  },
  argTypes: {
    open: {
      control: "boolean",
      description:
        "Controls whether the dialog is mounted and visible. In these stories it's driven by an internal demo toggle so the control and the 'Open dialog' button stay in sync — in real usage, pair it with your own state and `onOpenChange`.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onOpenChange: {
      control: false,
      description:
        "Callback fired when the dialog requests to close (Escape, backdrop click, or the header close button) or open. Receives the next boolean `open` value.",
      table: {
        type: { summary: "(open: boolean) => void" },
      },
    },
    title: {
      control: "text",
      description:
        "Plain text title rendered in the dialog header. Omit it to render the dialog without a title (the close button, if enabled, still appears).",
      table: {
        type: { summary: "string" },
      },
    },
    closable: {
      control: "boolean",
      description:
        "Shows or hides the header's close (×) button. Set to false to force dismissal only through explicit footer actions.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    divider: {
      control: "boolean",
      description:
        "Renders a visible rule between the header and body when true. When false, they're separated only by spacing.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
      description:
        "Sets the dialog's width. `small` suits brief confirmations, `medium` is the general-purpose default, `large` fits forms or content-heavy dialogs.",
      table: {
        type: { summary: '"small" | "medium" | "large"' },
        defaultValue: { summary: '"medium"' },
      },
    },
    footer: {
      control: false,
      description:
        "Optional footer content, typically action buttons (Cancel/Confirm). Omit it to render the dialog without a footer row.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    children: {
      control: "text",
      description:
        "The dialog's body content, rendered between the header and footer.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

type ExampleProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  closable?: boolean;
  divider?: boolean;
  size?: "small" | "medium" | "large";
  footer?: ReactNode;
  children?: ReactNode;
};

// Wraps Dialog with a demo trigger button, while keeping every prop
// (including `open`) driven by the args Storybook passes in — so
// controls actually affect what's rendered.
function Example({
  open: openArg = false,
  onOpenChange,
  title,
  closable,
  divider,
  size,
  footer: footerContent,
  children,
}: ExampleProps) {
  const [open, setOpen] = useState(openArg);

  // Keep in sync when the `open` control changes from outside
  // (e.g. toggled in the Controls panel rather than via the button).
  useEffect(() => {
    // eslint-disable-next-line
    setOpen(openArg);
  }, [openArg]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    onOpenChange?.(next);
  };

  return (
    <>
      <Button onClick={() => handleOpenChange(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onOpenChange={handleOpenChange}
        title={title}
        closable={closable}
        divider={divider}
        size={size}
        footer={footerContent}
      >
        {children}
      </Dialog>
    </>
  );
}

// Builds the "Show code" snippet from the same args driving the story,
// so it always reflects what's actually configured.
function dialogSource({
  title,
  closable = true,
  divider = false,
  size = "medium",
  footer: hasFooter,
  children = "This action cannot be undone.",
}: {
  title?: string;
  closable?: boolean;
  divider?: boolean;
  size?: "small" | "medium" | "large";
  footer?: ReactNode;
  children?: ReactNode;
}) {
  const props = [
    title ? `title="${title}"` : null,
    !closable ? `closable={false}` : null,
    divider ? `divider` : null,
    size !== "medium" ? `size="${size}"` : null,
  ]
    .filter(Boolean)
    .map((line) => `  ${line}`)
    .join("\n");

  const footerBlock = hasFooter
    ? `  footer={
    <>
      <Button variant="outline">Cancel</Button>
      <Button>Delete</Button>
    </>
  }\n`
    : "";

  return `
<Dialog
  open={open}
  onOpenChange={setOpen}
${props ? props + "\n" : ""}${footerBlock}>
  ${children}
</Dialog>
  `.trim();
}

export const Default: Story = {
  render: (args) => <Example {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Baseline configuration: medium size, title and close button visible, footer with Cancel/Delete actions, no divider.",
      },
      source: {
        code: dialogSource({ title: "Delete project", footer }),
        language: "tsx",
      },
    },
  },
};

export const Small: Story = {
  args: { size: "small" },
  render: (args) => <Example {...args} />,
  parameters: {
    docs: {
      description: {
        story: "Compact width for short, low-stakes confirmations.",
      },
      source: {
        code: dialogSource({ title: "Delete project", size: "small", footer }),
        language: "tsx",
      },
    },
  },
};

export const Large: Story = {
  args: { size: "large" },
  render: (args) => <Example {...args} />,
  parameters: {
    docs: {
      description: {
        story: "Wider layout for forms or content-heavy dialogs.",
      },
      source: {
        code: dialogSource({ title: "Delete project", size: "large", footer }),
        language: "tsx",
      },
    },
  },
};

export const WithoutTitle: Story = {
  args: { title: undefined },
  render: (args) => <Example {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Omits the title while still rendering the close button — useful for minimal or icon-led dialogs.",
      },
      source: {
        code: dialogSource({ footer }),
        language: "tsx",
      },
    },
  },
};

export const WithoutCloseButton: Story = {
  args: { closable: false },
  render: (args) => <Example {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Hides the close (×) button, forcing dismissal only through explicit footer actions.",
      },
      source: {
        code: dialogSource({ title: "Delete project", closable: false, footer }),
        language: "tsx",
      },
    },
  },
};

export const WithDivider: Story = {
  args: { divider: true },
  render: (args) => <Example {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Adds a visible divider between the header and body for stronger visual separation.",
      },
      source: {
        code: dialogSource({ title: "Delete project", divider: true, footer }),
        language: "tsx",
      },
    },
  },
};

export const WithoutFooter: Story = {
  args: { footer: undefined },
  render: (args) => <Example {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Renders without a footer row — useful for purely informational dialogs with no action buttons.",
      },
      source: {
        code: dialogSource({ title: "Delete project" }),
        language: "tsx",
      },
    },
  },
};