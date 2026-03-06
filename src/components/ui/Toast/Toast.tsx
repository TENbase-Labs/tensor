import { cva, type VariantProps } from 'class-variance-authority'
import { type ReactNode, useEffect } from 'react'

const toastVariants = cva(
  [
    'pointer-events-auto relative flex w-full max-w-sm items-start gap-3',
    'rounded-lg border bg-[var(--colors-surface-overlay)] p-4 shadow-lg',
    'transition-all duration-300',
    'data-[state=open]:animate-in data-[state=open]:slide-in-from-top-2',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2',
  ].join(' '),
  {
    variants: {
      variant: {
        info: 'border-[var(--colors-info)]',
        success: 'border-[var(--colors-success)]',
        warning: 'border-[var(--colors-warning)]',
        danger: 'border-[var(--colors-danger)]',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
)

export interface ToastProps extends VariantProps<typeof toastVariants> {
  id: string
  title?: string
  message: string
  description?: string
  icon?: ReactNode
  showIcon?: boolean
  duration?: number
  autoDismiss?: boolean
  dismissible?: boolean
  onDismiss?: () => void
  action?: {
    label: string
    onClick: () => void
  }
}

const iconMap = {
  info: '🔵',
  success: '✅',
  warning: '⚠️',
  danger: '❌',
}

export function Toast({
  id: _id,
  variant = 'info',
  title,
  message,
  description,
  icon,
  showIcon = true,
  duration = 5000,
  autoDismiss = true,
  dismissible = true,
  onDismiss,
  action,
}: ToastProps) {
  useEffect(() => {
    if (autoDismiss && duration > 0) {
      const timer = setTimeout(() => {
        onDismiss?.()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [autoDismiss, duration, onDismiss])

  const displayIcon = icon || (showIcon && iconMap[variant || 'info'])

  return (
    <div className={toastVariants({ variant })} data-state="open" role="alert">
      {displayIcon && <div className="flex-shrink-0 text-lg">{displayIcon}</div>}

      <div className="flex-1 space-y-1">
        {title && <div className="font-semibold text-[var(--colors-text-primary)]">{title}</div>}
        <div className="text-sm text-[var(--colors-text-primary)]">{message}</div>
        {description && (
          <div className="text-sm text-[var(--colors-text-secondary)]">{description}</div>
        )}
      </div>

      <div className="flex items-start gap-2">
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="rounded px-3 py-1 text-sm font-medium text-[var(--colors-primary)] hover:bg-[var(--colors-neutral-100)] transition-colors"
          >
            {action.label}
          </button>
        )}

        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            className="flex-shrink-0 rounded p-1 text-[var(--colors-text-secondary)] hover:bg-[var(--colors-neutral-100)] transition-colors"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
