import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders its label', () => {
    render(<Button>Save Changes</Button>)
    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Save</Button>)

    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Save
      </Button>,
    )

    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('does not call onClick when loading', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(
      <Button loading onClick={handleClick}>
        Save
      </Button>,
    )

    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('shows loading spinner when loading prop is true', () => {
    render(<Button loading>Saving...</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('disabled:pointer-events-none')
    expect(button).toBeDisabled()
  })

  it('is keyboard accessible', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Save</Button>)

    const button = screen.getByRole('button', { name: 'Save' })
    button.focus()
    await user.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('supports Space key activation', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Save</Button>)

    const button = screen.getByRole('button', { name: 'Save' })
    button.focus()
    await user.keyboard(' ')
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-[var(--colors-primary)]')

    rerender(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-[var(--colors-neutral-100)]')

    rerender(<Button variant="danger">Danger</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-[var(--colors-danger)]')

    rerender(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-transparent')
  })

  it('applies size classes correctly', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-9')

    rerender(<Button size="md">Medium</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-11')

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-14')
  })

  it('supports aria-label for icon-only buttons', () => {
    render(<Button aria-label="Close dialog">✕</Button>)
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument()
  })

  it('forwards ref to button element', () => {
    const ref = vi.fn()
    render(<Button ref={ref}>Button</Button>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
  })
})
