import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Checkbox size variant',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    description: {
      control: 'text',
      description: 'Description text below label',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message (shown when error=true)',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    required: {
      control: 'boolean',
      description: 'Required field indicator',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state (for parent checkboxes)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

/**
 * Default checkbox - minimal configuration
 */
export const Default: Story = {
  args: {},
}

/**
 * Checkbox with label
 */
export const WithLabel: Story = {
  args: {
    label: 'I agree to the terms and conditions',
  },
}

/**
 * Required checkbox with asterisk indicator
 */
export const Required: Story = {
  args: {
    label: 'I agree to the privacy policy',
    required: true,
  },
}

/**
 * Checkbox with description text
 */
export const WithDescription: Story = {
  args: {
    label: 'Subscribe to newsletter',
    description: 'Receive weekly updates about new features and products',
  },
}

/**
 * Checked state
 */
export const Checked: Story = {
  args: {
    label: 'Option selected',
    defaultChecked: true,
  },
}

/**
 * Indeterminate state (for parent checkboxes)
 */
export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    indeterminate: true,
    checked: true,
  },
}

/**
 * Error state with error message
 */
export const ErrorState: Story = {
  args: {
    label: 'I agree to the terms',
    error: true,
    errorMessage: 'You must agree to the terms to continue',
    required: true,
  },
}

/**
 * Small size - dense forms
 */
export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small checkbox',
  },
}

/**
 * Medium size (default) - standard forms
 */
export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Medium checkbox (default)',
  },
}

/**
 * Large size - prominent selections
 */
export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large checkbox',
  },
}

/**
 * Disabled unchecked
 */
export const DisabledUnchecked: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
}

/**
 * Disabled checked
 */
export const DisabledChecked: Story = {
  args: {
    label: 'Disabled (checked)',
    disabled: true,
    defaultChecked: true,
  },
}

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox size="sm" label="Small" />
      <Checkbox size="md" label="Medium (default)" />
      <Checkbox size="lg" label="Large" />
    </div>
  ),
}

/**
 * Checkbox group example
 */
export const CheckboxGroup: Story = {
  render: () => (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-[var(--colors-text-primary)] mb-3">
        Select your interests
      </legend>
      <Checkbox label="Coding" />
      <Checkbox label="Design" />
      <Checkbox label="Writing" />
      <Checkbox label="Photography" />
    </fieldset>
  ),
}

/**
 * Parent-child relationship with indeterminate
 */
export const ParentChild: Story = {
  render: () => (
    <div className="space-y-2">
      <Checkbox label="Select all" indeterminate checked />
      <div className="ml-6 space-y-2">
        <Checkbox label="Option 1" defaultChecked />
        <Checkbox label="Option 2" defaultChecked />
        <Checkbox label="Option 3" />
      </div>
    </div>
  ),
}

/**
 * States comparison
 */
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate checked />
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
      <Checkbox label="Error state" error errorMessage="This field is required" />
    </div>
  ),
}

/**
 * Form example
 */
export const FormExample: Story = {
  render: () => (
    <form className="max-w-md space-y-4">
      <Checkbox
        label="I agree to the terms and conditions"
        required
        description="Please read our terms before continuing"
      />
      <Checkbox label="Subscribe to newsletter" description="Receive weekly updates via email" />
      <Checkbox label="Enable notifications" />
      <Checkbox label="Remember me" />
    </form>
  ),
}
