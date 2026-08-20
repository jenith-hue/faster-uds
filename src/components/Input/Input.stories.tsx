import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";
const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: { label: "Email address", placeholder: "you@example.com" },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithHelperText: Story = {
  args: { helperText: "Used only for account updates." },
};
export const Required: Story = { args: { required: true } };
export const Error: Story = {
  args: { error: "Enter a valid email address.", defaultValue: "not-an-email" },
};
export const Disabled: Story = {
  args: { disabled: true, defaultValue: "you@example.com" },
};
