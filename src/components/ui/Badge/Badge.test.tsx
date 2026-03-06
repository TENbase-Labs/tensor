import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Badge } from './Badge'

describe('Badge', () => {
	describe('Basic rendering', () => {
		it('renders badge content', () => {
			render(<Badge>Test Badge</Badge>)
			expect(screen.getByText('Test Badge')).toBeInTheDocument()
		})

		it('applies neutral variant by default', () => {
			render(<Badge>Default</Badge>)
			const badge = screen.getByText('Default').parentElement
			expect(badge).toHaveClass('bg-[var(--colors-neutral-100)]')
		})

		it('applies medium size by default', () => {
			render(<Badge>Default</Badge>)
			const badge = screen.getByText('Default').parentElement
			expect(badge).toHaveClass('px-2.5', 'py-1', 'text-sm')
		})
	})

	describe('Variants', () => {
		it('renders info variant', () => {
			render(<Badge variant="info">Info</Badge>)
			const badge = screen.getByText('Info').parentElement
			expect(badge).toHaveClass('bg-[var(--colors-info)]/10')
		})

		it('renders success variant', () => {
			render(<Badge variant="success">Success</Badge>)
			const badge = screen.getByText('Success').parentElement
			expect(badge).toHaveClass('bg-[var(--colors-success)]/10')
		})

		it('renders warning variant', () => {
			render(<Badge variant="warning">Warning</Badge>)
			const badge = screen.getByText('Warning').parentElement
			expect(badge).toHaveClass('bg-[var(--colors-warning)]/10')
		})

		it('renders danger variant', () => {
			render(<Badge variant="danger">Danger</Badge>)
			const badge = screen.getByText('Danger').parentElement
			expect(badge).toHaveClass('bg-[var(--colors-danger)]/10')
		})
	})

	describe('Sizes', () => {
		it('renders small size', () => {
			render(<Badge size="sm">Small</Badge>)
			const badge = screen.getByText('Small').parentElement
			expect(badge).toHaveClass('px-2', 'py-0.5', 'text-xs')
		})

		it('renders large size', () => {
			render(<Badge size="lg">Large</Badge>)
			const badge = screen.getByText('Large').parentElement
			expect(badge).toHaveClass('px-3', 'py-1.5', 'text-base')
		})
	})

	describe('Dot indicator', () => {
		it('shows dot when dot prop is true', () => {
			const { container } = render(<Badge dot>With Dot</Badge>)
			const dot = container.querySelector('span > span:first-child')
			expect(dot).toHaveClass('rounded-full')
		})

		it('does not show dot by default', () => {
			const { container } = render(<Badge>Without Dot</Badge>)
			const badge = screen.getByText('Without Dot')
			const dot = badge.querySelector('span.rounded-full')
			expect(dot).not.toBeInTheDocument()
		})
	})

	describe('Icons', () => {
		it('renders icon when icon prop is provided', () => {
			const Icon = () => <span data-testid="icon">🔔</span>
			render(<Badge icon={<Icon />}>With Icon</Badge>)
			expect(screen.getByTestId('icon')).toBeInTheDocument()
		})
	})

	describe('Removable', () => {
		it('shows remove button when removable is true', () => {
			render(<Badge removable>Removable</Badge>)
			expect(screen.getByLabelText('Remove badge')).toBeInTheDocument()
		})

		it('calls onRemove when remove button is clicked', async () => {
			const user = userEvent.setup()
			const handleRemove = vi.fn()
			render(
				<Badge removable onRemove={handleRemove}>
					Removable
				</Badge>,
			)

			await user.click(screen.getByLabelText('Remove badge'))
			expect(handleRemove).toHaveBeenCalledOnce()
		})

		it('does not show remove button by default', () => {
			render(<Badge>Not Removable</Badge>)
			expect(screen.queryByLabelText('Remove badge')).not.toBeInTheDocument()
		})
	})
})
