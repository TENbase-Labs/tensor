import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Modal, ModalClose } from './Modal'

describe('Modal', () => {
  describe('Basic rendering', () => {
    it('renders modal when open', () => {
      render(
        <Modal open title="Test Modal">
          Modal content
        </Modal>,
      )
      expect(screen.getByText('Test Modal')).toBeInTheDocument()
      expect(screen.getByText('Modal content')).toBeInTheDocument()
    })

    it('does not render modal when closed', () => {
      render(
        <Modal open={false} title="Test Modal">
          Modal content
        </Modal>,
      )
      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
    })

    it('renders with description', () => {
      render(
        <Modal open title="Test Modal" description="This is a description">
          Content
        </Modal>,
      )
      expect(screen.getByText('This is a description')).toBeInTheDocument()
    })

    it('renders footer content', () => {
      render(
        <Modal
          open
          title="Test Modal"
          footer={
            <>
              <button type="button">Cancel</button>
              <button type="button">Confirm</button>
            </>
          }
        >
          Content
        </Modal>,
      )
      expect(screen.getByText('Cancel')).toBeInTheDocument()
      expect(screen.getByText('Confirm')).toBeInTheDocument()
    })
  })

  describe('Close button', () => {
    it('shows close button by default', () => {
      render(
        <Modal open title="Test Modal">
          Content
        </Modal>,
      )
      expect(screen.getByLabelText('Close modal')).toBeInTheDocument()
    })

    it('hides close button when showCloseButton is false', () => {
      render(
        <Modal open title="Test Modal" showCloseButton={false}>
          Content
        </Modal>,
      )
      expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument()
    })

    it('calls onOpenChange when close button is clicked', async () => {
      const user = userEvent.setup()
      const handleOpenChange = vi.fn()

      render(
        <Modal open title="Test Modal" onOpenChange={handleOpenChange}>
          Content
        </Modal>,
      )

      const closeButton = screen.getByLabelText('Close modal')
      await user.click(closeButton)

      expect(handleOpenChange).toHaveBeenCalledWith(false)
    })

    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup()
      const handleClose = vi.fn()

      render(
        <Modal open title="Test Modal" onClose={handleClose}>
          Content
        </Modal>,
      )

      const closeButton = screen.getByLabelText('Close modal')
      await user.click(closeButton)

      expect(handleClose).toHaveBeenCalled()
    })
  })

  describe('Sizes', () => {
    it('applies small size classes', () => {
      render(
        <Modal open size="sm" title="Test Modal">
          Content
        </Modal>,
      )
      const content = screen.getByRole('dialog')
      expect(content).toHaveClass('max-w-md', 'p-6')
    })

    it('applies medium size classes by default', () => {
      render(
        <Modal open title="Test Modal">
          Content
        </Modal>,
      )
      const content = screen.getByRole('dialog')
      expect(content).toHaveClass('max-w-lg', 'p-8')
    })

    it('applies large size classes', () => {
      render(
        <Modal open size="lg" title="Test Modal">
          Content
        </Modal>,
      )
      const content = screen.getByRole('dialog')
      expect(content).toHaveClass('max-w-2xl', 'p-10')
    })

    it('applies extra large size classes', () => {
      render(
        <Modal open size="xl" title="Test Modal">
          Content
        </Modal>,
      )
      const content = screen.getByRole('dialog')
      expect(content).toHaveClass('max-w-4xl', 'p-12')
    })

    it('applies full size classes', () => {
      render(
        <Modal open size="full" title="Test Modal">
          Content
        </Modal>,
      )
      const content = screen.getByRole('dialog')
      expect(content).toHaveClass('max-w-[95vw]', 'p-8')
    })
  })

  describe('Accessibility', () => {
    it('has role="dialog"', () => {
      render(
        <Modal open title="Test Modal">
          Content
        </Modal>,
      )
      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
    })

    it('title is accessible via aria-labelledby', () => {
      render(
        <Modal open title="Accessible Modal">
          Content
        </Modal>,
      )
      const dialog = screen.getByRole('dialog')
      const title = screen.getByText('Accessible Modal')
      expect(dialog).toHaveAttribute('aria-labelledby', title.id)
    })

    it('description is accessible via aria-describedby when provided', () => {
      render(
        <Modal open title="Test Modal" description="Modal description">
          Content
        </Modal>,
      )
      const dialog = screen.getByRole('dialog')
      const description = screen.getByText('Modal description')
      expect(dialog).toHaveAttribute('aria-describedby', description.id)
    })

    it('close button has aria-label', () => {
      render(
        <Modal open title="Test Modal">
          Content
        </Modal>,
      )
      const closeButton = screen.getByLabelText('Close modal')
      expect(closeButton).toHaveAttribute('aria-label', 'Close modal')
    })
  })

  describe('Controlled mode', () => {
    it('respects open prop', () => {
      const { rerender } = render(
        <Modal open={false} title="Test Modal">
          Content
        </Modal>,
      )
      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()

      rerender(
        <Modal open title="Test Modal">
          Content
        </Modal>,
      )
      expect(screen.getByText('Test Modal')).toBeInTheDocument()
    })

    it('calls onOpenChange with false when closed', async () => {
      const user = userEvent.setup()
      const handleOpenChange = vi.fn()

      render(
        <Modal open title="Test Modal" onOpenChange={handleOpenChange}>
          Content
        </Modal>,
      )

      const closeButton = screen.getByLabelText('Close modal')
      await user.click(closeButton)

      expect(handleOpenChange).toHaveBeenCalledWith(false)
    })
  })

  describe('ModalClose component', () => {
    it('ModalClose closes modal from footer', async () => {
      const user = userEvent.setup()
      const handleOpenChange = vi.fn()

      render(
        <Modal
          open
          title="Test Modal"
          onOpenChange={handleOpenChange}
          footer={
            <ModalClose asChild>
              <button type="button">Close</button>
            </ModalClose>
          }
        >
          Content
        </Modal>,
      )

      const closeButton = screen.getByText('Close')
      await user.click(closeButton)

      expect(handleOpenChange).toHaveBeenCalledWith(false)
    })
  })

  describe('Ref forwarding', () => {
    it('forwards ref to content element', () => {
      const ref = vi.fn()
      render(
        <Modal ref={ref} open title="Test Modal">
          Content
        </Modal>,
      )
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement))
    })
  })
})
