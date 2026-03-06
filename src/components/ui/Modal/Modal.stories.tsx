import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal, ModalClose, ModalTrigger } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Modal size variant',
    },
    title: {
      control: 'text',
      description: 'Modal title (required for accessibility)',
    },
    description: {
      control: 'text',
      description: 'Optional description text',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show/hide close button',
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state',
    },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

/**
 * Basic modal with title and content
 */
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Modal open={open} onOpenChange={setOpen} title="Welcome">
        <ModalTrigger asChild>
          <button
            type="button"
            className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-[var(--colors-text-inverse)] hover:opacity-90"
          >
            Open Modal
          </button>
        </ModalTrigger>
        <p>This is a basic modal dialog with a title and some content.</p>
      </Modal>
    )
  },
}

/**
 * Modal with description
 */
export const WithDescription: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Delete Account"
        description="This action cannot be undone and will permanently delete your account."
      >
        <ModalTrigger asChild>
          <button
            type="button"
            className="rounded-md bg-[var(--colors-danger)] px-4 py-2 text-white hover:opacity-90"
          >
            Delete Account
          </button>
        </ModalTrigger>
        <p>Please confirm that you want to proceed with deleting your account.</p>
      </Modal>
    )
  },
}

/**
 * Modal with footer actions
 */
export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Confirm Action"
        description="Are you sure you want to continue?"
        footer={
          <>
            <button
              type="button"
              className="rounded-md px-4 py-2 text-sm font-medium hover:bg-black/5"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              onClick={() => {
                alert('Confirmed!')
                setOpen(false)
              }}
            >
              Confirm
            </button>
          </>
        }
      >
        <ModalTrigger asChild>
          <button
            type="button"
            className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-[var(--colors-text-inverse)] hover:opacity-90"
          >
            Open with Footer
          </button>
        </ModalTrigger>
        <p>This modal includes action buttons in the footer.</p>
      </Modal>
    )
  },
}

/**
 * Modal with ModalClose in footer
 */
export const WithModalClose: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Save Changes"
        footer={
          <>
            <ModalClose asChild>
              <button
                type="button"
                className="rounded-md px-4 py-2 text-sm font-medium hover:bg-black/5"
              >
                Cancel
              </button>
            </ModalClose>
            <button
              type="button"
              className="rounded-md bg-[var(--colors-success)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              onClick={() => {
                alert('Saved!')
                setOpen(false)
              }}
            >
              Save
            </button>
          </>
        }
      >
        <ModalTrigger asChild>
          <button
            type="button"
            className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-[var(--colors-text-inverse)] hover:opacity-90"
          >
            Edit Settings
          </button>
        </ModalTrigger>
        <p>Click Save to confirm or Cancel to dismiss without saving.</p>
      </Modal>
    )
  },
}

/**
 * Modal without close button
 */
export const NoCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Important Notice"
        showCloseButton={false}
        footer={
          <button
            type="button"
            className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            onClick={() => setOpen(false)}
          >
            I Understand
          </button>
        }
      >
        <ModalTrigger asChild>
          <button
            type="button"
            className="rounded-md bg-[var(--colors-warning)] px-4 py-2 text-white hover:opacity-90"
          >
            Show Notice
          </button>
        </ModalTrigger>
        <p>
          This modal requires explicit acknowledgment via the button. The close button in the header
          is hidden.
        </p>
      </Modal>
    )
  },
}

/**
 * Small size modal
 */
export const Small: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Modal open={open} onOpenChange={setOpen} size="sm" title="Small Modal">
        <ModalTrigger asChild>
          <button
            type="button"
            className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-[var(--colors-text-inverse)] hover:opacity-90"
          >
            Open Small Modal
          </button>
        </ModalTrigger>
        <p>This is a small modal, perfect for brief messages or simple confirmations.</p>
      </Modal>
    )
  },
}

/**
 * Medium size modal (default)
 */
