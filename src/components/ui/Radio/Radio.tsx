import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

/**
 * Radio button variant styles using class-variance-authority
 * Maps to TENsor design system token architecture
 */
const radioVariants = cva(
  [
    'shrink-0',
    'rounded-full border-2',
    'transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--colors-primary)]',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:border-[var(--colors-primary)]',
    'data-[state=unchecked]:border-[var(--colors-neutral-400)]',
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

const radioIndicatorVariants = cva(['flex items-center justify-center'], {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const radioDotVariants = cva(['rounded-full bg-[var(--colors-primary)]'], {
  variants: {
    size: {
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface RadioGroupProps
  extends Omit<RadixRadioGroup.RadioGroupProps, 'asChild'>,
    VariantProps<typeof radioVariants> {
  /**
   * Group label (rendered as legend in fieldset)
   */
  label?: string
  /**
   * Helper text displayed below the radio group
   */
  helperText?: string
  /**
   * Error message displayed when error state is active
   */
  errorMessage?: string
  /**
   * Whether the radio group is in an error state
   */
  error?: boolean
  /**
   * Layout orientation
   */
  orientation?: 'vertical' | 'horizontal'
  /**
   * Options for the radio group
   */
  options: Array<{
    value: string
    label: string
    description?: string
    disabled?: boolean
  }>
  /**
   * Custom container class name
   */
  containerClassName?: string
}

/**
 * RadioGroup component - select one option from a mutually exclusive set
 *
 * @example
 * ```tsx
 * <RadioGroup
 *   label="Payment Method"
 *   options={[
 *     { value: 'credit', label: 'Credit Card' },
 *     { value: 'paypal', label: 'PayPal' },
 *   ]}
 *   value={selected}
 *   onValueChange={setSelected}
 * />
 * ```
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      size,
      error: errorProp,
      label,
      helperText,
      errorMessage,
      orientation = 'vertical',
      options,
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
    const groupId = id || `radiogroup-${Math.random().toString(36).slice(2, 9)}`
    const helperTextId = `${groupId}-helper`
    const errorMessageId = `${groupId}-error`
    const legendId = `${groupId}-legend`

    // Build aria-describedby
    const describedByIds: string[] = []
    if (ariaDescribedby) describedByIds.push(ariaDescribedby)
    if (helperText && !errorProp) describedByIds.push(helperTextId)
    if (errorProp && errorMessage) describedByIds.push(errorMessageId)

    return (
      <fieldset className={containerClassName}>
        {/* Legend (group label) */}
        {label && (
          <legend
            id={legendId}
            className="mb-3 text-sm font-medium text-[var(--colors-text-primary)]"
          >
            {label}
            {required && <span className="ml-1 text-[var(--colors-danger)]">*</span>}
          </legend>
        )}

        <RadixRadioGroup.Root
          ref={forwardedRef}
          className={orientation === 'horizontal' ? 'flex flex-wrap gap-4' : 'flex flex-col gap-3'}
          disabled={disabled}
          required={required}
          aria-invalid={errorProp || ariaInvalid}
          aria-describedby={describedByIds.length > 0 ? describedByIds.join(' ') : undefined}
          aria-labelledby={label ? legendId : undefined}
          {...props}
        >
          {options.map((option) => {
            const optionId = `${groupId}-${option.value}`
            const optionDescId = option.description ? `${optionId}-desc` : undefined

            return (
              <div key={option.value} className="flex items-start gap-2">
                <RadixRadioGroup.Item
                  className={radioVariants({ size, error: errorProp, className })}
                  value={option.value}
                  id={optionId}
                  disabled={option.disabled}
                  aria-describedby={optionDescId}
                >
                  <RadixRadioGroup.Indicator className={radioIndicatorVariants({ size })}>
                    <div className={radioDotVariants({ size })} />
                  </RadixRadioGroup.Indicator>
                </RadixRadioGroup.Item>

                {/* Label and description */}
                <div className="flex-1">
                  <label
                    htmlFor={optionId}
                    className="text-sm font-medium leading-none text-[var(--colors-text-primary)] cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </label>
                  {option.description && (
                    <p id={optionDescId} className="mt-1 text-sm text-[var(--colors-neutral-600)]">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </RadixRadioGroup.Root>

        {/* Helper text or error message */}
        {!errorProp && helperText && (
          <p id={helperTextId} className="mt-2 text-sm text-[var(--colors-neutral-600)]">
            {helperText}
          </p>
        )}
        {errorProp && errorMessage && (
          <p id={errorMessageId} className="mt-2 text-sm text-[var(--colors-danger)]" role="alert">
            {errorMessage}
          </p>
        )}
      </fieldset>
    )
  },
)

RadioGroup.displayName = 'RadioGroup'
