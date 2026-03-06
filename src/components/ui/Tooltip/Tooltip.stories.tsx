import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip content',
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Preferred side to display tooltip',
    },
    sideOffset: {
      control: 'number',
      description: 'Distance from trigger (in pixels)',
    },
    delayDuration: {
      control: 'number',
      description: 'Delay before showing (in milliseconds)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

/**
 * Default tooltip on hover
 */
export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: (
      <button
        type="button"
        className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-[var(--colors-text-inverse)] hover:opacity-90"
      >
        Hover me
      </button>
    ),
  },
}

/**
 * Tooltip on icon button
 */
export const IconButton: Story = {
  args: {
    content: 'Add new item',
    children: (
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--colors-primary)] text-[var(--colors-text-inverse)] hover:opacity-90"
        aria-label="Add"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    ),
  },
}

/**
 * Tooltip with custom delay
 */
export const CustomDelay: Story = {
  args: {
    content: 'This tooltip appears after 500ms',
    delayDuration: 500,
    children: (
      <button
        type="button"
        className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-[var(--colors-text-inverse)] hover:opacity-90"
      >
        Delayed tooltip
      </button>
    ),
  },
}

/**
 * Tooltip on top (default)
 */
export const PositionTop: Story = {
  args: {
    content: 'Tooltip on top',
    side: 'top',
    children: (
      <button
        type="button"
        className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-[var(--colors-text-inverse)] hover:opacity-90"
      >
        Top tooltip
      </button>
    ),
  },
}

/**
 * Tooltip on right
 */
export const PositionRight: Story = {
  args: {
    content: 'Tooltip on right',
    side: 'right',
    children: (
      <button
        type="button"
        className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-[var(--colors-text-inverse)] hover:opacity-90"
      >
        Right tooltip
      </button>
    ),
  },
}

/**
 * Tooltip on bottom
 */
export const PositionBottom: Story = {
  args: {
    content: 'Tooltip on bottom',
    side: 'bottom',
    children: (
      <button
        type="button"
        className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-[var(--colors-text-inverse)] hover:opacity-90"
      >
        Bottom tooltip
      </button>
    ),
  },
}

/**
 * Tooltip on left
 */
export const PositionLeft: Story = {
  args: {
    content: 'Tooltip on left',
    side: 'left',
    children: (
      <button
        type="button"
        className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-[var(--colors-text-inverse)] hover:opacity-90"
      >
        Left tooltip
      </button>
    ),
  },
}

/**
 * Tooltip on link
 */
export const OnLink: Story = {
  args: {
    content: 'Learn more about this topic',
    children: (
      <a href="#learn-more" className="text-[var(--colors-primary)] underline hover:opacity-80">
        Documentation
      </a>
    ),
  },
}

/**
 * Tooltip on disabled button
 */
export const DisabledButton: Story = {
  args: {
    content: 'This action is currently unavailable',
    children: (
      <span className="inline-block">
        <button
          type="button"
          disabled
          className="cursor-not-allowed rounded-md bg-[var(--colors-neutral-300)] px-4 py-2 text-[var(--colors-neutral-500)]"
        >
          Disabled button
        </button>
      </span>
    ),
  },
}

/**
 * Tooltip with rich content
 */
export const RichContent: Story = {
  args: {
    content: (
      <div className="flex flex-col gap-1">
        <div className="font-semibold">Keyboard Shortcut</div>
        <div className="text-xs">Press Cmd+K to open search</div>
      </div>
    ),
    children: (
      <button
        type="button"
        className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-[var(--colors-text-inverse)] hover:opacity-90"
      >
        Search
      </button>
    ),
  },
}

/**
 * Multiple tooltips example
 */
export const MultipleTooltips: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Edit this item">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--colors-primary)] text-white hover:opacity-90"
        >
          ✏️
        </button>
      </Tooltip>
      <Tooltip content="Delete this item">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--colors-danger)] text-white hover:opacity-90"
        >
          🗑️
        </button>
      </Tooltip>
      <Tooltip content="Share this item">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--colors-success)] text-white hover:opacity-90"
        >
          📤
        </button>
      </Tooltip>
    </div>
  ),
}

/**
 * Tooltips in a form
 */
export const FormExample: Story = {
  render: () => (
    <form className="max-w-md space-y-4">
      <div>
        <label htmlFor="email" className="mb-2 flex items-center gap-2 text-sm font-medium">
          Email
          <Tooltip content="We'll never share your email with anyone else">
            <span className="flex h-5 w-5 cursor-help items-center justify-center rounded-full bg-[var(--colors-neutral-200)] text-xs">
              ?
            </span>
          </Tooltip>
        </label>
        <input
          id="email"
          type="email"
          className="w-full rounded-md border border-[var(--colors-neutral-300)] px-3 py-2"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 flex items-center gap-2 text-sm font-medium">
          Password
          <Tooltip content="Password must be at least 8 characters with numbers and symbols">
            <span className="flex h-5 w-5 cursor-help items-center justify-center rounded-full bg-[var(--colors-neutral-200)] text-xs">
              ?
            </span>
          </Tooltip>
        </label>
        <input
          id="password"
          type="password"
          className="w-full rounded-md border border-[var(--colors-neutral-300)] px-3 py-2"
          placeholder="••••••••"
        />
      </div>
    </form>
  ),
}

/**
 * All positions comparison
 */
export const AllPositions: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8">
      <Tooltip content="Top" side="top">
        <button
          type="button"
          className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-white hover:opacity-90"
        >
          Top
        </button>
      </Tooltip>
      <div className="flex gap-8">
        <Tooltip content="Left" side="left">
          <button
            type="button"
            className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-white hover:opacity-90"
          >
            Left
          </button>
        </Tooltip>
        <Tooltip content="Right" side="right">
          <button
            type="button"
            className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-white hover:opacity-90"
          >
            Right
          </button>
        </Tooltip>
      </div>
      <Tooltip content="Bottom" side="bottom">
        <button
          type="button"
          className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-white hover:opacity-90"
        >
          Bottom
        </button>
      </Tooltip>
    </div>
  ),
}
