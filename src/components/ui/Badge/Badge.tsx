import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

/**
 * Badge variant styles using class-variance-authority
 * Maps to TENsor design system token architecture
 */
const badgeVariants = cva(
  ['inline-flex items-center gap-1', 'rounded-full', 'font-medium', 'transition-colors'].join(' '),
  {
    variants: {
      variant: {
        neutral: ['bg-[var(--colors-neutral-100)]', 'text-[var(--colors-neutral-700)]'].join(' '),
        info: ['bg-[var(--colors-info)]/10', 'text-[var(--colors-info)]'].join(' '),
        success: ['bg-[var(--colors-success)]/10', 'text-[var(--colors-success-icon)]'].join(' '),
        warning: ['bg-[var(--colors-warning)]/10', 'text-[var(--colors-warning-icon)]'].join(' '),
        danger: ['bg-[var(--colors-danger)]/10', 'text-[var(--colors-danger)]'].join(' '),
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  },
)

const dotVariants = cva(['rounded-full'], {
  variants: {
    variant: {
      neutral: 'bg-[var(--colors-neutral-500)]',
      info: 'bg-[var(--colors-info)]',
      success: 'bg-[var(--colors-success)]',
      warning: 'bg-[var(--colors-warning)]',
      danger: 'bg-[var(--colors-danger)]',
    },
    size: {
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-2.5 w-2.5',
    },
  },
  defaultVariants: {
    variant: 'neutral',
    size: 'md',
  },
})

const CloseIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="h-3 w-3"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Badge content
   */
  children: ReactNode
  /**
   * Show dot indicator
   */
  dot?: boolean
  /**
   * Leading icon
   */
  icon?: ReactNode
  /**
   * Enable remove button
   */
  removable?: boolean
  /**
   * Callback when remove button is clicked
   */
  onRemove?: () => void
}

/**
 * Badge component - status and category labels
 *
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="info" dot>New</Badge>
 * <Badge removable onRemove={() => console.log('removed')}>
 *   Removable
 * </Badge>
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { variant, size, children, dot, icon, removable, onRemove, className, ...props },
    forwardedRef,
  ) => {
    return (
      <span ref={forwardedRef} className={badgeVariants({ variant, size, className })} {...props}>
        {dot && <span className={dotVariants({ variant, size })} />}
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {removable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRemove?.()
            }}
            className="shrink-0 rounded-sm opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--colors-primary)]"
            aria-label="Remove badge"
          >
            <CloseIcon />
          </button>
        )}
      </span>
    )
  },
)

Badge.displayName = 'Badge'
