import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
      description: 'Semantic variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Alert size',
    },
    title: {
      control: 'text',
      description: 'Alert title/heading',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show/hide variant icon',
    },
    dismissible: {
      control: 'boolean',
      description: 'Enable dismiss button',
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

/**
 * Info alert - informational messages
 */
export const Info: Story = {
  args: {
    variant: 'info',
    children: 'New features are available. Check the changelog for details.',
  },
}

/**
 * Success alert - confirmation messages
 */
export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Your changes have been saved successfully.',
  },
}

/**
 * Warning alert - caution messages
 */
export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Your session will expire in 5 minutes. Please save your work.',
  },
}

/**
 * Danger/Error alert - error messages
 */
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Form submission failed. Please check your inputs and try again.',
  },
}

/**
 * Alert with title
 */
export const WithTitle: Story = {
  args: {
    variant: 'info',
    title: 'Payment Required',
    children: 'Your trial has expired. Upgrade to continue using this feature.',
  },
}

/**
 * Dismissible alert
 */
export const Dismissible: Story = {
  args: {
    variant: 'success',
    dismissible: true,
    children: 'Account created successfully. Welcome aboard!',
  },
}

/**
 * Alert without icon
 */
export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    showIcon: false,
    children: 'This alert has no icon.',
  },
}

/**
 * Small size alert
 */
export const Small: Story = {
  args: {
    variant: 'info',
    size: 'sm',
    children: 'This is a compact alert for dense UIs.',
  },
}

/**
 * Medium size alert (default)
 */
export const Medium: Story = {
  args: {
    variant: 'info',
    size: 'md',
    children: 'This is a standard-sized alert.',
  },
}

/**
 * Alert with action buttons
 */
export const WithActions: Story = {
  args: {
    variant: 'success',
    children: 'Item deleted successfully',
    actions: (
      <>
        <button
          type="button"
          className="rounded-md px-3 py-1.5 text-sm font-medium hover:bg-black/5"
        >
          Undo
        </button>
        <button
          type="button"
          className="rounded-md px-3 py-1.5 text-sm font-medium hover:bg-black/5"
        >
          View
        </button>
      </>
    ),
  },
}

/**
 * Dismissible alert with actions
 */
export const DismissibleWithActions: Story = {
  args: {
    variant: 'info',
    dismissible: true,
    children: 'New update available',
    actions: (
      <button type="button" className="rounded-md px-3 py-1.5 text-sm font-medium hover:bg-black/5">
        Update Now
      </button>
    ),
  },
}

/**
 * Long message alert
 */
export const LongMessage: Story = {
  args: {
    variant: 'warning',
    title: 'Important Security Notice',
    children:
      'We detected unusual activity on your account. As a precaution, we have temporarily limited some features. Please review your recent activity and update your password if you did not authorize these actions. Contact support if you need assistance.',
  },
}

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info">Informational message about new features</Alert>
      <Alert variant="success">Success message confirming action completed</Alert>
      <Alert variant="warning">Warning message about potential issue</Alert>
      <Alert variant="danger">Error message indicating failure</Alert>
    </div>
  ),
}

/**
 * All variants with titles
 */
export const AllVariantsWithTitles: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" title="Information">
        New features are available in this release
      </Alert>
      <Alert variant="success" title="Success">
        Your changes have been saved
      </Alert>
      <Alert variant="warning" title="Warning">
        Your session will expire soon
      </Alert>
      <Alert variant="danger" title="Error">
        Form submission failed
      </Alert>
    </div>
  ),
}

/**
 * Dismissible alerts
 */
export const AllDismissible: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" dismissible>
        Dismissible info alert
      </Alert>
      <Alert variant="success" dismissible>
        Dismissible success alert
      </Alert>
      <Alert variant="warning" dismissible>
        Dismissible warning alert
      </Alert>
      <Alert variant="danger" dismissible>
        Dismissible error alert
      </Alert>
    </div>
  ),
}

/**
 * Form validation example
 */
export const FormValidation: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <Alert variant="danger" title="Form Validation Error">
        Please correct the following errors before submitting:
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>Email address is required</li>
          <li>Password must be at least 8 characters</li>
          <li>Terms and conditions must be accepted</li>
        </ul>
      </Alert>
    </div>
  ),
}

/**
 * Size comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" size="sm">
        Small alert for compact layouts
      </Alert>
      <Alert variant="info" size="md">
        Medium alert (default size)
      </Alert>
    </div>
  ),
}
