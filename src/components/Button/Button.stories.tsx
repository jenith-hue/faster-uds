import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const plusIcon = <span aria-hidden="true">+</span>;
const arrowIcon = <span aria-hidden="true">-&gt;</span>;

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    category: "normal",
    variant: "primary",
    size: "medium",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Button supports normal and danger categories, four visual variants, three sizes, icon placement, and icon-only actions for compact UI patterns.",
      },
    },
  },
  argTypes: {
    category: {
      control: "radio",
      options: ["normal", "danger"],
      description:
        "Defines the semantic category of the button. Use normal for standard actions and danger for destructive actions.",
      table: {
        type: { summary: '"normal" | "danger"' },
        defaultValue: { summary: "normal" },
      },
    },

    variant: {
      control: "radio",
      options: ["primary", "outline", "ghost", "link"],
      description:
        "Controls the visual style of the button, including its background, border, and text treatment.",
      table: {
        type: {
          summary: '"primary" | "outline" | "ghost" | "link"',
        },
        defaultValue: { summary: "primary" },
      },
    },

    size: {
      control: "radio",
      options: ["small", "medium", "large"],
      description:
        "Controls the size of the button, including its height, padding, typography, and minimum width.",
      table: {
        type: {
          summary: '"small" | "medium" | "large"',
        },
        defaultValue: { summary: "medium" },
      },
    },

    loading: {
      control: "boolean",
      description:
        "Displays the button in a loading state and prevents the user from triggering the action while loading.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    disabled: {
      control: "boolean",
      description: "Disables the button and prevents user interaction.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    fullWidth: {
      control: "boolean",
      description:
        "Makes the button expand to fill the available width of its parent container.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    iconPosition: {
      control: "radio",
      options: ["start", "end"],
      description:
        "Determines whether the button icon is displayed before or after the button label.",
      table: {
        type: { summary: '"start" | "end"' },
        defaultValue: { summary: "start" },
      },
    },

    iconOnlyShape: {
      control: "radio",
      options: ["square", "round"],
      description:
        "Controls the shape of an icon-only button. Use square for a rounded-rectangle shape or round for a circular button.",
      table: {
        type: { summary: '"square" | "round"' },
        defaultValue: { summary: "square" },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

function iconOnlySource({ shape }: { shape: "square" | "round" }): string {
  return `<Button aria-label="Add item" icon={<span aria-hidden="true">+</span>} iconOnlyShape="${shape}" />`;
}

export const Primary: Story = {};
export const Danger: Story = { args: { category: "danger" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Link: Story = { args: { variant: "link" } };
export const Disabled: Story = { args: { disabled: true } };
export const Small: Story = { args: { size: "small" } };
export const Large: Story = { args: { size: "large" } };
export const Loading: Story = { args: { loading: true } };
export const WithStartIcon: Story = { args: { icon: plusIcon } };
export const WithEndIcon: Story = {
  args: { icon: arrowIcon, iconPosition: "end" },
};
export const FullWidth: Story = { args: { fullWidth: true } };
export const IconOnly: Story = {
  render: () => (
    <Button aria-label="Add item" icon={plusIcon} iconOnlyShape="square" />
  ),
  parameters: {
    docs: {
      source: {
        code: iconOnlySource({ shape: "square" }),
        language: "tsx",
      },
    },
  },
};
export const IconOnlyRound: Story = {
  render: () => (
    <Button aria-label="Add item" icon={plusIcon} iconOnlyShape="round" />
  ),
  parameters: {
    docs: {
      source: {
        code: iconOnlySource({ shape: "round" }),
        language: "tsx",
      },
    },
  },
};
