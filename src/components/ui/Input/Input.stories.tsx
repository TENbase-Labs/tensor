import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size variant',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time'],
      description: 'HTML input type',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below input',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message (shown when error=true)',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    success: {
      control: 'boolean',
      description: 'Success state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    required: {
      control: 'boolean',
      description: 'Required field indicator',
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

/**
 * Default input - minimal configuration
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

/**
 * Input with label - standard form field
 */
export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
  },
}

/**
 * Required field with asterisk indicator
 */
export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'John Doe',
    required: true,
  },
}

/**
 * Input with helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    helperText: 'Use 3-20 characters, letters and numbers only',
  },
}

/**
 * Error state with error message
 */
export const ErrorState: Story = {
  args: {
    label: 'Email',
    type: 'email',
    defaultValue: 'invalid-email',
    error: true,
    errorMessage: 'Please enter a valid email address',
  },
}

/**
 * Success state (optional, use sparingly)
 */
export const Success: Story = {
  args: {
    label: 'Username',
    defaultValue: 'johndoe',
    success: true,
    helperText: 'Username is available',
  },
}

/**
 * Small size - dense forms
 */
export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Compact Input',
    placeholder: 'Small size',
  },
}

/**
 * Medium size (default) - standard forms
 */
export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Standard Input',
    placeholder: 'Medium size (default)',
  },
}

/**
 * Large size - prominent forms
 */
export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Input',
    placeholder: 'Large size',
  },
}

/**
 * Email input type
 */
export const EmailType: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
    autoComplete: 'email',
  },
}

/**
 * Password input with visibility toggle
 */
export const PasswordType: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    autoComplete: 'current-password',
  },
}

/**
 * Number input type
 */
export const NumberType: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: '25',
    min: 0,
    max: 120,
  },
}

/**
 * Search input type
 */
export const SearchType: Story = {
  args: {
    label: 'Search',
    type: 'search',
    placeholder: 'Search...',
  },
}

/**
 * Tel input type
 */
export const TelType: Story = {
  args: {
    label: 'Phone Number',
    type: 'tel',
    placeholder: '+1 (555) 123-4567',
    autoComplete: 'tel',
  },
}

/**
 * URL input type
 */
export const UrlType: Story = {
  args: {
    label: 'Website',
    type: 'url',
    placeholder: 'https://example.com',
    autoComplete: 'url',
  },
}

/**
 * Input with leading icon
 */
export const WithLeadingIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leadingIcon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <title>Search icon</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
}

/**
 * Input with trailing icon
 */
export const WithTrailingIcon: Story = {
  args: {
    label: 'Email',
    type: 'email',
    defaultValue: 'user@example.com',
    success: true,
    trailingIcon: (
      <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <title>Success icon</title>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
}

/**
 * Input with prefix (currency)
 */
export const WithPrefix: Story = {
  args: {
    label: 'Price',
    type: 'number',
    placeholder: '100.00',
    prefix: '$',
    min: 0,
    step: '0.01',
  },
}

/**
 * Input with suffix (unit)
 */
export const WithSuffix: Story = {
  args: {
    label: 'Weight',
    type: 'number',
    placeholder: '75',
    suffix: 'kg',
    min: 0,
  },
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true,
    defaultValue: 'Disabled value',
  },
}

/**
 * Read-only state
 */
export const ReadOnly: Story = {
  args: {
    label: 'Read-only Input',
    readOnly: true,
    defaultValue: 'Cannot be changed',
  },
}

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium (default)" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
}

/**
 * Form example with multiple inputs
 */
export const FormExample: Story = {
  render: () => (
    <form className="max-w-md space-y-4">
      <Input label="Full Name" required placeholder="John Doe" />
      <Input label="Email" type="email" required placeholder="you@example.com" />
      <Input
        label="Phone"
        type="tel"
        placeholder="+1 (555) 123-4567"
        helperText="Include country code"
      />
      <Input label="Age" type="number" min={18} max={120} helperText="Must be 18 or older" />
      <Input label="Password" type="password" required />
    </form>
  ),
}

/**
 * Validation states comparison
 */
export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Input label="Default State" placeholder="Enter text" helperText="This is helper text" />
      <Input
        label="Success State"
        defaultValue="valid@email.com"
        success
        helperText="Email is valid"
      />
      <Input
        label="Error State"
        defaultValue="invalid"
        error
        errorMessage="This field is required"
      />
    </div>
  ),
}
