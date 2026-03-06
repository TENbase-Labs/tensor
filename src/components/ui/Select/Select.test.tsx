import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Select } from './Select'

const defaultOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
]

describe('Select', () => {
  describe('Basic rendering', () => {
    it('renders select trigger', () => {
      render(<Select options={defaultOptions} />)
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('renders with label', () => {
      render(<Select label="Fruit" options={defaultOptions} />)
      expect(screen.getByText('Fruit')).toBeInTheDocument()
    })

    it('renders with placeholder', () => {
      render(<Select placeholder="Choose a fruit" options={defaultOptions} />)
      expect(screen.getByText('Choose a fruit')).toBeInTheDocument()
    })

    it('renders with helper text', () => {
      render(<Select helperText="Select your favorite fruit" options={defaultOptions} />)
      expect(screen.getByText('Select your favorite fruit')).toBeInTheDocument()
    })

    it('shows required indicator', () => {
      render(<Select label="Fruit" required options={defaultOptions} />)
      expect(screen.getByText('*')).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    it('applies small size classes', () => {
      render(<Select size="sm" options={defaultOptions} />)
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveClass('h-9', 'px-3', 'text-sm')
    })

    it('applies medium size classes by default', () => {
      render(<Select options={defaultOptions} />)
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveClass('h-11', 'px-4', 'text-base')
    })

    it('applies large size classes', () => {
      render(<Select size="lg" options={defaultOptions} />)
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveClass('h-14', 'px-5', 'text-lg')
    })
  })

  describe('Value display', () => {
    it('displays selected value', () => {
      const { rerender } = render(<Select options={defaultOptions} value="apple" />)
      expect(screen.getByText('Apple')).toBeInTheDocument()

      rerender(<Select options={defaultOptions} value="banana" />)
      expect(screen.getByText('Banana')).toBeInTheDocument()
    })

    it('shows placeholder when no value selected', () => {
      render(<Select placeholder="Choose..." options={defaultOptions} />)
      expect(screen.getByText('Choose...')).toBeInTheDocument()
    })
  })

  describe('Error state', () => {
    it('shows error message when error is true', () => {
      render(<Select error errorMessage="Please select a fruit" options={defaultOptions} />)
      expect(screen.getByText('Please select a fruit')).toBeInTheDocument()
    })

    it('hides helper text when error is shown', () => {
      render(
        <Select
          error
          errorMessage="Error message"
          helperText="Helper text"
          options={defaultOptions}
        />,
      )
      expect(screen.getByText('Error message')).toBeInTheDocument()
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument()
    })

    it('applies error styling to trigger', () => {
      render(<Select error options={defaultOptions} />)
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveClass('border-[var(--colors-danger)]')
    })

    it('sets aria-invalid on error', () => {
      render(<Select error options={defaultOptions} />)
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveAttribute('aria-invalid', 'true')
    })
  })

  describe('Disabled state', () => {
    it('disables trigger when disabled prop is true', () => {
      render(<Select disabled options={defaultOptions} />)
      const trigger = screen.getByRole('combobox')
      expect(trigger).toBeDisabled()
    })

    it('applies disabled styling', () => {
      render(<Select disabled options={defaultOptions} />)
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
    })
  })

  describe('Accessibility', () => {
    it('associates label with select trigger', () => {
      render(<Select label="Fruit Selection" options={defaultOptions} />)
      const trigger = screen.getByRole('combobox')
      const label = screen.getByText('Fruit Selection')
      expect(trigger).toHaveAccessibleName('Fruit Selection')
      expect(label).toHaveAttribute('for', trigger.id)
    })

    it('associates helper text via aria-describedby', () => {
      render(<Select helperText="Helper text" options={defaultOptions} />)
      const trigger = screen.getByRole('combobox')
      const helperText = screen.getByText('Helper text')
      expect(trigger).toHaveAttribute('aria-describedby', helperText.id)
    })

    it('associates error message via aria-describedby', () => {
      render(<Select error errorMessage="Error message" options={defaultOptions} />)
      const trigger = screen.getByRole('combobox')
      const errorMessage = screen.getByText('Error message')
      expect(trigger).toHaveAttribute('aria-describedby', errorMessage.id)
    })

    it('error message has role="alert"', () => {
      render(<Select error errorMessage="Error message" options={defaultOptions} />)
      const errorMessage = screen.getByText('Error message')
      expect(errorMessage).toHaveAttribute('role', 'alert')
    })

    it('required attribute is set when required prop is true', () => {
      render(<Select required options={defaultOptions} />)
      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveAttribute('aria-required', 'true')
    })

    it('trigger has chevron icon', () => {
      render(<Select options={defaultOptions} />)
      const trigger = screen.getByRole('combobox')
      // Check that SVG icon is present
      const icon = trigger.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Controlled vs uncontrolled', () => {
    it('works in controlled mode with value prop', () => {
      const { rerender } = render(
        <Select options={defaultOptions} value="apple" onValueChange={vi.fn()} />,
      )
      expect(screen.getByText('Apple')).toBeInTheDocument()

      rerender(<Select options={defaultOptions} value="banana" onValueChange={vi.fn()} />)
      expect(screen.getByText('Banana')).toBeInTheDocument()
    })

    it('works in uncontrolled mode with defaultValue prop', () => {
      render(<Select options={defaultOptions} defaultValue="orange" />)
      expect(screen.getByText('Orange')).toBeInTheDocument()
    })
  })

  describe('Ref forwarding', () => {
    it('forwards ref to trigger element', () => {
      const ref = vi.fn()
      render(<Select ref={ref} options={defaultOptions} />)
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
    })
  })
})
