import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const plusIcon = <span aria-hidden="true">+</span>;
const arrowIcon = <span aria-hidden="true">→</span>;

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Button" },
  argTypes: {
    variant: { control: "radio", options: ["primary", "secondary", "ghost"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    iconPosition: { control: "radio", options: ["start", "end"] },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Disabled: Story = { args: { disabled: true } };
export const Small: Story = { args: { size: "sm" } };
export const Large: Story = { args: { size: "lg" } };
export const Loading: Story = { args: { loading: true } };
export const WithStartIcon: Story = { args: { icon: plusIcon } };
export const WithEndIcon: Story = {
  args: { icon: arrowIcon, iconPosition: "end" },
};
export const FullWidth: Story = { args: { fullWidth: true } };
export const IconOnly: Story = {
  render: () => <Button aria-label="Add item" icon={plusIcon} />,
};