export const Medium: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Modal open={open} onOpenChange={setOpen} size="md" title="Medium Modal">
        <ModalTrigger asChild>
          <button
            type="button"
            className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-[var(--colors-text-inverse)] hover:opacity-90"
          >
            Open Medium Modal
          </button>
        </ModalTrigger>
        <p>This is the default medium size, suitable for most use cases.</p>
      </Modal>
    )
  },
}

/**
 * Large size modal
 */
export const Large: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Modal open={open} onOpenChange={setOpen} size="lg" title="Large Modal">
        <ModalTrigger asChild>
          <button
            type="button"
            className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-[var(--colors-text-inverse)] hover:opacity-90"
          >
            Open Large Modal
          </button>
        </ModalTrigger>
        <p>This larger modal can accommodate more content, like forms or detailed information.</p>
      </Modal>
    )
  },
}

/**
 * Extra large size modal
 */
export const ExtraLarge: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Modal open={open} onOpenChange={setOpen} size="xl" title="Extra Large Modal">
        <ModalTrigger asChild>
          <button
            type="button"
            className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-[var(--colors-text-inverse)] hover:opacity-90"
          >
            Open XL Modal
          </button>
        </ModalTrigger>
        <p>
          This extra large modal is suitable for complex content like multi-step forms or data
          tables.
        </p>
      </Modal>
    )
  },
}

/**
 * Full width modal
 */
export const FullWidth: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Modal open={open} onOpenChange={setOpen} size="full" title="Full Width Modal">
        <ModalTrigger asChild>
          <button
            type="button"
            className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-[var(--colors-text-inverse)] hover:opacity-90"
          >
            Open Full Width Modal
          </button>
        </ModalTrigger>
        <p>This modal takes up most of the viewport width, useful for complex layouts.</p>
      </Modal>
    )
  },
}

/**
 * Long content with scroll
 */
export const LongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Terms and Conditions"
        description="Please read and accept our terms of service"
        footer={
          <>
            <ModalClose asChild>
              <button
                type="button"
                className="rounded-md px-4 py-2 text-sm font-medium hover:bg-black/5"
              >
                Decline
              </button>
            </ModalClose>
            <button
              type="button"
              className="rounded-md bg-[var(--colors-success)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              onClick={() => {
                alert('Accepted!')
                setOpen(false)
              }}
            >
              Accept
            </button>
          </>
        }
      >
        <ModalTrigger asChild>
          <button
            type="button"
            className="rounded-md bg-[var(--colors-primary)] px-4 py-2 text-[var(--colors-text-inverse)] hover:opacity-90"
          >
            View Terms
          </button>
        </ModalTrigger>
        <div className="space-y-4 text-sm">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit
            voluptatem accusantium doloremque laudantium.
          </p>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
            consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
            velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam
            aliquam quaerat voluptatem.
          </p>
          <p>
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
            laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
          </p>
        </div>
      </Modal>
    )
  },
}

/**
 * Danger/destructive action modal
 */
export const DangerousAction: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Delete Project"
        description="This action cannot be undone. All data will be permanently deleted."
        footer={
          <>
            <ModalClose asChild>
              <button
                type="button"
                className="rounded-md px-4 py-2 text-sm font-medium hover:bg-black/5"
              >
                Cancel
              </button>
            </ModalClose>
            <button
              type="button"
              className="rounded-md bg-[var(--colors-danger)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              onClick={() => {
                alert('Project deleted!')
                setOpen(false)
              }}
            >
              Delete Project
            </button>
          </>
        }
      >
        <ModalTrigger asChild>
          <button
            type="button"
            className="rounded-md bg-[var(--colors-danger)] px-4 py-2 text-white hover:opacity-90"
          >
            Delete Project
          </button>
        </ModalTrigger>
        <p className="font-medium">Are you absolutely sure?</p>
        <p className="mt-2 text-sm text-[var(--colors-neutral-600)]">
          Type <strong>DELETE</strong> to confirm:
        </p>
        <input
          type="text"
          className="mt-2 w-full rounded-md border border-[var(--colors-neutral-300)] px-3 py-2"
          placeholder="Type DELETE"
        />
      </Modal>
    )
  },
}
