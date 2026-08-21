import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const plusIcon = <span aria-hidden="true">+</span>;
const arrowIcon = <span aria-hidden="true">-&gt;</span>;

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Button" },
  argTypes: {
    category: { control: "radio", options: ["normal", "danger"] },
    variant: {
      control: "radio",
      options: ["primary", "outline", "ghost", "link"],
    },
    size: { control: "radio", options: ["small", "medium", "large"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    iconPosition: { control: "radio", options: ["start", "end"] },
    iconOnlyShape: { control: "radio", options: ["square", "round"] },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

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
};
export const IconOnlyRound: Story = {
  render: () => (
    <Button aria-label="Add item" icon={plusIcon} iconOnlyShape="round" />
  ),
};
