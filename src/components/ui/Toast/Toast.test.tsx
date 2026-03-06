import { act, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Toast } from './Toast'
import { ToastProvider, useToast } from './ToastProvider'

describe('Toast', () => {
  it('renders message', () => {
    render(<Toast id="test" message="Test notification" />)
    expect(screen.getByText('Test notification')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Toast id="test" title="Success" message="Operation completed" />)
    expect(screen.getByText('Success')).toBeInTheDocument()
    expect(screen.getByText('Operation completed')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<Toast id="test" message="Test" description="Additional details" />)
    expect(screen.getByText('Additional details')).toBeInTheDocument()
  })

  it('shows icon by default', () => {
    render(<Toast id="test" message="Test" variant="success" />)
    expect(screen.getByText('✅')).toBeInTheDocument()
  })

  it('hides icon when showIcon is false', () => {
    render(<Toast id="test" message="Test" variant="success" showIcon={false} />)
    expect(screen.queryByText('✅')).not.toBeInTheDocument()
  })

  it('calls onDismiss when close button clicked', async () => {
    const user = userEvent.setup()
    const handleDismiss = vi.fn()
    render(<Toast id="test" message="Test" onDismiss={handleDismiss} dismissible />)

    await user.click(screen.getByLabelText('Dismiss notification'))
    expect(handleDismiss).toHaveBeenCalledOnce()
  })

  it('calls action onClick when action button clicked', async () => {
    const user = userEvent.setup()
    const handleAction = vi.fn()
    render(<Toast id="test" message="Test" action={{ label: 'Undo', onClick: handleAction }} />)

    await user.click(screen.getByText('Undo'))
    expect(handleAction).toHaveBeenCalledOnce()
  })

  it('auto-dismisses after duration', () => {
    vi.useFakeTimers()
    const handleDismiss = vi.fn()
    render(<Toast id="test" message="Test" duration={1000} onDismiss={handleDismiss} />)

    expect(handleDismiss).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(handleDismiss).toHaveBeenCalledOnce()
    vi.useRealTimers()
  })

  it('does not auto-dismiss when autoDismiss is false', async () => {
    vi.useFakeTimers()
    const handleDismiss = vi.fn()
    render(
      <Toast
        id="test"
        message="Test"
        duration={1000}
        autoDismiss={false}
        onDismiss={handleDismiss}
      />,
    )

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(handleDismiss).not.toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Toast id="test" message="Test" variant="info" />)
    expect(screen.getByRole('alert')).toHaveClass('border-[var(--colors-info)]')

    rerender(<Toast id="test" message="Test" variant="success" />)
    expect(screen.getByRole('alert')).toHaveClass('border-[var(--colors-success)]')

    rerender(<Toast id="test" message="Test" variant="warning" />)
    expect(screen.getByRole('alert')).toHaveClass('border-[var(--colors-warning)]')

    rerender(<Toast id="test" message="Test" variant="danger" />)
    expect(screen.getByRole('alert')).toHaveClass('border-[var(--colors-danger)]')
  })
})

describe('ToastProvider', () => {
  function TestComponent() {
    const toast = useToast()
    return (
      <div>
        <button type="button" onClick={() => toast.info('Info message')}>
          Show Info
        </button>
        <button type="button" onClick={() => toast.success('Success message')}>
          Show Success
        </button>
        <button type="button" onClick={() => toast.warning('Warning message')}>
          Show Warning
        </button>
        <button type="button" onClick={() => toast.error('Error message')}>
          Show Error
        </button>
        <button type="button" onClick={() => toast.dismissAll()}>
          Dismiss All
        </button>
      </div>
    )
  }

  it('provides toast context', () => {
    expect(() => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>,
      )
    }).not.toThrow()
  })

  it('shows toast when info method called', async () => {
    const user = userEvent.setup()
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    )

    await user.click(screen.getByText('Show Info'))
    expect(screen.getByText('Info message')).toBeInTheDocument()
  })

  it('shows toast when success method called', async () => {
    const user = userEvent.setup()
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    )

    await user.click(screen.getByText('Show Success'))
    expect(screen.getByText('Success message')).toBeInTheDocument()
  })

  it('dismisses all toasts when dismissAll called', async () => {
    const user = userEvent.setup()
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    )

    await user.click(screen.getByText('Show Info'))
    await user.click(screen.getByText('Show Success'))

    expect(screen.getByText('Info message')).toBeInTheDocument()
    expect(screen.getByText('Success message')).toBeInTheDocument()

    await user.click(screen.getByText('Dismiss All'))

    expect(screen.queryByText('Info message')).not.toBeInTheDocument()
    expect(screen.queryByText('Success message')).not.toBeInTheDocument()
  })
})
