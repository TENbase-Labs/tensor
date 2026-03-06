import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Alert } from './Alert'

describe('Alert', () => {
  describe('Basic rendering', () => {
    it('renders alert message', () => {
      render(<Alert variant="info">This is an alert message</Alert>)
      expect(screen.getByText('This is an alert message')).toBeInTheDocument()
    })

    it('renders with title', () => {
      render(
        <Alert variant="info" title="Important">
          Message content
        </Alert>,
      )
      expect(screen.getByText('Important')).toBeInTheDocument()
      expect(screen.getByText('Message content')).toBeInTheDocument()
    })

    it('renders default icon by variant', () => {
      render(<Alert variant="info">Message</Alert>)
      expect(screen.getByTitle('Info')).toBeInTheDocument()
    })

    it('hides icon when showIcon is false', () => {
      render(
        <Alert variant="info" showIcon={false}>
          Message
        </Alert>,
      )
      expect(screen.queryByTitle('Info')).not.toBeInTheDocument()
    })

    it('renders custom icon', () => {
      render(
        <Alert variant="info" icon={<span data-testid="custom-icon">★</span>}>
          Message
        </Alert>,
      )
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('renders info variant with info icon', () => {
      render(<Alert variant="info">Info message</Alert>)
      expect(screen.getByTitle('Info')).toBeInTheDocument()
    })

    it('renders success variant with success icon', () => {
      render(<Alert variant="success">Success message</Alert>)
      expect(screen.getByTitle('Success')).toBeInTheDocument()
    })

    it('renders warning variant with warning icon', () => {
      render(<Alert variant="warning">Warning message</Alert>)
      expect(screen.getByTitle('Warning')).toBeInTheDocument()
    })

    it('renders danger variant with error icon', () => {
      render(<Alert variant="danger">Error message</Alert>)
      expect(screen.getByTitle('Error')).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    it('applies small size classes', () => {
      const { container } = render(
        <Alert size="sm" variant="info">
          Message
        </Alert>,
      )
      const alert = container.firstChild as HTMLElement
      expect(alert).toHaveClass('p-4', 'text-sm')
    })

    it('applies medium size classes by default', () => {
      const { container } = render(<Alert variant="info">Message</Alert>)
      const alert = container.firstChild as HTMLElement
      expect(alert).toHaveClass('p-6', 'text-base')
    })
  })

  describe('Dismissible behavior', () => {
    it('shows dismiss button when dismissible is true', () => {
      render(
        <Alert variant="info" dismissible>
          Message
        </Alert>,
      )
      expect(screen.getByLabelText('Dismiss alert')).toBeInTheDocument()
    })

    it('does not show dismiss button by default', () => {
      render(<Alert variant="info">Message</Alert>)
      expect(screen.queryByLabelText('Dismiss alert')).not.toBeInTheDocument()
    })

    it('calls onDismiss when dismiss button is clicked', async () => {
      const user = userEvent.setup()
      const handleDismiss = vi.fn()

      render(
        <Alert variant="info" dismissible onDismiss={handleDismiss}>
          Message
        </Alert>,
      )

      await user.click(screen.getByLabelText('Dismiss alert'))

      // Wait for fade out animation
      await vi.waitFor(() => {
        expect(handleDismiss).toHaveBeenCalledOnce()
      })
    })

    it('removes alert from DOM after dismiss', async () => {
      const user = userEvent.setup()
      render(
        <Alert variant="info" dismissible>
          Message
        </Alert>,
      )

      const dismissButton = screen.getByLabelText('Dismiss alert')
      await user.click(dismissButton)

      // Alert should be removed from DOM
      expect(screen.queryByText('Message')).not.toBeInTheDocument()
    })
  })

  describe('Actions', () => {
    it('renders action buttons', () => {
      render(
        <Alert
          variant="info"
          actions={
            <>
              <button type="button">Undo</button>
              <button type="button">View</button>
            </>
          }
        >
          Message
        </Alert>,
      )
      expect(screen.getByText('Undo')).toBeInTheDocument()
      expect(screen.getByText('View')).toBeInTheDocument()
    })

    it('renders both actions and dismiss button', () => {
      render(
        <Alert variant="info" dismissible actions={<button type="button">Undo</button>}>
          Message
        </Alert>,
      )
      expect(screen.getByText('Undo')).toBeInTheDocument()
      expect(screen.getByLabelText('Dismiss alert')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('uses role="alert" for danger variant by default', () => {
      const { container } = render(<Alert variant="danger">Error</Alert>)
      const alert = container.firstChild as HTMLElement
      expect(alert).toHaveAttribute('role', 'alert')
    })

    it('uses role="status" for info variant by default', () => {
      const { container } = render(<Alert variant="info">Info</Alert>)
      const alert = container.firstChild as HTMLElement
      expect(alert).toHaveAttribute('role', 'status')
    })

    it('uses role="status" for success variant by default', () => {
      const { container } = render(<Alert variant="success">Success</Alert>)
      const alert = container.firstChild as HTMLElement
      expect(alert).toHaveAttribute('role', 'status')
    })

    it('uses role="alert" for warning variant by default', () => {
      const { container } = render(<Alert variant="warning">Warning</Alert>)
      const alert = container.firstChild as HTMLElement
      expect(alert).toHaveAttribute('role', 'alert')
    })

    it('allows custom role', () => {
      const { container } = render(
        <Alert variant="info" role="alert">
          Message
        </Alert>,
      )
      const alert = container.firstChild as HTMLElement
      expect(alert).toHaveAttribute('role', 'alert')
    })

    it('sets aria-live="assertive" for danger variant', () => {
      const { container } = render(<Alert variant="danger">Error</Alert>)
      const alert = container.firstChild as HTMLElement
      expect(alert).toHaveAttribute('aria-live', 'assertive')
    })

    it('sets aria-live="polite" for info variant', () => {
      const { container } = render(<Alert variant="info">Info</Alert>)
      const alert = container.firstChild as HTMLElement
      expect(alert).toHaveAttribute('aria-live', 'polite')
    })

    it('sets aria-hidden on icons', () => {
      const { container } = render(<Alert variant="info">Message</Alert>)
      const iconContainer = container.querySelector('[aria-hidden="true"]')
      expect(iconContainer).toBeInTheDocument()
    })
  })

  describe('Keyboard navigation', () => {
    it('dismiss button is focusable with Tab', async () => {
      const user = userEvent.setup()
      render(
        <Alert variant="info" dismissible>
          Message
        </Alert>,
      )

      await user.tab()
      expect(screen.getByLabelText('Dismiss alert')).toHaveFocus()
    })

    it('dismiss button activates on Enter', async () => {
      const user = userEvent.setup()
      const handleDismiss = vi.fn()

      render(
        <Alert variant="info" dismissible onDismiss={handleDismiss}>
          Message
        </Alert>,
      )

      const dismissButton = screen.getByLabelText('Dismiss alert')
      dismissButton.focus()
      await user.keyboard('{Enter}')

      await vi.waitFor(() => {
        expect(handleDismiss).toHaveBeenCalledOnce()
      })
    })
  })

  describe('Ref forwarding', () => {
    it('forwards ref to alert element', () => {
      const ref = vi.fn()
      render(
        <Alert ref={ref} variant="info">
          Message
        </Alert>,
      )
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
    })
  })
})
