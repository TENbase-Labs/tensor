import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Switch size variant',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    description: {
      control: 'text',
      description: 'Description text below label',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
    },
    onLabel: {
      control: 'text',
      description: 'Text shown when switch is on (inside track)',
    },
    offLabel: {
      control: 'text',
      description: 'Text shown when switch is off (inside track)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

/**
 * Default switch - minimal configuration
 */
export const Default: Story = {
  args: {},
}

/**
 * Switch with label
 */
export const WithLabel: Story = {
  args: {
    label: 'Enable notifications',
  },
}

/**
 * Switch with description text
 */
export const WithDescription: Story = {
  args: {
    label: 'Dark mode',
    description: 'Switch between light and dark color themes',
  },
}

/**
 * Checked state
 */
export const Checked: Story = {
  args: {
    label: 'Enabled',
    defaultChecked: true,
  },
}

/**
 * Loading state (async toggle)
 */
export const Loading: Story = {
  args: {
    label: 'Enabling two-factor authentication',
    loading: true,
    checked: true,
  },
}

/**
 * Small size - dense settings
 */
export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small switch',
  },
}

/**
 * Medium size (default) - standard forms
 */
export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Medium switch (default)',
  },
}

/**
 * Large size - prominent settings
 */
export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large switch',
  },
}

/**
 * With ON/OFF labels inside track
 */
export const WithOnOffLabels: Story = {
  args: {
    label: 'Power',
    onLabel: 'ON',
    offLabel: 'OFF',
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
      <Switch size="sm" label="Small" />
      <Switch size="md" label="Medium (default)" />
      <Switch size="lg" label="Large" />
    </div>
  ),
}

/**
 * Settings panel example
 */
export const SettingsPanel: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <Switch
        label="Push notifications"
        description="Receive notifications about activity on your account"
        defaultChecked
      />
      <Switch label="Email notifications" description="Receive email updates about new features" />
      <Switch
        label="Two-factor authentication"
        description="Add an extra layer of security to your account"
      />
      <Switch label="Dark mode" description="Switch to a darker color theme" />
    </div>
  ),
}

/**
 * States comparison
 */
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch label="Unchecked" />
      <Switch label="Checked" defaultChecked />
      <Switch label="Loading" loading checked />
      <Switch label="Disabled unchecked" disabled />
      <Switch label="Disabled checked" disabled defaultChecked />
    </div>
  ),
}

/**
 * Interactive toggle example
 */
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false)

    return (
      <div className="space-y-4">
        <Switch
          label="Enable feature"
          description={`Feature is currently ${checked ? 'enabled' : 'disabled'}`}
          checked={checked}
          onCheckedChange={setChecked}
        />
        <p className="text-sm text-[var(--colors-neutral-600)]">State: {checked ? 'On' : 'Off'}</p>
      </div>
    )
  },
}
