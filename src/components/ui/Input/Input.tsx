import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type InputHTMLAttributes, useState } from 'react'

/**
 * Input variant styles using class-variance-authority
 * Maps to TENsor design system token architecture
 */
const inputVariants = cva(
  [
    'w-full',
    'rounded-md',
    'border transition-colors',
    'font-sans',
    'text-[var(--colors-text-primary)]',
    'placeholder:text-[var(--colors-neutral-400)]',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--colors-neutral-100)]',
    'read-only:bg-[var(--colors-neutral-50)] read-only:cursor-default',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-9 px-2 text-sm',
        md: 'h-11 px-4 text-base',
        lg: 'h-14 px-6 text-lg',
      },
      state: {
        default: [
          'border-[var(--colors-neutral-300)]',
          'hover:border-[var(--colors-neutral-400)]',
          'focus:border-[var(--colors-primary)] focus:ring-[var(--colors-primary)]/20',
        ].join(' '),
        error: [
          'border-[var(--colors-danger)]',
          'focus:border-[var(--colors-danger)] focus:ring-[var(--colors-danger)]/20',
        ].join(' '),
        success: [
          'border-[var(--colors-success)]',
          'focus:border-[var(--colors-success)] focus:ring-[var(--colors-success)]/20',
        ].join(' '),
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  },
)

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /**
   * Label text for the input
   */
  label?: string
  /**
   * Helper text displayed below input
   */
  helperText?: string
  /**
   * Error message displayed below input when error state is active
   */
  errorMessage?: string
  /**
   * Whether the input is in an error state
   */
  error?: boolean
  /**
   * Whether the input is in a success state
   */
  success?: boolean
  /**
   * Icon or element to display before the input value
   */
  leadingIcon?: React.ReactNode
  /**
   * Icon or element to display after the input value
   */
  trailingIcon?: React.ReactNode
  /**
   * Text prefix displayed before input value (e.g., "$")
   */
  prefix?: string
  /**
   * Text suffix displayed after input value (e.g., "kg")
   */
  suffix?: string
  /**
   * Custom container class name
   */
  containerClassName?: string
}

/**
 * Input component - single-line text input for forms and data entry
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email Address"
 *   type="email"
 *   placeholder="you@example.com"
 *   required
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      state: stateProp,
      label,
      helperText,
      errorMessage,
      error,
      success,
      leadingIcon,
      trailingIcon,
      prefix,
      suffix,
      type = 'text',
      id,
      disabled,
      required,
      containerClassName,
      'aria-describedby': ariaDescribedby,
      'aria-invalid': ariaInvalid,
      ...props
    },
    ref,
  ) => {
    // Generate unique IDs for accessibility
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`
    const helperTextId = `${inputId}-helper`
    const errorMessageId = `${inputId}-error`

    // Password visibility toggle
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    // Determine state variant
    const state = error ? 'error' : success ? 'success' : stateProp || 'default'

    // Build aria-describedby
    const describedByIds: string[] = []
    if (ariaDescribedby) describedByIds.push(ariaDescribedby)
    if (helperText && !error) describedByIds.push(helperTextId)
    if (error && errorMessage) describedByIds.push(errorMessageId)

    return (
      <div className={containerClassName}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-[var(--colors-text-primary)]"
          >
            {label}
            {required && <span className="ml-1 text-[var(--colors-danger)]">*</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Leading icon */}
          {leadingIcon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--colors-neutral-500)]">
              {leadingIcon}
            </div>
          )}

          {/* Prefix */}
          {prefix && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--colors-neutral-600)]">
              {prefix}
            </span>
          )}

          {/* Input */}
          <input
            ref={ref}
            type={inputType}
            id={inputId}
            disabled={disabled}
            required={required}
            className={inputVariants({
              size,
              state,
              className: [
                className,
                leadingIcon && 'pl-10',
                prefix && 'pl-8',
                trailingIcon && 'pr-10',
                suffix && 'pr-12',
                isPassword && 'pr-10',
              ]
                .filter(Boolean)
                .join(' '),
            })}
            aria-invalid={error || ariaInvalid}
            aria-describedby={describedByIds.length > 0 ? describedByIds.join(' ') : undefined}
            aria-required={required}
            {...props}
          />

          {/* Suffix */}
          {suffix && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--colors-neutral-600)]">
              {suffix}
            </span>
          )}

          {/* Trailing icon or password toggle */}
          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--colors-neutral-600)] hover:text-[var(--colors-text-primary)]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Hide password</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Show password</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          ) : (
            trailingIcon && (
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--colors-neutral-500)]">
                {trailingIcon}
              </div>
            )
          )}
        </div>

        {/* Helper text or error message */}
        {!error && helperText && (
          <p id={helperTextId} className="mt-2 text-sm text-[var(--colors-neutral-600)]">
            {helperText}
          </p>
        )}
        {error && errorMessage && (
          <p id={errorMessageId} className="mt-2 text-sm text-[var(--colors-danger)]" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
