import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Switch } from './Switch'

describe('Switch', () => {
  describe('Basic rendering', () => {
    it('renders a switch', () => {
      render(<Switch />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
    })

    it('renders with label', () => {
      render(<Switch label="Enable notifications" />)
      expect(screen.getByLabelText('Enable notifications')).toBeInTheDocument()
    })

    it('renders description text', () => {
      render(<Switch description="This is a description" />)
      expect(screen.getByText('This is a description')).toBeInTheDocument()
    })
  })

  describe('Checked state', () => {
    it('is unchecked by default', () => {
      render(<Switch />)
      expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'unchecked')
    })

    it('can be checked by default', () => {
      render(<Switch defaultChecked />)
      expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked')
    })

    it('respects controlled checked prop', () => {
      const { rerender } = render(<Switch checked={false} onCheckedChange={() => {}} />)
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')

      rerender(<Switch checked={true} onCheckedChange={() => {}} />)
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
    })
  })

  describe('Interaction', () => {
    it('calls onCheckedChange when clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Switch onCheckedChange={handleChange} />)

      await user.click(screen.getByRole('switch'))
      expect(handleChange).toHaveBeenCalledWith(true)
    })

    it('calls onCheckedChange when label is clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Switch label="Click me" onCheckedChange={handleChange} />)

      await user.click(screen.getByText('Click me'))
      expect(handleChange).toHaveBeenCalledWith(true)
    })

    it('toggles on Space key press', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Switch onCheckedChange={handleChange} />)

      const switchElement = screen.getByRole('switch')
      switchElement.focus()
      await user.keyboard(' ')

      expect(handleChange).toHaveBeenCalledWith(true)
    })
  })

  describe('Loading state', () => {
    it('shows loading spinner when loading', () => {
      render(<Switch loading />)
      expect(screen.getByTitle('Loading')).toBeInTheDocument()
    })

    it('sets aria-busy when loading', () => {
      render(<Switch loading />)
      expect(screen.getByRole('switch')).toHaveAttribute('aria-busy', 'true')
    })

    it('is disabled when loading', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Switch loading onCheckedChange={handleChange} />)

      const switchElement = screen.getByRole('switch')
      expect(switchElement).toBeDisabled()

      await user.click(switchElement)
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('On/Off labels', () => {
    it('renders onLabel when provided', () => {
      render(<Switch onLabel="ON" />)
      expect(screen.getByText('ON')).toBeInTheDocument()
    })

    it('renders offLabel when provided', () => {
      render(<Switch offLabel="OFF" />)
      expect(screen.getByText('OFF')).toBeInTheDocument()
    })

    it('renders both onLabel and offLabel', () => {
      render(<Switch onLabel="ON" offLabel="OFF" />)
      expect(screen.getByText('ON')).toBeInTheDocument()
      expect(screen.getByText('OFF')).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    it('applies small size classes', () => {
      render(<Switch size="sm" />)
      const switchElement = screen.getByRole('switch')
      expect(switchElement).toHaveClass('h-[18px]', 'w-8')
    })

    it('applies medium size classes by default', () => {
      render(<Switch />)
      const switchElement = screen.getByRole('switch')
      expect(switchElement).toHaveClass('h-6', 'w-11')
    })

    it('applies large size classes', () => {
      render(<Switch size="lg" />)
      const switchElement = screen.getByRole('switch')
      expect(switchElement).toHaveClass('h-8', 'w-14')
    })
  })

  describe('Disabled state', () => {
    it('is not interactive when disabled', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Switch disabled onCheckedChange={handleChange} />)

      const switchElement = screen.getByRole('switch')
      expect(switchElement).toBeDisabled()

      await user.click(switchElement)
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('applies disabled styles', () => {
      render(<Switch disabled />)
      const switchElement = screen.getByRole('switch')
      expect(switchElement).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
    })
  })

  describe('Accessibility', () => {
    it('links label to switch with htmlFor/id', () => {
      render(<Switch label="Notifications" id="notifications-switch" />)
      const switchElement = screen.getByLabelText('Notifications')
      expect(switchElement).toHaveAttribute('id', 'notifications-switch')
    })

    it('links description with aria-describedby', () => {
      render(<Switch description="Description text" id="test-switch" />)
      const switchElement = screen.getByRole('switch')
      const ariaDescribedby = switchElement.getAttribute('aria-describedby')
      expect(ariaDescribedby).toContain('test-switch-description')
    })

    it('has role="switch"', () => {
      render(<Switch />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
    })

    it('sets aria-checked based on state', () => {
      const { rerender } = render(<Switch checked={false} onCheckedChange={() => {}} />)
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')

      rerender(<Switch checked={true} onCheckedChange={() => {}} />)
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
    })
  })

  describe('Keyboard navigation', () => {
    it('is focusable with Tab key', async () => {
      const user = userEvent.setup()
      render(<Switch />)

      await user.tab()
      expect(screen.getByRole('switch')).toHaveFocus()
    })
  })

  describe('Ref forwarding', () => {
    it('forwards ref to switch element', () => {
      const ref = vi.fn()
      render(<Switch ref={ref} />)
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
    })
  })
})
