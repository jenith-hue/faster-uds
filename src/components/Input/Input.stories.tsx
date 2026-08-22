import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@/components/Input/Input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],

  args: {
    label: "Email address",
    placeholder: "you@example.com",
    size: "medium",
    type: "text",
    iconPosition: "start",
  },

  parameters: {
    docs: {
      description: {
        component:
          "Input supports labels, helper and error messages, multiple sizes, optional icons, clear actions, and prefix or suffix adornments.",
      },
    },
  },

  argTypes: {
    label: {
      control: "text",
      description: "Text displayed above the input field.",
      table: {
        type: { summary: "string" },
      },
    },

    placeholder: {
      control: "text",
      description:
        "Placeholder text displayed when the input does not contain a value.",
      table: {
        type: { summary: "string" },
      },
    },

    size: {
      control: "radio",
      options: ["small", "medium", "large"],
      description:
        "Controls the size of the input, including its height, padding, and typography.",
      table: {
        type: {
          summary: '"small" | "medium" | "large"',
        },
        defaultValue: { summary: "medium" },
      },
    },

    type: {
      control: "select",
      options: ["text", "number", "email", "currency"],
      description:
        "Defines the type of value expected from the input and determines the corresponding input behavior.",
      table: {
        type: {
          summary: '"text" | "number" | "email" | "currency"',
        },
        defaultValue: { summary: "text" },
      },
    },

    icon: {
      control: false,
      description:
        "Optional React element displayed inside the input. The icon can be positioned at the start or end.",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },

    iconPosition: {
      control: "radio",
      options: ["start", "end"],
      description:
        "Determines whether the icon is displayed at the start or end of the input.",
      table: {
        type: {
          summary: '"start" | "end"',
        },
        defaultValue: { summary: "start" },
      },
    },

    clearable: {
      control: "boolean",
      description:
        "Displays a clear action that allows the user to remove the current input value.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    onClear: {
      control: false,
      description: "Callback invoked when the user activates the clear action.",
      table: {
        type: { summary: "() => void" },
      },
    },

    helperText: {
      control: "text",
      description:
        "Optional supporting text displayed below the input to provide additional guidance.",
      table: {
        type: { summary: "string" },
      },
    },

    error: {
      control: "text",
      description:
        "Error message displayed below the input when the entered value is invalid.",
      table: {
        type: { summary: "string" },
      },
    },

    required: {
      control: "boolean",
      description:
        "Marks the input as required and indicates that a value must be provided.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    disabled: {
      control: "boolean",
      description:
        "Disables the input and prevents the user from modifying its value.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    defaultValue: {
      control: "text",
      description:
        "Initial value displayed in the input when it is first rendered.",
      table: {
        type: { summary: "string" },
      },
    },

    className: {
      control: "text",
      description:
        "Adds custom CSS class names to the input control element for consumer-defined styling hooks.",
      table: {
        type: { summary: "string" },
      },
    },

    prefix: {
      control: "text",
      description:
        "Optional content displayed before the input value, useful for URL or currency prefixes.",
      table: {
        type: { summary: "string" },
      },
    },

    suffix: {
      control: "text",
      description:
        "Optional content displayed after the input value, useful for URL or unit suffixes.",
      table: {
        type: { summary: "string" },
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: {
    helperText: "Used only for account updates.",
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Error: Story = {
  args: {
    error: "Enter a valid email address.",
    defaultValue: "not-an-email",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "you@example.com",
  },
};

export const WithStartIcon: Story = {
  args: {
    icon: <span aria-hidden="true">🔍</span>,
  },
};

export const WithEndIcon: Story = {
  args: {
    icon: <span aria-hidden="true">✓</span>,
    iconPosition: "end",
  },
};

export const UrlInput: Story = {
  args: {
    prefix: "http://",
    suffix: ".com",
    placeholder: "example",
  },
};

export const Clearable: Story = {
  args: {
    clearable: true,
    defaultValue: "Search term",
    onClear: () => undefined,
  },
};

export const NumberInput: Story = {
  args: {
    type: "number",
    defaultValue: "10",
  },
};

export const CurrencyInput: Story = {
  args: {
    type: "currency",
    defaultValue: "125.00",
  },
};
