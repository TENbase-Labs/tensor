import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type HTMLAttributes, useState } from 'react'

/**
 * Alert variant styles using class-variance-authority
 * Maps to TENsor design system token architecture
 */
const alertVariants = cva(
  ['w-full rounded-md border-l-4 transition-opacity duration-200'].join(' '),
  {
    variants: {
      variant: {
        info: [
          'bg-[var(--colors-info)]/10',
          'border-[var(--colors-info)]',
          'text-[var(--colors-text-primary)]',
        ].join(' '),
        success: [
          'bg-[var(--colors-success)]/10',
          'border-[var(--colors-success)]',
          'text-[var(--colors-text-primary)]',
        ].join(' '),
        warning: [
          'bg-[var(--colors-warning)]/10',
          'border-[var(--colors-warning)]',
          'text-[var(--colors-text-primary)]',
        ].join(' '),
        danger: [
          'bg-[var(--colors-danger)]/10',
          'border-[var(--colors-danger)]',
          'text-[var(--colors-text-primary)]',
        ].join(' '),
      },
      size: {
        sm: 'p-4 text-sm',
        md: 'p-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'info',
      size: 'md',
    },
  },
)

const iconColorVariants = cva('shrink-0', {
  variants: {
    variant: {
      info: 'text-[var(--colors-info)]',
      success: 'text-[var(--colors-success-icon)]', // Darker for WCAG AA contrast
      warning: 'text-[var(--colors-warning-icon)]', // Darker for WCAG AA contrast
      danger: 'text-[var(--colors-danger)]',
    },
    size: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
    },
  },
  defaultVariants: {
    variant: 'info',
    size: 'md',
  },
})

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof alertVariants> {
  /**
   * Alert title/heading (optional)
   */
  title?: string
  /**
   * Alert message content
   */
  children: React.ReactNode
  /**
   * Custom icon (overrides default variant icon)
   */
  icon?: React.ReactNode
  /**
   * Show/hide icon (default: true)
   */
  showIcon?: boolean
  /**
   * Enable dismiss button
   */
  dismissible?: boolean
  /**
   * Callback when alert is dismissed
   */
  onDismiss?: () => void
  /**
   * Action buttons (e.g., Undo, View)
   */
  actions?: React.ReactNode
  /**
   * ARIA role (default: 'alert' for danger/warning, 'status' for info/success)
   */
  role?: 'alert' | 'status'
  /**
   * Screen reader announcement priority
   */
  'aria-live'?: 'polite' | 'assertive'
}

// Default variant icons
const InfoIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <title>Info</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
    />
  </svg>
)

const SuccessIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <title>Success</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const WarningIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <title>Warning</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
    />
  </svg>
)

const DangerIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <title>Error</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const CloseIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
    <title>Close</title>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const variantIcons = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
}

/**
 * Alert component - display important messages and status feedback
 *
 * @example
 * ```tsx
 * <Alert variant="success" dismissible>
 *   Settings saved successfully
 * </Alert>
 * ```
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'info',
      size = 'md',
      title,
      children,
      icon,
      showIcon = true,
      dismissible = false,
      onDismiss,
      actions,
      role,
      'aria-live': ariaLive,
      ...props
    },
    forwardedRef,
  ) => {
    const [isVisible, setIsVisible] = useState(true)

    // Resolve variant to non-null value
    const resolvedVariant = variant ?? 'info'

    // Determine ARIA role based on variant
    const alertRole =
      role || (resolvedVariant === 'danger' || resolvedVariant === 'warning' ? 'alert' : 'status')

    // Determine aria-live based on variant
    const liveRegion = ariaLive || (resolvedVariant === 'danger' ? 'assertive' : 'polite')

    // Get default icon for variant
    const DefaultIcon = icon || variantIcons[resolvedVariant]

    const handleDismiss = () => {
      setIsVisible(false)
      setTimeout(() => {
        onDismiss?.()
      }, 200) // Match fade-out duration
    }

    if (!isVisible && dismissible) {
      return null
    }

    return (
      <div
        ref={forwardedRef}
        className={alertVariants({ variant, size, className })}
        role={alertRole}
        aria-live={liveRegion}
        style={{ opacity: isVisible ? 1 : 0 }}
        {...props}
      >
        <div className="flex gap-3">
          {/* Icon */}
          {showIcon && DefaultIcon && (
            <div className={iconColorVariants({ variant, size })} aria-hidden="true">
              {typeof DefaultIcon === 'function' ? <DefaultIcon /> : DefaultIcon}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && <h3 className="mb-1 font-semibold leading-tight">{title}</h3>}
            <div className="leading-normal">{children}</div>
          </div>

          {/* Actions */}
          {actions && <div className="flex shrink-0 gap-2">{actions}</div>}

          {/* Dismiss button */}
          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              className="shrink-0 rounded-md p-1 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--colors-primary)]"
              aria-label="Dismiss alert"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    )
  },
)

Alert.displayName = 'Alert'
