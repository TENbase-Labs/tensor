import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { Toast, type ToastProps } from './Toast'

type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

interface ToastInstance extends Omit<ToastProps, 'onDismiss'> {
  id: string
  position?: ToastPosition
}

interface ToastContextValue {
  show: (props: Omit<ToastProps, 'id'> & { position?: ToastPosition }) => string
  dismiss: (id: string) => void
  dismissAll: () => void
  update: (id: string, props: Partial<ToastProps>) => void
  info: (message: string, options?: Partial<ToastProps>) => string
  success: (message: string, options?: Partial<ToastProps>) => string
  warning: (message: string, options?: Partial<ToastProps>) => string
  error: (message: string, options?: Partial<ToastProps>) => string
}

const ToastContext = createContext<ToastContextValue | null>(null)

const positionStyles: Record<ToastPosition, string> = {
  'top-left': 'top-6 left-6',
  'top-center': 'top-6 left-1/2 -translate-x-1/2',
  'top-right': 'top-6 right-6',
  'bottom-left': 'bottom-6 left-6',
  'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-6 right-6',
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastInstance[]>([])

  const show = useCallback(
    (props: Omit<ToastProps, 'id'> & { position?: ToastPosition }) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
      const toast: ToastInstance = { ...props, id }
      setToasts((prev) => [...prev, toast])
      return id
    },
    [],
  )

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  const update = useCallback((id: string, props: Partial<ToastProps>) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, ...props } : t)))
  }, [])

  const info = useCallback(
    (message: string, options?: Partial<ToastProps>) => {
      return show({ variant: 'info', message, ...options })
    },
    [show],
  )

  const success = useCallback(
    (message: string, options?: Partial<ToastProps>) => {
      return show({ variant: 'success', message, ...options })
    },
    [show],
  )

  const warning = useCallback(
    (message: string, options?: Partial<ToastProps>) => {
      return show({ variant: 'warning', message, ...options })
    },
    [show],
  )

  const error = useCallback(
    (message: string, options?: Partial<ToastProps>) => {
      return show({ variant: 'danger', message, ...options })
    },
    [show],
  )

  const value: ToastContextValue = {
    show,
    dismiss,
    dismissAll,
    update,
    info,
    success,
    warning,
    error,
  }

  // Group toasts by position
  const toastsByPosition = toasts.reduce(
    (acc, toast) => {
      const position = toast.position || 'top-right'
      if (!acc[position]) acc[position] = []
      acc[position].push(toast)
      return acc
    },
    {} as Record<ToastPosition, ToastInstance[]>,
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <>
            {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
              <div
                key={position}
                className={`pointer-events-none fixed z-50 flex flex-col gap-2 ${positionStyles[position as ToastPosition]}`}
              >
                {positionToasts.map((toast) => (
                  <Toast key={toast.id} {...toast} onDismiss={() => dismiss(toast.id)} />
                ))}
              </div>
            ))}
          </>,
          document.body,
        )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
