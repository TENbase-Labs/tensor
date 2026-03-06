import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from './Radio'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Radio size variant',
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation',
    },
    label: {
      control: 'text',
      description: 'Group label (legend)',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below group',
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
      description: 'Disabled state (all options)',
    },
    required: {
      control: 'boolean',
      description: 'Required field indicator',
    },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

const paymentOptions = [
  { value: 'credit', label: 'Credit Card' },
  { value: 'debit', label: 'Debit Card' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'bank', label: 'Bank Transfer' },
]

const planOptions = [
  {
    value: 'free',
    label: 'Free',
    description: '$0/month, basic features',
  },
  {
    value: 'pro',
    label: 'Pro',
    description: '$29/month, unlimited projects',
  },
  {
    value: 'enterprise',
    label: 'Enterprise',
    description: '$99/month, priority support',
  },
]

/**
 * Default radio group
 */
export const Default: Story = {
  args: {
    options: paymentOptions,
  },
}

/**
 * Radio group with label
 */
export const WithLabel: Story = {
  args: {
    label: 'Payment Method',
    options: paymentOptions,
  },
}

/**
 * Required field with asterisk indicator
 */
export const Required: Story = {
  args: {
    label: 'Shipping Method',
    required: true,
    options: [
      { value: 'standard', label: 'Standard Shipping' },
      { value: 'express', label: 'Express Shipping' },
      { value: 'overnight', label: 'Overnight Shipping' },
    ],
  },
}

/**
 * Radio group with helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Contact Preference',
    helperText: 'How would you like to be contacted?',
    options: [
      { value: 'email', label: 'Email' },
      { value: 'phone', label: 'Phone' },
      { value: 'sms', label: 'SMS' },
    ],
  },
}

/**
 * Radio group with option descriptions
 */
export const WithDescriptions: Story = {
  args: {
    label: 'Choose Plan',
    options: planOptions,
  },
}

/**
 * Pre-selected option
 */
export const WithDefaultValue: Story = {
  args: {
    label: 'Preferred Language',
    defaultValue: 'en',
    options: [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' },
    ],
  },
}

/**
 * Error state with error message
 */
export const ErrorState: Story = {
  args: {
    label: 'Select Size',
    required: true,
    error: true,
    errorMessage: 'Please select a size',
    options: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
    ],
  },
}

/**
 * Small size - dense forms
 */
export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Radios',
    options: paymentOptions,
  },
}

/**
 * Medium size (default) - standard forms
 */
export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Medium Radios (default)',
    options: paymentOptions,
  },
}

/**
 * Large size - prominent selections
 */
export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Radios',
    options: paymentOptions,
  },
}

/**
 * Horizontal orientation
 */
export const Horizontal: Story = {
  args: {
    label: 'Gender',
    orientation: 'horizontal',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
    ],
  },
}

/**
 * Vertical orientation (default)
 */
export const Vertical: Story = {
  args: {
    label: 'Subscription Type',
    orientation: 'vertical',
    options: [
      { value: 'monthly', label: 'Monthly' },
      { value: 'yearly', label: 'Yearly' },
      { value: 'lifetime', label: 'Lifetime' },
    ],
  },
}

/**
 * All options disabled
 */
export const AllDisabled: Story = {
  args: {
    label: 'Disabled Group',
    disabled: true,
    defaultValue: 'credit',
    options: paymentOptions,
  },
}

/**
 * Individual option disabled
 */
export const IndividualDisabled: Story = {
  args: {
    label: 'Payment Method',
    options: [
      { value: 'credit', label: 'Credit Card' },
      { value: 'debit', label: 'Debit Card', disabled: true },
      { value: 'paypal', label: 'PayPal' },
    ],
  },
}

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <RadioGroup
        size="sm"
        label="Small"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
      <RadioGroup
        size="md"
        label="Medium (default)"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
      <RadioGroup
        size="lg"
        label="Large"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
    </div>
  ),
}

/**
 * Form example
 */
export const FormExample: Story = {
  render: () => (
    <form className="max-w-md space-y-6">
      <RadioGroup
        label="Contact Method"
        required
        helperText="How would you like to be contacted?"
        options={[
          { value: 'email', label: 'Email' },
          { value: 'phone', label: 'Phone' },
          { value: 'sms', label: 'SMS' },
        ]}
      />
      <RadioGroup label="Plan" required options={planOptions} />
      <RadioGroup
        label="Billing Cycle"
        options={[
          { value: 'monthly', label: 'Monthly' },
          { value: 'annually', label: 'Annually (save 20%)' },
        ]}
      />
    </form>
  ),
}

/**
 * States comparison
 */
export const AllStates: Story = {
  render: () => (
    <div className="space-y-6">
      <RadioGroup
        label="Default State"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
      <RadioGroup
        label="With Selection"
        defaultValue="2"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
      <RadioGroup
        label="Error State"
        error
        errorMessage="Please select an option"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
      <RadioGroup
        label="Disabled State"
        disabled
        defaultValue="1"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
    </div>
  ),
}
