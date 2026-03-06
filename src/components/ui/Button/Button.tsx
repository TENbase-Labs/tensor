import { cva, type VariantProps } from 'class-variance-authority'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

/**
 * Button variant styles using class-variance-authority
 * Maps to TENsor design system token architecture
 */
const buttonVariants = cva(
  // Base styles - applied to all buttons
  [
    'inline-flex items-center justify-center',
    'font-medium transition-colors',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-[0.98]',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--colors-primary)] text-[var(--colors-text-inverse)]',
          'hover:opacity-90',
          'focus-visible:outline-[var(--colors-primary)]',
        ].join(' '),
        secondary: [
          'bg-[var(--colors-neutral-100)] text-[var(--colors-text-primary)]',
          'border border-[var(--colors-neutral-300)]',
          'hover:bg-[var(--colors-neutral-200)]',
          'focus-visible:outline-[var(--colors-neutral-500)]',
        ].join(' '),
        danger: [
          'bg-[var(--colors-danger)] text-[var(--colors-text-inverse)]',
          'hover:opacity-90',
          'focus-visible:outline-[var(--colors-danger)]',
        ].join(' '),
        ghost: [
          'bg-transparent text-[var(--colors-text-primary)]',
          'hover:bg-[var(--colors-neutral-100)]',
          'focus-visible:outline-[var(--colors-neutral-500)]',
        ].join(' '),
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-md',
        md: 'h-11 px-6 text-base rounded-md',
        lg: 'h-14 px-8 text-lg rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Button content (text, icon, or both)
   */
  children: React.ReactNode
  /**
   * Loading state - shows spinner and disables interaction
   */
  loading?: boolean
  /**
   * Accessible label - required for icon-only buttons
   */
  'aria-label'?: string
}

/**
 * Button component - triggers actions and events
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Save Changes
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
