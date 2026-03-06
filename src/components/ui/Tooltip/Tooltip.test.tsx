import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  describe('Basic rendering', () => {
    it('renders trigger element', () => {
      render(
        <Tooltip content="Tooltip content">
          <button type="button">Hover me</button>
        </Tooltip>,
      )
      expect(screen.getByText('Hover me')).toBeInTheDocument()
    })

    it('trigger is interactive', () => {
      render(
        <Tooltip content="Tooltip content">
          <button type="button">Click me</button>
        </Tooltip>,
      )
      const button = screen.getByText('Click me')
      expect(button).toBeEnabled()
    })
  })

  describe('Trigger types', () => {
    it('works with button trigger', () => {
      render(
        <Tooltip content="Button tooltip">
          <button type="button">Button</button>
        </Tooltip>,
      )
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('works with link trigger', () => {
      render(
        <Tooltip content="Link tooltip">
          <a href="#test">Link</a>
        </Tooltip>,
      )
      expect(screen.getByRole('link')).toBeInTheDocument()
    })

    it('works with span trigger', () => {
      render(
        <Tooltip content="Span tooltip">
          <span>Hover text</span>
        </Tooltip>,
      )
      expect(screen.getByText('Hover text')).toBeInTheDocument()
    })

    it('works with icon trigger', () => {
      render(
        <Tooltip content="Icon tooltip">
          <button type="button" aria-label="Help">
            ?
          </button>
        </Tooltip>,
      )
      expect(screen.getByLabelText('Help')).toBeInTheDocument()
    })
  })

  describe('Content types', () => {
    it('renders text content', () => {
      render(
        <Tooltip content="Simple text">
          <button type="button">Trigger</button>
        </Tooltip>,
      )
      expect(screen.getByText('Trigger')).toBeInTheDocument()
    })

    it('renders ReactNode content', () => {
      render(
        <Tooltip
          content={
            <div>
              <strong>Bold</strong> text
            </div>
          }
        >
          <button type="button">Trigger</button>
        </Tooltip>,
      )
      expect(screen.getByText('Trigger')).toBeInTheDocument()
    })
  })

  describe('Props', () => {
    it('accepts delayDuration prop', () => {
      render(
        <Tooltip content="Delayed tooltip" delayDuration={500}>
          <button type="button">Delayed</button>
        </Tooltip>,
      )
      expect(screen.getByText('Delayed')).toBeInTheDocument()
    })

    it('accepts side prop', () => {
      render(
        <Tooltip content="Top tooltip" side="top">
          <button type="button">Top</button>
        </Tooltip>,
      )
      expect(screen.getByText('Top')).toBeInTheDocument()
    })

    it('accepts sideOffset prop', () => {
      render(
        <Tooltip content="Offset tooltip" sideOffset={10}>
          <button type="button">Offset</button>
        </Tooltip>,
      )
      expect(screen.getByText('Offset')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('trigger is focusable', () => {
      render(
        <Tooltip content="Accessible tooltip">
          <button type="button">Focus me</button>
        </Tooltip>,
      )
      const trigger = screen.getByText('Focus me')
      trigger.focus()
      expect(trigger).toHaveFocus()
    })

    it('works with aria-label on trigger', () => {
      render(
        <Tooltip content="Help information">
          <button type="button" aria-label="Get help">
            ?
          </button>
        </Tooltip>,
      )
      expect(screen.getByLabelText('Get help')).toBeInTheDocument()
    })
  })

  describe('Multiple tooltips', () => {
    it('renders multiple independent tooltips', () => {
      render(
        <div>
          <Tooltip content="First tooltip">
            <button type="button">First</button>
          </Tooltip>
          <Tooltip content="Second tooltip">
            <button type="button">Second</button>
          </Tooltip>
        </div>,
      )
      expect(screen.getByText('First')).toBeInTheDocument()
      expect(screen.getByText('Second')).toBeInTheDocument()
    })
  })

  describe('Trigger interactions', () => {
    it('trigger can be clicked', async () => {
      const user = userEvent.setup()
      let clicked = false

      render(
        <Tooltip content="Click tooltip">
          <button type="button" onClick={() => (clicked = true)}>
            Click me
          </button>
        </Tooltip>,
      )

      await user.click(screen.getByText('Click me'))
      expect(clicked).toBe(true)
    })
  })
})
