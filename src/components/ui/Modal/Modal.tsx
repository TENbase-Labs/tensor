import * as Dialog from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type ReactNode } from 'react'

/**
 * Modal content variant styles using class-variance-authority
 * Maps to TENsor design system token architecture
 */
const modalContentVariants = cva(
  [
    'fixed left-1/2 top-1/2 z-50',
    '-translate-x-1/2 -translate-y-1/2',
    'w-full max-h-[85vh] overflow-y-auto',
    'bg-[var(--colors-background)]',
    'rounded-lg shadow-lg',
    'focus-visible:outline-none',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
    'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'max-w-md p-6',
        md: 'max-w-lg p-8',
        lg: 'max-w-2xl p-10',
        xl: 'max-w-4xl p-12',
        full: 'max-w-[95vw] p-8',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

const modalOverlayVariants = cva(
  [
    'fixed inset-0 z-40',
    'bg-black/50',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  ].join(' '),
)

const CloseIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export interface ModalProps extends Dialog.DialogProps, VariantProps<typeof modalContentVariants> {
  /**
   * Modal title (required for accessibility)
   */
  title: string
  /**
   * Optional description for additional context
   */
  description?: string
  /**
   * Modal content
   */
  children: ReactNode
  /**
   * Show/hide close button (default: true)
   */
  showCloseButton?: boolean
  /**
   * Custom footer content (e.g., action buttons)
   */
  footer?: ReactNode
  /**
   * Callback when modal should close
   */
  onClose?: () => void
  /**
   * Custom class for content container
   */
  contentClassName?: string
}

/**
 * Modal component - overlay dialog for focused interactions
 *
 * @example
 * ```tsx
 * <Modal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Delete Account"
 *   description="This action cannot be undone"
 *   footer={
 *     <>
 *       <Button variant="ghost" onClick={() => setIsOpen(false)}>
 *         Cancel
 *       </Button>
 *       <Button variant="danger" onClick={handleDelete}>
 *         Delete
 *       </Button>
 *     </>
 *   }
 * >
 *   Are you sure you want to delete your account?
 * </Modal>
 * ```
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      size,
      title,
      description,
      children,
      showCloseButton = true,
      footer,
      onClose,
      contentClassName,
      onOpenChange,
      ...props
    },
    forwardedRef,
  ) => {
    const handleOpenChange = (open: boolean) => {
      if (!open) {
        onClose?.()
      }
      onOpenChange?.(open)
    }

    return (
      <Dialog.Root onOpenChange={handleOpenChange} {...props}>
        <Dialog.Portal>
          <Dialog.Overlay className={modalOverlayVariants()} />
          <Dialog.Content
            ref={forwardedRef}
            className={modalContentVariants({ size, className: contentClassName })}
          >
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Dialog.Title className="text-xl font-semibold text-[var(--colors-text-primary)]">
                    {title}
                  </Dialog.Title>
                  {description && (
                    <Dialog.Description className="mt-2 text-sm text-[var(--colors-neutral-600)]">
                      {description}
                    </Dialog.Description>
                  )}
                </div>
                {showCloseButton && (
                  <Dialog.Close
                    className="ml-4 rounded-md p-2 text-[var(--colors-neutral-500)] hover:bg-[var(--colors-neutral-100)] hover:text-[var(--colors-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--colors-primary)]"
                    aria-label="Close modal"
                  >
                    <CloseIcon />
                  </Dialog.Close>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="mb-6 text-[var(--colors-text-primary)]">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="flex items-center justify-end gap-3 border-t border-[var(--colors-neutral-200)] pt-4">
                {footer}
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  },
)

Modal.displayName = 'Modal'

/**
 * Modal Trigger - button that opens the modal
 */
export const ModalTrigger = Dialog.Trigger

/**
 * Modal Close - button that closes the modal (for use in footer)
 */
export const ModalClose = Dialog.Close
