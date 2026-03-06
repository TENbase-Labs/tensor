import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { RadioGroup } from './Radio'

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

describe('RadioGroup', () => {
  describe('Basic rendering', () => {
    it('renders a radio group', () => {
      render(<RadioGroup options={defaultOptions} />)
      expect(screen.getByRole('radiogroup')).toBeInTheDocument()
    })

    it('renders all radio options', () => {
      render(<RadioGroup options={defaultOptions} />)
      expect(screen.getByLabelText('Option 1')).toBeInTheDocument()
      expect(screen.getByLabelText('Option 2')).toBeInTheDocument()
      expect(screen.getByLabelText('Option 3')).toBeInTheDocument()
    })

    it('renders with group label', () => {
      render(<RadioGroup label="Choose option" options={defaultOptions} />)
      expect(screen.getByText('Choose option')).toBeInTheDocument()
    })

    it('shows required indicator when required', () => {
      render(<RadioGroup label="Choose" required options={defaultOptions} />)
      const label = screen.getByText(/Choose/)
      expect(label.textContent).toContain('*')
    })

    it('renders helper text', () => {
      render(<RadioGroup helperText="Select one option" options={defaultOptions} />)
      expect(screen.getByText('Select one option')).toBeInTheDocument()
    })

    it('renders option descriptions', () => {
      const optionsWithDesc = [
        { value: '1', label: 'Option 1', description: 'First option description' },
        { value: '2', label: 'Option 2', description: 'Second option description' },
      ]
      render(<RadioGroup options={optionsWithDesc} />)
      expect(screen.getByText('First option description')).toBeInTheDocument()
      expect(screen.getByText('Second option description')).toBeInTheDocument()
    })
  })

  describe('Selection behavior', () => {
    it('no option is selected by default', () => {
      render(<RadioGroup options={defaultOptions} />)
      const radios = screen.getAllByRole('radio')
      radios.forEach((radio) => {
        expect(radio).toHaveAttribute('data-state', 'unchecked')
      })
    })

    it('respects defaultValue', () => {
      render(<RadioGroup defaultValue="option2" options={defaultOptions} />)
      const radio2 = screen.getByLabelText('Option 2')
      expect(radio2).toHaveAttribute('data-state', 'checked')
    })

    it('respects controlled value prop', () => {
      const { rerender } = render(
        <RadioGroup value="option1" onValueChange={() => {}} options={defaultOptions} />,
      )
      expect(screen.getByLabelText('Option 1')).toHaveAttribute('data-state', 'checked')

      rerender(<RadioGroup value="option3" onValueChange={() => {}} options={defaultOptions} />)
      expect(screen.getByLabelText('Option 3')).toHaveAttribute('data-state', 'checked')
      expect(screen.getByLabelText('Option 1')).toHaveAttribute('data-state', 'unchecked')
    })
  })

  describe('Interaction', () => {
    it('calls onValueChange when option is clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<RadioGroup onValueChange={handleChange} options={defaultOptions} />)

      await user.click(screen.getByLabelText('Option 2'))
      expect(handleChange).toHaveBeenCalledWith('option2')
    })

    it('calls onValueChange when label is clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<RadioGroup onValueChange={handleChange} options={defaultOptions} />)

      await user.click(screen.getByText('Option 1'))
      expect(handleChange).toHaveBeenCalledWith('option1')
    })

    it('changes selection when different option is clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(
        <RadioGroup defaultValue="option1" onValueChange={handleChange} options={defaultOptions} />,
      )

      await user.click(screen.getByLabelText('Option 3'))
      expect(handleChange).toHaveBeenCalledWith('option3')
    })

    it('toggles on Space key press', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<RadioGroup onValueChange={handleChange} options={defaultOptions} />)

      const radio = screen.getByLabelText('Option 1')
      radio.focus()
      await user.keyboard(' ')

      expect(handleChange).toHaveBeenCalledWith('option1')
    })
  })

  describe('Error state', () => {
    it('displays error message when error is true', () => {
      render(<RadioGroup error errorMessage="Please select an option" options={defaultOptions} />)
      expect(screen.getByRole('alert')).toHaveTextContent('Please select an option')
    })

    it('sets aria-invalid when error is true', () => {
      render(<RadioGroup error errorMessage="Invalid" options={defaultOptions} />)
      const group = screen.getByRole('radiogroup')
      expect(group).toHaveAttribute('aria-invalid', 'true')
    })

    it('hides helper text when error message is shown', () => {
      render(
        <RadioGroup
          helperText="Helper text"
          error
          errorMessage="Error message"
          options={defaultOptions}
        />,
      )
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument()
      expect(screen.getByText('Error message')).toBeInTheDocument()
    })
  })

  describe('Orientation', () => {
    it('renders vertically by default', () => {
      render(<RadioGroup options={defaultOptions} />)
      const group = screen.getByRole('radiogroup')
      expect(group).toHaveClass('flex-col')
    })

    it('renders horizontally when orientation="horizontal"', () => {
      render(<RadioGroup orientation="horizontal" options={defaultOptions} />)
      const group = screen.getByRole('radiogroup')
      expect(group).toHaveClass('flex-wrap')
    })
  })

  describe('Sizes', () => {
    it('applies small size classes', () => {
      render(<RadioGroup size="sm" options={defaultOptions} />)
      const radios = screen.getAllByRole('radio')
      radios.forEach((radio) => {
        expect(radio).toHaveClass('h-4', 'w-4')
      })
    })

    it('applies medium size classes by default', () => {
      render(<RadioGroup options={defaultOptions} />)
      const radios = screen.getAllByRole('radio')
      radios.forEach((radio) => {
        expect(radio).toHaveClass('h-5', 'w-5')
      })
    })

    it('applies large size classes', () => {
      render(<RadioGroup size="lg" options={defaultOptions} />)
      const radios = screen.getAllByRole('radio')
      radios.forEach((radio) => {
        expect(radio).toHaveClass('h-6', 'w-6')
      })
    })
  })

  describe('Disabled state', () => {
    it('disables all options when disabled prop is true', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<RadioGroup disabled onValueChange={handleChange} options={defaultOptions} />)

      const radios = screen.getAllByRole('radio')
      radios.forEach((radio) => {
        expect(radio).toBeDisabled()
      })

      await user.click(screen.getByLabelText('Option 1'))
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('disables individual options when option.disabled is true', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      const options = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2', disabled: true },
        { value: '3', label: 'Option 3' },
      ]
      render(<RadioGroup onValueChange={handleChange} options={options} />)

      const radio2 = screen.getByLabelText('Option 2')
      expect(radio2).toBeDisabled()

      await user.click(radio2)
      expect(handleChange).not.toHaveBeenCalled()

      // Other options should still work
      await user.click(screen.getByLabelText('Option 1'))
      expect(handleChange).toHaveBeenCalledWith('1')
    })
  })

  describe('Accessibility', () => {
    it('uses fieldset and legend for group structure', () => {
      render(<RadioGroup label="Choose option" options={defaultOptions} />)
      const fieldset = screen.getByRole('group')
      expect(fieldset).toBeInTheDocument()
      expect(fieldset.tagName).toBe('FIELDSET')
    })

    it('links legend to radiogroup with aria-labelledby', () => {
      render(<RadioGroup label="Choose option" id="test-group" options={defaultOptions} />)
      const group = screen.getByRole('radiogroup')
      const ariaLabelledby = group.getAttribute('aria-labelledby')
      expect(ariaLabelledby).toContain('test-group-legend')
    })

    it('links helper text with aria-describedby', () => {
      render(<RadioGroup helperText="Helper text" id="test-group" options={defaultOptions} />)
      const group = screen.getByRole('radiogroup')
      const ariaDescribedby = group.getAttribute('aria-describedby')
      expect(ariaDescribedby).toContain('test-group-helper')
    })

    it('links error message with aria-describedby', () => {
      render(
        <RadioGroup error errorMessage="Error message" id="test-group" options={defaultOptions} />,
      )
      const group = screen.getByRole('radiogroup')
      const ariaDescribedby = group.getAttribute('aria-describedby')
      expect(ariaDescribedby).toContain('test-group-error')
    })

    it('links option descriptions with aria-describedby', () => {
      const options = [{ value: '1', label: 'Option 1', description: 'Description' }]
      render(<RadioGroup id="test-group" options={options} />)
      const radio = screen.getByLabelText('Option 1')
      const ariaDescribedby = radio.getAttribute('aria-describedby')
      expect(ariaDescribedby).toBeTruthy()
    })

    it('uses role="alert" for error messages', () => {
      render(<RadioGroup error errorMessage="Error message" options={defaultOptions} />)
      expect(screen.getByRole('alert')).toHaveTextContent('Error message')
    })
  })

  describe('Keyboard navigation', () => {
    it('is focusable with Tab key', async () => {
      const user = userEvent.setup()
      render(<RadioGroup options={defaultOptions} />)

      await user.tab()
      const firstRadio = screen.getByLabelText('Option 1')
      expect(firstRadio).toHaveFocus()
    })
  })

  describe('Ref forwarding', () => {
    it('forwards ref to radiogroup element', () => {
      const ref = vi.fn()
      render(<RadioGroup ref={ref} options={defaultOptions} />)
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
    })
  })
})
