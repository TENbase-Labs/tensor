import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  describe('Basic rendering', () => {
    it('renders an input field', () => {
      render(<Input placeholder="Enter text" />)
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })

    it('renders with label', () => {
      render(<Input label="Email Address" />)
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    })

    it('shows required indicator when required', () => {
      render(<Input label="Email" required />)
      const label = screen.getByText(/Email/)
      expect(label.textContent).toContain('*')
    })

    it('renders helper text', () => {
      render(<Input helperText="Enter your email address" />)
      expect(screen.getByText('Enter your email address')).toBeInTheDocument()
    })
  })

  describe('Error state', () => {
    it('displays error message when error is true', () => {
      render(<Input error errorMessage="This field is required" />)
      expect(screen.getByRole('alert')).toHaveTextContent('This field is required')
    })

    it('sets aria-invalid when error is true', () => {
      render(<Input error errorMessage="Invalid input" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    it('hides helper text when error message is shown', () => {
      render(<Input helperText="Helper text" error errorMessage="Error message" />)
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument()
      expect(screen.getByText('Error message')).toBeInTheDocument()
    })
  })

  describe('Input types', () => {
    it('renders text input by default', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
    })

    it('renders email input when type="email"', () => {
      render(<Input type="email" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('type', 'email')
    })

    it('renders password input when type="password"', () => {
      render(<Input type="password" />)
      const input = document.querySelector('input[type="password"]')
      expect(input).toBeInTheDocument()
    })

    it('renders number input when type="number"', () => {
      render(<Input type="number" />)
      const input = screen.getByRole('spinbutton')
      expect(input).toHaveAttribute('type', 'number')
    })
  })

  describe('Password visibility toggle', () => {
    it('shows password toggle button for password input', () => {
      render(<Input type="password" />)
      expect(screen.getByLabelText('Show password')).toBeInTheDocument()
    })

    it('does not show toggle button for non-password inputs', () => {
      render(<Input type="text" />)
      expect(screen.queryByLabelText('Show password')).not.toBeInTheDocument()
    })

    it('toggles password visibility when button is clicked', async () => {
      const user = userEvent.setup()
      render(<Input type="password" defaultValue="secret123" />)

      const input = document.querySelector('input') as HTMLInputElement
      const toggleButton = screen.getByLabelText('Show password')

      // Initially hidden
      expect(input).toHaveAttribute('type', 'password')

      // Click to show
      await user.click(toggleButton)
      expect(input).toHaveAttribute('type', 'text')
      expect(screen.getByLabelText('Hide password')).toBeInTheDocument()

      // Click to hide again
      await user.click(screen.getByLabelText('Hide password'))
      expect(input).toHaveAttribute('type', 'password')
    })
  })

  describe('Sizes', () => {
    it('applies small size classes', () => {
      render(<Input size="sm" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('h-9', 'px-2', 'text-sm')
    })

    it('applies medium size classes by default', () => {
      render(<Input />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('h-11', 'px-4', 'text-base')
    })

    it('applies large size classes', () => {
      render(<Input size="lg" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('h-14', 'px-6', 'text-lg')
    })
  })

  describe('Icons and adornments', () => {
    it('renders leading icon', () => {
      render(<Input leadingIcon={<span data-testid="leading-icon">🔍</span>} />)
      expect(screen.getByTestId('leading-icon')).toBeInTheDocument()
    })

    it('renders trailing icon', () => {
      render(<Input trailingIcon={<span data-testid="trailing-icon">✓</span>} />)
      expect(screen.getByTestId('trailing-icon')).toBeInTheDocument()
    })

    it('renders prefix text', () => {
      render(<Input prefix="$" />)
      expect(screen.getByText('$')).toBeInTheDocument()
    })

    it('renders suffix text', () => {
      render(<Input suffix="kg" />)
      expect(screen.getByText('kg')).toBeInTheDocument()
    })
  })

  describe('State management', () => {
    it('calls onChange when user types', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Input onChange={handleChange} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'test')

      expect(handleChange).toHaveBeenCalledTimes(4) // One call per character
    })

    it('calls onFocus when input is focused', async () => {
      const user = userEvent.setup()
      const handleFocus = vi.fn()
      render(<Input onFocus={handleFocus} />)

      await user.click(screen.getByRole('textbox'))
      expect(handleFocus).toHaveBeenCalledOnce()
    })

    it('calls onBlur when input loses focus', async () => {
      const user = userEvent.setup()
      const handleBlur = vi.fn()
      render(<Input onBlur={handleBlur} />)

      const input = screen.getByRole('textbox')
      await user.click(input)
      await user.tab()

      expect(handleBlur).toHaveBeenCalledOnce()
    })
  })

  describe('Disabled and readonly states', () => {
    it('is not interactive when disabled', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Input disabled onChange={handleChange} />)

      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()

      await user.type(input, 'test')
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('applies readonly attribute', () => {
      render(<Input readOnly />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('readonly')
    })
  })

  describe('Accessibility', () => {
    it('links label to input with htmlFor/id', () => {
      render(<Input label="Username" id="username-input" />)
      const input = screen.getByLabelText('Username')
      expect(input).toHaveAttribute('id', 'username-input')
    })

    it('sets aria-required when required', () => {
      render(<Input required />)
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true')
    })

    it('links helper text with aria-describedby', () => {
      render(<Input helperText="Helper text" id="test-input" />)
      const input = screen.getByRole('textbox')
      const ariaDescribedby = input.getAttribute('aria-describedby')
      expect(ariaDescribedby).toContain('test-input-helper')
    })

    it('links error message with aria-describedby', () => {
      render(<Input error errorMessage="Error message" id="test-input" />)
      const input = screen.getByRole('textbox')
      const ariaDescribedby = input.getAttribute('aria-describedby')
      expect(ariaDescribedby).toContain('test-input-error')
    })

    it('uses role="alert" for error messages', () => {
      render(<Input error errorMessage="Error message" />)
      expect(screen.getByRole('alert')).toHaveTextContent('Error message')
    })
  })

  describe('Keyboard navigation', () => {
    it('is focusable with Tab key', async () => {
      const user = userEvent.setup()
      render(<Input />)

      await user.tab()
      expect(screen.getByRole('textbox')).toHaveFocus()
    })

    it('accepts text input via keyboard', async () => {
      const user = userEvent.setup()
      render(<Input />)

      const input = screen.getByRole('textbox')
      await user.click(input)
      await user.keyboard('test input')

      expect(input).toHaveValue('test input')
    })
  })

  describe('Ref forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = vi.fn()
      render(<Input ref={ref} />)
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement))
    })
  })
})
