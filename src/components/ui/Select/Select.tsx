import * as RadixSelect from '@radix-ui/react-select'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

/**
 * Select trigger variant styles using class-variance-authority
 * Maps to TENsor design system token architecture
 */
const selectTriggerVariants = cva(
  [
    'inline-flex w-full items-center justify-between',
    'rounded-md border',
    'bg-[var(--colors-background)]',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--colors-primary)]',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[placeholder]:text-[var(--colors-neutral-500)]',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-base',
        lg: 'h-14 px-5 text-lg',
      },
      error: {
        true: 'border-[var(--colors-danger)] focus-visible:ring-[var(--colors-danger)]',
        false: 'border-[var(--colors-neutral-300)] hover:border-[var(--colors-neutral-400)]',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
    },
  },
)

const selectContentVariants = cva(
  [
    'overflow-hidden rounded-md border border-[var(--colors-neutral-200)]',
    'bg-[var(--colors-background)]',
    'shadow-lg',
    'z-50',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const selectItemVariants = cva(
  [
    'relative flex cursor-pointer items-center',
    'rounded-sm',
    'outline-none',
    'transition-colors',
    'select-none',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    'data-[highlighted]:bg-[var(--colors-primary)]/10',
    'data-[highlighted]:text-[var(--colors-text-primary)]',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'px-2 py-1.5 text-sm',
        md: 'px-3 py-2 text-base',
        lg: 'px-4 py-2.5 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const CheckIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
)

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps
  extends Omit<RadixSelect.SelectProps, 'children'>,
    VariantProps<typeof selectTriggerVariants> {
  /**
   * Label for the select field
   */
  label?: string
  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string
  /**
   * Helper text displayed below the select
   */
  helperText?: string
  /**
   * Error message displayed when error state is active
   */
  errorMessage?: string
  /**
   * Whether the select is in an error state
   */
  error?: boolean
  /**
   * Options for the select
   */
  options: SelectOption[]
  /**
   * Custom container class name
   */
  containerClassName?: string
  /**
   * ID for the select trigger
   */
  id?: string
}

/**
 * Select component - choose one option from a dropdown list
 *
 * @example
 * ```tsx
 * <Select
 *   label="Country"
 *   placeholder="Select a country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'ca', label: 'Canada' },
 *   ]}
 *   value={country}
 *   onValueChange={setCountry}
 * />
 * ```
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      size,
      error: errorProp,
      label,
      placeholder = 'Select...',
      helperText,
      errorMessage,
      options,
      containerClassName,
      id,
      required,
      disabled,
      ...props
    },
    forwardedRef,
  ) => {
    // Generate unique IDs for accessibility
    const selectId = id || `select-${Math.random().toString(36).slice(2, 9)}`
    const helperTextId = `${selectId}-helper`
    const errorMessageId = `${selectId}-error`
    const labelId = `${selectId}-label`

    // Build aria-describedby
    const describedByIds: string[] = []
    if (helperText && !errorProp) describedByIds.push(helperTextId)
    if (errorProp && errorMessage) describedByIds.push(errorMessageId)

    return (
      <div className={containerClassName}>
        {/* Label */}
        {label && (
          <label
            id={labelId}
            htmlFor={selectId}
            className="mb-2 block text-sm font-medium text-[var(--colors-text-primary)]"
          >
            {label}
            {required && <span className="ml-1 text-[var(--colors-danger)]">*</span>}
          </label>
        )}

        <RadixSelect.Root disabled={disabled} required={required} {...props}>
          <RadixSelect.Trigger
            ref={forwardedRef}
            id={selectId}
            className={selectTriggerVariants({ size, error: errorProp })}
            aria-invalid={errorProp}
            aria-describedby={describedByIds.length > 0 ? describedByIds.join(' ') : undefined}
            aria-labelledby={label ? labelId : undefined}
          >
            <RadixSelect.Value placeholder={placeholder} />
            <RadixSelect.Icon className="ml-2">
              <ChevronDownIcon />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>

          <RadixSelect.Portal>
            <RadixSelect.Content
              className={selectContentVariants({ size })}
              position="popper"
              sideOffset={4}
            >
              <RadixSelect.Viewport className="p-1">
                {options.map((option) => (
                  <RadixSelect.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={selectItemVariants({ size })}
                  >
                    <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                    <RadixSelect.ItemIndicator className="ml-auto pl-2">
                      <CheckIcon />
                    </RadixSelect.ItemIndicator>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>

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
      </div>
    )
  },
)

Select.displayName = 'Select'
