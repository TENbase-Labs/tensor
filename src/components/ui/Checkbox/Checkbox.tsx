import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, useEffect, useRef } from 'react'

/**
 * Checkbox variant styles using class-variance-authority
 * Maps to TENsor design system token architecture
 */
const checkboxVariants = cva(
  [
    'shrink-0',
    'rounded border-2',
    'transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--colors-primary)]',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-[var(--colors-primary)] data-[state=checked]:border-[var(--colors-primary)]',
    'data-[state=indeterminate]:bg-[var(--colors-primary)] data-[state=indeterminate]:border-[var(--colors-primary)]',
    'data-[state=unchecked]:border-[var(--colors-neutral-400)] data-[state=unchecked]:bg-transparent',
    'hover:data-[state=unchecked]:border-[var(--colors-neutral-500)]',
    'hover:data-[state=checked]:opacity-90',
    'active:scale-95',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
      error: {
        true: 'border-[var(--colors-danger)] data-[state=unchecked]:border-[var(--colors-danger)]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export interface CheckboxProps
  extends Omit<RadixCheckbox.CheckboxProps, 'asChild'>,
    VariantProps<typeof checkboxVariants> {
  /**
   * Label text for the checkbox
   */
  label?: string
  /**
   * Description text displayed below label
   */
  description?: string
  /**
   * Error message displayed below checkbox when error state is active
   */
  errorMessage?: string
  /**
   * Whether the checkbox is in an error state
   */
  error?: boolean
  /**
   * Indeterminate state (for parent checkboxes with partial selection)
   */
  indeterminate?: boolean
  /**
   * Custom container class name
   */
  containerClassName?: string
}

const CheckIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-white"
  >
    <title>Checked</title>
    <path
      d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
)

const IndeterminateIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-white"
  >
    <title>Indeterminate</title>
    <path
      d="M3 7.5C3 7.22386 3.22386 7 3.5 7H11.5C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8H3.5C3.22386 8 3 7.77614 3 7.5Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
)

/**
 * Checkbox component - toggle independent options on or off
 *
 * @example
 * ```tsx
 * <Checkbox
 *   label="I agree to the terms and conditions"
 *   required
 * />
 * ```
 */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className,
      size,
      error: errorProp,
      label,
      description,
      errorMessage,
      indeterminate,
      id,
      disabled,
      required,
      containerClassName,
      'aria-describedby': ariaDescribedby,
      'aria-invalid': ariaInvalid,
      ...props
    },
    forwardedRef,
  ) => {
    // Generate unique IDs for accessibility
    const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2, 9)}`
    const descriptionId = `${checkboxId}-description`
    const errorMessageId = `${checkboxId}-error`

    // Internal ref for indeterminate state
    const internalRef = useRef<HTMLButtonElement>(null)

    // Combine refs
    const ref = forwardedRef || internalRef

    // Set indeterminate state on the underlying input
    useEffect(() => {
      const element = internalRef.current
      if (element && 'indeterminate' in element) {
        const input = element.querySelector('input[type="checkbox"]') as HTMLInputElement | null
        if (input) {
          input.indeterminate = indeterminate || false
        }
      }
    }, [indeterminate])

    // Build aria-describedby
    const describedByIds: string[] = []
    if (ariaDescribedby) describedByIds.push(ariaDescribedby)
    if (description) describedByIds.push(descriptionId)
    if (errorProp && errorMessage) describedByIds.push(errorMessageId)

    // Determine checked state for ARIA
    const ariaChecked: boolean | 'mixed' | undefined =
      indeterminate || props.checked === 'indeterminate'
        ? 'mixed'
        : typeof props.checked === 'boolean'
          ? props.checked
          : undefined

    return (
      <div className={containerClassName}>
        <div className="flex items-start gap-2">
          <RadixCheckbox.Root
            ref={ref as React.Ref<HTMLButtonElement>}
            className={checkboxVariants({ size, error: errorProp, className })}
            id={checkboxId}
            disabled={disabled}
            required={required}
            aria-invalid={errorProp || ariaInvalid}
            aria-describedby={describedByIds.length > 0 ? describedByIds.join(' ') : undefined}
            aria-required={required}
            aria-checked={ariaChecked}
            {...props}
          >
            <RadixCheckbox.Indicator className="flex items-center justify-center">
              {indeterminate ? <IndeterminateIcon /> : <CheckIcon />}
            </RadixCheckbox.Indicator>
          </RadixCheckbox.Root>

          {/* Label and description */}
          {(label || description) && (
            <div className="flex-1">
              {label && (
                <label
                  htmlFor={checkboxId}
                  className="text-sm font-medium leading-none text-[var(--colors-text-primary)] cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {label}
                  {required && <span className="ml-1 text-[var(--colors-danger)]">*</span>}
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

        {/* Error message */}
        {errorProp && errorMessage && (
          <p id={errorMessageId} className="mt-2 text-sm text-[var(--colors-danger)]" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'
