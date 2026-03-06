import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Select size variant',
    },
    label: {
      control: 'text',
      description: 'Field label',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value selected',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below select',
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
  },
}

export default meta
type Story = StoryObj<typeof Select>

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'watermelon', label: 'Watermelon' },
]

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
]

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
]

/**
 * Default select
 */
export const Default: Story = {
  args: {
    options: fruitOptions,
  },
}

/**
 * Select with label
 */
export const WithLabel: Story = {
  args: {
    label: 'Favorite Fruit',
    options: fruitOptions,
  },
}

/**
 * Select with custom placeholder
 */
export const WithPlaceholder: Story = {
  args: {
    label: 'Country',
    placeholder: 'Choose a country...',
    options: countryOptions,
  },
}

/**
 * Required field with asterisk indicator
 */
export const Required: Story = {
  args: {
    label: 'Priority Level',
    required: true,
    options: priorityOptions,
  },
}

/**
 * Select with helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Shipping Country',
    helperText: 'Select the country where your order will be shipped',
    options: countryOptions,
  },
}

/**
 * Pre-selected value
 */
export const WithDefaultValue: Story = {
  args: {
    label: 'Language',
    defaultValue: 'en',
    options: [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' },
      { value: 'de', label: 'German' },
    ],
  },
}

/**
 * Error state with error message
 */
export const ErrorState: Story = {
  args: {
    label: 'Category',
    required: true,
    error: true,
    errorMessage: 'Please select a category',
    options: [
      { value: 'electronics', label: 'Electronics' },
      { value: 'clothing', label: 'Clothing' },
      { value: 'books', label: 'Books' },
    ],
  },
}

/**
 * Small size - dense forms
 */
export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Select',
    options: fruitOptions,
  },
}

/**
 * Medium size (default) - standard forms
 */
export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Medium Select (default)',
    options: fruitOptions,
  },
}

/**
 * Large size - prominent selections
 */
export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Select',
    options: fruitOptions,
  },
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    disabled: true,
    defaultValue: 'apple',
    options: fruitOptions,
  },
}

/**
 * Options with disabled items
 */
export const WithDisabledOptions: Story = {
  args: {
    label: 'Payment Method',
    options: [
      { value: 'credit', label: 'Credit Card' },
      { value: 'debit', label: 'Debit Card' },
      { value: 'paypal', label: 'PayPal', disabled: true },
      { value: 'bank', label: 'Bank Transfer', disabled: true },
    ],
  },
}

/**
 * Long option list
 */
export const LongList: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: [
      { value: 'af', label: 'Afghanistan' },
      { value: 'al', label: 'Albania' },
      { value: 'dz', label: 'Algeria' },
      { value: 'ar', label: 'Argentina' },
      { value: 'au', label: 'Australia' },
      { value: 'at', label: 'Austria' },
      { value: 'bd', label: 'Bangladesh' },
      { value: 'be', label: 'Belgium' },
      { value: 'br', label: 'Brazil' },
      { value: 'ca', label: 'Canada' },
      { value: 'cl', label: 'Chile' },
      { value: 'cn', label: 'China' },
      { value: 'co', label: 'Colombia' },
      { value: 'dk', label: 'Denmark' },
      { value: 'eg', label: 'Egypt' },
      { value: 'fi', label: 'Finland' },
      { value: 'fr', label: 'France' },
      { value: 'de', label: 'Germany' },
      { value: 'gr', label: 'Greece' },
      { value: 'in', label: 'India' },
      { value: 'id', label: 'Indonesia' },
      { value: 'ie', label: 'Ireland' },
      { value: 'il', label: 'Israel' },
      { value: 'it', label: 'Italy' },
      { value: 'jp', label: 'Japan' },
      { value: 'mx', label: 'Mexico' },
      { value: 'nl', label: 'Netherlands' },
      { value: 'nz', label: 'New Zealand' },
      { value: 'no', label: 'Norway' },
      { value: 'pk', label: 'Pakistan' },
      { value: 'pl', label: 'Poland' },
      { value: 'pt', label: 'Portugal' },
      { value: 'ru', label: 'Russia' },
      { value: 'sa', label: 'Saudi Arabia' },
      { value: 'sg', label: 'Singapore' },
      { value: 'za', label: 'South Africa' },
      { value: 'kr', label: 'South Korea' },
      { value: 'es', label: 'Spain' },
      { value: 'se', label: 'Sweden' },
      { value: 'ch', label: 'Switzerland' },
      { value: 'th', label: 'Thailand' },
      { value: 'tr', label: 'Turkey' },
      { value: 'ua', label: 'Ukraine' },
      { value: 'ae', label: 'United Arab Emirates' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'us', label: 'United States' },
      { value: 'vn', label: 'Vietnam' },
    ],
  },
}

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <Select size="sm" label="Small" options={fruitOptions} />
      <Select size="md" label="Medium (default)" options={fruitOptions} />
      <Select size="lg" label="Large" options={fruitOptions} />
    </div>
  ),
}

/**
 * Form example
 */
export const FormExample: Story = {
  render: () => (
    <form className="max-w-md space-y-6">
      <Select
        label="Account Type"
        required
        helperText="Select the type of account you want to create"
        options={[
          { value: 'personal', label: 'Personal' },
          { value: 'business', label: 'Business' },
          { value: 'enterprise', label: 'Enterprise' },
        ]}
      />
      <Select label="Country" required placeholder="Select your country" options={countryOptions} />
      <Select
        label="Timezone"
        helperText="Your local timezone"
        options={[
          { value: 'est', label: 'Eastern Time (ET)' },
          { value: 'cst', label: 'Central Time (CT)' },
          { value: 'mst', label: 'Mountain Time (MT)' },
          { value: 'pst', label: 'Pacific Time (PT)' },
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
      <Select label="Default State" options={fruitOptions} />
      <Select label="With Selection" defaultValue="banana" options={fruitOptions} />
      <Select
        label="Error State"
        error
        errorMessage="Please select an option"
        options={fruitOptions}
      />
      <Select label="Disabled State" disabled defaultValue="apple" options={fruitOptions} />
    </div>
  ),
}
