import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button, type ButtonProps } from './Button'

describe('Button', () => {
  // ===========================================
  // RENDERING TESTS
  // Test that the component renders correctly with default and custom props
  // ===========================================

  it('renders with required props', () => {
    render(<Button label="Click me" />)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('displays the correct label text', () => {
    render(<Button label="Submit Form" />)
    expect(screen.getByText('Submit Form')).toBeInTheDocument()
  })

  // ===========================================
  // PROP VARIATION TESTS
  // Test all prop combinations and their effects
  // ===========================================

  describe('primary prop', () => {
    it('applies primary class when primary is true', () => {
      render(<Button label="Primary" primary={true} />)
      const button = screen.getByRole('button')
      expect(button.className).toContain('storybook-button--primary')
    })

    it('applies secondary class when primary is false', () => {
      render(<Button label="Secondary" primary={false} />)
      const button = screen.getByRole('button')
      expect(button.className).toContain('storybook-button--secondary')
    })

    it('defaults to secondary when primary is not provided', () => {
      render(<Button label="Default" />)
      const button = screen.getByRole('button')
      expect(button.className).toContain('storybook-button--secondary')
    })
  })

  describe('size prop', () => {
    it('applies small size class', () => {
      render(<Button label="Small" size="small" />)
      const button = screen.getByRole('button')
      expect(button.className).toContain('storybook-button--small')
    })

    it('applies medium size class', () => {
      render(<Button label="Medium" size="medium" />)
      const button = screen.getByRole('button')
      expect(button.className).toContain('storybook-button--medium')
    })

    it('applies large size class', () => {
      render(<Button label="Large" size="large" />)
      const button = screen.getByRole('button')
      expect(button.className).toContain('storybook-button--large')
    })

    it('defaults to medium size when size is not provided', () => {
      render(<Button label="Default Size" />)
      const button = screen.getByRole('button')
      expect(button.className).toContain('storybook-button--medium')
    })
  })

  describe('backgroundColor prop', () => {
    it('applies custom background color via inline style', () => {
      render(<Button label="Custom Color" backgroundColor="#ff0000" />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({ backgroundColor: '#ff0000' })
    })

    it('has no inline background color when prop is not provided', () => {
      render(<Button label="Default Color" />)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({ backgroundColor: '' })
    })
  })

  // ===========================================
  // EVENT HANDLER TESTS
  // Test user interactions and event callbacks
  // ===========================================

  describe('onClick handler', () => {
    it('calls onClick when button is clicked', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button label="Click Handler" onClick={handleClick} />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('calls onClick multiple times on multiple clicks', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button label="Multiple Clicks" onClick={handleClick} />)

      const button = screen.getByRole('button')
      await user.click(button)
      await user.click(button)
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('does not throw when onClick is not provided', async () => {
      const user = userEvent.setup()
      render(<Button label="No Handler" />)

      const button = screen.getByRole('button')
      await expect(user.click(button)).resolves.not.toThrow()
    })
  })

  // ===========================================
  // KEYBOARD NAVIGATION TESTS
  // Test keyboard accessibility (Enter, Space)
  // ===========================================

  describe('keyboard navigation', () => {
    it('triggers onClick when Enter key is pressed', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button label="Enter Key" onClick={handleClick} />)

      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard('{Enter}')

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('triggers onClick when Space key is pressed', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button label="Space Key" onClick={handleClick} />)

      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard(' ')

      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  // ===========================================
  // FOCUS MANAGEMENT TESTS
  // Test focus behavior and tab order
  // ===========================================

  describe('focus management', () => {
    it('is focusable via tab key', async () => {
      const user = userEvent.setup()
      render(<Button label="Focusable" />)

      const button = screen.getByRole('button')
      await user.tab()

      expect(button).toHaveFocus()
    })

    it('can be programmatically focused', () => {
      render(<Button label="Focus Test" />)
      const button = screen.getByRole('button')

      button.focus()

      expect(button).toHaveFocus()
    })
  })

  // ===========================================
  // ACCESSIBILITY TESTS (WCAG AAA)
  // Test ARIA attributes, roles, and semantic HTML
  // ===========================================

  describe('accessibility', () => {
    it('has button role (semantic HTML)', () => {
      render(<Button label="Semantic" />)
      const button = screen.getByRole('button')
      expect(button.tagName).toBe('BUTTON')
    })

    it('has type="button" to prevent form submission', () => {
      render(<Button label="Type Test" />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'button')
    })

    it('has accessible name from label prop', () => {
      render(<Button label="Accessible Name" />)
      const button = screen.getByRole('button', { name: /accessible name/i })
      expect(button).toBeInTheDocument()
    })

    it('is included in tab order (not disabled)', () => {
      render(<Button label="Tab Order" />)
      const button = screen.getByRole('button')
      expect(button).not.toHaveAttribute('disabled')
      expect(button).not.toHaveAttribute('tabIndex', '-1')
    })
  })

  // ===========================================
  // SNAPSHOT TESTS
  // Catch unintended visual changes
  // ===========================================

  describe('snapshots', () => {
    it('matches snapshot for default button', () => {
      const { container } = render(<Button label="Default Snapshot" />)
      expect(container.firstChild).toMatchSnapshot()
    })

    it('matches snapshot for primary button', () => {
      const { container } = render(<Button label="Primary Snapshot" primary={true} />)
      expect(container.firstChild).toMatchSnapshot()
    })

    it('matches snapshot for all size variants', () => {
      const sizes: ButtonProps['size'][] = ['small', 'medium', 'large']
      sizes.forEach((size) => {
        const { container } = render(<Button label={`${size} snapshot`} size={size} />)
        expect(container.firstChild).toMatchSnapshot(`button-${size}`)
      })
    })

    it('matches snapshot with custom background color', () => {
      const { container } = render(
        <Button label="Custom Color Snapshot" backgroundColor="#4CAF50" />,
      )
      expect(container.firstChild).toMatchSnapshot()
    })
  })

  // ===========================================
  // INTEGRATION TESTS
  // Test component behavior in realistic scenarios
  // ===========================================

  describe('integration scenarios', () => {
    it('works in a form context', async () => {
      const user = userEvent.setup()
      const handleSubmit = vi.fn((e) => e.preventDefault())

      render(
        <form onSubmit={handleSubmit}>
          <Button label="Form Submit" />
        </form>,
      )

      const button = screen.getByRole('button')
      await user.click(button)

      // Should NOT submit the form because type="button"
      expect(handleSubmit).not.toHaveBeenCalled()
    })

    it('handles rapid successive clicks', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button label="Rapid Clicks" onClick={handleClick} />)

      const button = screen.getByRole('button')

      // Simulate rapid clicks
      await user.click(button)
      await user.click(button)
      await user.click(button)
      await user.click(button)
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(5)
    })
  })
})
