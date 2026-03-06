import * as RadixSwitch from '@radix-ui/react-switch'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

/**
 * Switch variant styles using class-variance-authority
 * Maps to TENsor design system token architecture
 */
const switchRootVariants = cva(
  [
    'group relative inline-flex shrink-0 cursor-pointer',
    'rounded-full transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--colors-primary)]',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=unchecked]:bg-[var(--colors-neutral-300)]',
    'data-[state=checked]:bg-[var(--colors-primary)]',
    'hover:data-[state=unchecked]:bg-[var(--colors-neutral-400)]',
    'hover:data-[state=checked]:opacity-90',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-[18px] w-8',
        md: 'h-6 w-11',
        lg: 'h-8 w-14',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const switchThumbVariants = cva(
  [
    'pointer-events-none block rounded-full bg-white shadow-lg',
    'transition-transform duration-200',
    'data-[state=unchecked]:translate-x-0.5',
    'group-active:scale-110',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-[14px] w-[14px] data-[state=checked]:translate-x-[18px]',
        md: 'h-5 w-5 data-[state=checked]:translate-x-[22px]',
        lg: 'h-7 w-7 data-[state=checked]:translate-x-[28px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export interface SwitchProps
  extends Omit<RadixSwitch.SwitchProps, 'asChild'>,
    VariantProps<typeof switchRootVariants> {
  /**
   * Label text for the switch
   */
  label?: string
  /**
   * Description text displayed below label
   */
  description?: string
  /**
   * Loading state - shows spinner and disables interaction
   */
  loading?: boolean
  /**
   * Text shown when switch is on (inside track, optional)
   */
  onLabel?: string
  /**
   * Text shown when switch is off (inside track, optional)
   */
  offLabel?: string
  /**
   * Custom container class name
   */
  containerClassName?: string
}

const LoadingSpinner = () => (
  <svg
    className="h-3 w-3 animate-spin text-[var(--colors-primary)]"
    fill="none"
    viewBox="0 0 24 24"
  >
    <title>Loading</title>
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

/**
 * Switch component - toggle a setting on or off with immediate effect
 *
 * @example
 * ```tsx
 * <Switch
 *   label="Enable notifications"
 *   checked={enabled}
 *   onCheckedChange={setEnabled}
 * />
 * ```
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      size,
      label,
      description,
      loading,
      onLabel,
      offLabel,
      id,
      disabled,
      containerClassName,
      'aria-describedby': ariaDescribedby,
      ...props
    },
    forwardedRef,
  ) => {
    // Generate unique IDs for accessibility
    const switchId = id || `switch-${Math.random().toString(36).slice(2, 9)}`
    const descriptionId = `${switchId}-description`

    // Build aria-describedby
    const describedByIds: string[] = []
    if (ariaDescribedby) describedByIds.push(ariaDescribedby)
    if (description) describedByIds.push(descriptionId)

    return (
      <div className={containerClassName}>
        <div className="flex items-center gap-2">
          <RadixSwitch.Root
            ref={forwardedRef}
            className={switchRootVariants({ size, className })}
            id={switchId}
            disabled={disabled || loading}
            aria-describedby={describedByIds.length > 0 ? describedByIds.join(' ') : undefined}
            aria-busy={loading}
            {...props}
          >
            {/* On/Off labels inside track (optional) */}
            {onLabel && (
              <span className="absolute left-1 top-1/2 -translate-y-1/2 text-xs text-white opacity-0 transition-opacity data-[state=checked]:opacity-100">
                {onLabel}
              </span>
            )}
            {offLabel && (
              <span className="absolute right-1 top-1/2 -translate-y-1/2 text-xs text-[var(--colors-neutral-600)] opacity-0 transition-opacity data-[state=unchecked]:opacity-100">
                {offLabel}
              </span>
            )}

            <RadixSwitch.Thumb className={switchThumbVariants({ size })}>
              {loading && (
                <div className="flex h-full w-full items-center justify-center">
                  <LoadingSpinner />
                </div>
              )}
            </RadixSwitch.Thumb>
          </RadixSwitch.Root>

          {/* Label and description */}
          {(label || description) && (
            <div className="flex-1">
              {label && (
                <label
                  htmlFor={switchId}
                  className="text-sm font-medium leading-none text-[var(--colors-text-primary)] cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {label}
                </label>
              )}
              {description && (
                <p id={descriptionId} className="mt-1 text-sm text-[var(--colors-neutral-600)]">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    )
  },
)

Switch.displayName = 'Switch'
