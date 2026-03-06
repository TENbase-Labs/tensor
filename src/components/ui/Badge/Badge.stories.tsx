import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'danger'],
      description: 'Badge variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
    dot: {
      control: 'boolean',
      description: 'Show dot indicator',
    },
    removable: {
      control: 'boolean',
      description: 'Enable remove button',
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

/**
 * Default neutral badge
 */
export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

/**
 * Info variant
 */
export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
}

/**
 * Success variant
 */
export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
}

/**
 * Warning variant
 */
export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
}

/**
 * Danger variant
 */
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger',
  },
}

/**
 * Small size
 */
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
}

/**
 * Large size
 */
export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
}

/**
 * Badge with dot indicator
 */
export const WithDot: Story = {
  args: {
    variant: 'success',
    dot: true,
    children: 'Online',
  },
}

/**
 * Badge with icon
 */
export const WithIcon: Story = {
  args: {
    variant: 'info',
    icon: (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-3 w-3"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    children: 'With Icon',
  },
}

/**
 * Removable badge
 */
export const Removable: Story = {
  render: () => {
    const [visible, setVisible] = useState(true)

    if (!visible) {
      return (
        <button
          type="button"
          onClick={() => setVisible(true)}
          className="text-sm text-[var(--colors-primary)] underline"
        >
          Show badge again
        </button>
      )
    }

    return (
      <Badge removable onRemove={() => setVisible(false)}>
        Removable
      </Badge>
    )
  },
}

/**
 * All variants
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
    </div>
  ),
}

/**
 * All sizes
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}

/**
 * Status badges with dots
 */
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success" dot>
        Online
      </Badge>
      <Badge variant="warning" dot>
        Away
      </Badge>
      <Badge variant="danger" dot>
        Offline
      </Badge>
      <Badge variant="neutral" dot>
        Unknown
      </Badge>
    </div>
  ),
}

/**
 * Tag list with removable badges
 */
export const TagList: Story = {
  render: () => {
    const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind', 'Storybook'])

    return (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} removable onRemove={() => setTags(tags.filter((t) => t !== tag))}>
              {tag}
            </Badge>
          ))}
        </div>
        {tags.length === 0 && (
          <button
            type="button"
            onClick={() => setTags(['React', 'TypeScript', 'Tailwind', 'Storybook'])}
            className="text-sm text-[var(--colors-primary)] underline"
          >
            Reset tags
          </button>
        )}
      </div>
    )
  },
}

/**
 * Badge variants in context
 */
export const InContext: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="font-medium">Task Status:</span>
        <Badge variant="success">Completed</Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-medium">Server:</span>
        <Badge variant="success" dot>
          Operational
        </Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-medium">Build:</span>
        <Badge variant="warning">In Progress</Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-medium">Notifications:</span>
        <Badge variant="danger">3 New</Badge>
      </div>
    </div>
  ),
}
