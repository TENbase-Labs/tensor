import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

/**
 * Primary button - main call-to-action
 */
export const Primary: Story = {
  args: {
    children: 'Save Changes',
    variant: 'primary',
    size: 'md',
  },
}

/**
 * Secondary button - alternative actions
 */
export const Secondary: Story = {
  args: {
    children: 'Cancel',
    variant: 'secondary',
    size: 'md',
  },
}

/**
 * Danger button - destructive actions
 */
export const Danger: Story = {
  args: {
    children: 'Delete Account',
    variant: 'danger',
    size: 'md',
  },
}

/**
 * Ghost button - minimal emphasis
 */
export const Ghost: Story = {
  args: {
    children: 'Learn More',
    variant: 'ghost',
    size: 'md',
  },
}

/**
 * Small size - compact UIs
 */
export const Small: Story = {
  args: {
    children: 'Small Button',
    variant: 'primary',
    size: 'sm',
  },
}

/**
 * Large size - hero CTAs
 */
export const Large: Story = {
  args: {
    children: 'Get Started',
    variant: 'primary',
    size: 'lg',
  },
}

/**
 * Loading state - async operations
 */
export const Loading: Story = {
  args: {
    children: 'Saving...',
    variant: 'primary',
    size: 'md',
    loading: true,
  },
}

/**
 * Disabled state - unavailable action
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
}

/**
 * Icon-only button (requires aria-label)
 */
export const IconOnly: Story = {
  args: {
    children: '✕',
    variant: 'ghost',
    size: 'sm',
    'aria-label': 'Close dialog',
  },
}

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
}

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}
