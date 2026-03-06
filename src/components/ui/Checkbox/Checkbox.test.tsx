import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  describe('Basic rendering', () => {
    it('renders a checkbox', () => {
      render(<Checkbox />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('renders with label', () => {
      render(<Checkbox label="I agree to terms" />)
      expect(screen.getByLabelText('I agree to terms')).toBeInTheDocument()
    })

    it('shows required indicator when required', () => {
      render(<Checkbox label="Accept" required />)
      const label = screen.getByText(/Accept/)
      expect(label.textContent).toContain('*')
    })

    it('renders description text', () => {
      render(<Checkbox description="This is a description" />)
      expect(screen.getByText('This is a description')).toBeInTheDocument()
    })
  })

  describe('Checked state', () => {
    it('is unchecked by default', () => {
      render(<Checkbox />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'unchecked')
    })

    it('can be checked by default', () => {
      render(<Checkbox defaultChecked />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'checked')
    })

    it('respects controlled checked prop', () => {
      const { rerender } = render(<Checkbox checked={false} onCheckedChange={() => {}} />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false')

      rerender(<Checkbox checked={true} onCheckedChange={() => {}} />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
    })
  })

  describe('Interaction', () => {
    it('calls onCheckedChange when clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Checkbox onCheckedChange={handleChange} />)

      await user.click(screen.getByRole('checkbox'))
      expect(handleChange).toHaveBeenCalledWith(true)
    })

    it('calls onCheckedChange when label is clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Checkbox label="Click me" onCheckedChange={handleChange} />)

      await user.click(screen.getByText('Click me'))
      expect(handleChange).toHaveBeenCalledWith(true)
    })

    it('toggles on Space key press', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Checkbox onCheckedChange={handleChange} />)

      const checkbox = screen.getByRole('checkbox')
      checkbox.focus()
      await user.keyboard(' ')

      expect(handleChange).toHaveBeenCalledWith(true)
    })
  })

  describe('Indeterminate state', () => {
    it('sets aria-checked to mixed when indeterminate', () => {
      render(<Checkbox indeterminate />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveAttribute('aria-checked', 'mixed')
    })

    it('shows indeterminate icon when indeterminate', () => {
      render(<Checkbox indeterminate checked />)
      const svg = screen.getByTitle('Indeterminate')
      expect(svg).toBeInTheDocument()
    })
  })

  describe('Error state', () => {
    it('displays error message when error is true', () => {
      render(<Checkbox error errorMessage="This field is required" />)
      expect(screen.getByRole('alert')).toHaveTextContent('This field is required')
    })

    it('sets aria-invalid when error is true', () => {
      render(<Checkbox error errorMessage="Invalid" />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveAttribute('aria-invalid', 'true')
    })
  })

  describe('Sizes', () => {
    it('applies small size classes', () => {
      render(<Checkbox size="sm" />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveClass('h-4', 'w-4')
    })

    it('applies medium size classes by default', () => {
      render(<Checkbox />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveClass('h-5', 'w-5')
    })

    it('applies large size classes', () => {
      render(<Checkbox size="lg" />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveClass('h-6', 'w-6')
    })
  })

  describe('Disabled state', () => {
    it('is not interactive when disabled', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Checkbox disabled onCheckedChange={handleChange} />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeDisabled()

      await user.click(checkbox)
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('applies disabled styles', () => {
      render(<Checkbox disabled />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
    })
  })

  describe('Accessibility', () => {
    it('links label to checkbox with htmlFor/id', () => {
      render(<Checkbox label="Terms" id="terms-checkbox" />)
      const checkbox = screen.getByLabelText('Terms')
      expect(checkbox).toHaveAttribute('id', 'terms-checkbox')
    })

    it('sets aria-required when required', () => {
      render(<Checkbox required />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-required', 'true')
    })

    it('links description with aria-describedby', () => {
      render(<Checkbox description="Description text" id="test-checkbox" />)
      const checkbox = screen.getByRole('checkbox')
      const ariaDescribedby = checkbox.getAttribute('aria-describedby')
      expect(ariaDescribedby).toContain('test-checkbox-description')
    })

    it('links error message with aria-describedby', () => {
      render(<Checkbox error errorMessage="Error message" id="test-checkbox" />)
      const checkbox = screen.getByRole('checkbox')
      const ariaDescribedby = checkbox.getAttribute('aria-describedby')
      expect(ariaDescribedby).toContain('test-checkbox-error')
    })

    it('uses role="alert" for error messages', () => {
      render(<Checkbox error errorMessage="Error message" />)
      expect(screen.getByRole('alert')).toHaveTextContent('Error message')
    })
  })

  describe('Keyboard navigation', () => {
    it('is focusable with Tab key', async () => {
      const user = userEvent.setup()
      render(<Checkbox />)

      await user.tab()
      expect(screen.getByRole('checkbox')).toHaveFocus()
    })
  })

  describe('Ref forwarding', () => {
    it('forwards ref to checkbox element', () => {
      const ref = vi.fn()
      render(<Checkbox ref={ref} />)
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
    })
  })
})
