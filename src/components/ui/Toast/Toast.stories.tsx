import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ToastProvider, useToast } from './ToastProvider'

const meta: Meta = {
  title: 'Components/Toast',
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
}

export default meta

function ToastDemo() {
  const toast = useToast()
  const [count, setCount] = useState(0)

  return (
    <div className="space-y-4 p-8">
      <h2 className="text-2xl font-bold">Toast Notifications</h2>
      <p className="text-gray-600">Click buttons to show toast notifications</p>

      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => toast.info('This is an info message')}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Show Info
        </button>

        <button
          type="button"
          onClick={() => toast.success('Operation completed successfully!')}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Show Success
        </button>

        <button
          type="button"
          onClick={() => toast.warning('Please review your settings')}
          className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
        >
          Show Warning
        </button>

        <button
          type="button"
          onClick={() => toast.error('An error occurred while processing')}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Show Error
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() =>
            toast.show({
              variant: 'success',
              title: 'Success!',
              message: 'Your changes have been saved',
              description: 'All updates are now live',
            })
          }
          className="rounded border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
        >
          With Title & Description
        </button>

        <button
          type="button"
          onClick={() =>
            toast.show({
              variant: 'info',
              message: 'File deleted',
              action: {
                label: 'Undo',
                onClick: () => {
                  setCount((c) => c + 1)
                  toast.success(`Undo clicked ${count + 1} times`)
                },
              },
            })
          }
          className="rounded border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
        >
          With Action Button
        </button>

        <button
          type="button"
          onClick={() =>
            toast.show({
              variant: 'warning',
              message: 'This toast will not auto-dismiss',
              autoDismiss: false,
            })
          }
          className="rounded border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
        >
          No Auto-Dismiss
        </button>

        <button
          type="button"
          onClick={() => {
            toast.info('Toast 1')
            toast.success('Toast 2')
            toast.warning('Toast 3')
            toast.error('Toast 4')
          }}
          className="rounded border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
        >
          Show Multiple Toasts
        </button>

        <button
          type="button"
          onClick={() => toast.dismissAll()}
          className="rounded border border-red-300 bg-red-50 px-4 py-2 text-red-700 hover:bg-red-100"
        >
          Dismiss All
        </button>
      </div>
    </div>
  )
}

export const Interactive: StoryObj = {
  render: () => <ToastDemo />,
}

export const InfoVariant: StoryObj = {
  render: () => {
    const toast = useToast()
    return (
      <button
        type="button"
        onClick={() => toast.info('This is an informational message')}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Show Info Toast
      </button>
    )
  },
}

export const SuccessVariant: StoryObj = {
  render: () => {
    const toast = useToast()
    return (
      <button
        type="button"
        onClick={() => toast.success('Operation completed successfully!')}
        className="rounded bg-green-500 px-4 py-2 text-white"
      >
        Show Success Toast
      </button>
    )
  },
}

export const WarningVariant: StoryObj = {
  render: () => {
    const toast = useToast()
    return (
      <button
        type="button"
        onClick={() => toast.warning('Please review this important information')}
        className="rounded bg-yellow-500 px-4 py-2 text-white"
      >
        Show Warning Toast
      </button>
    )
  },
}

export const ErrorVariant: StoryObj = {
  render: () => {
    const toast = useToast()
    return (
      <button
        type="button"
        onClick={() => toast.error('An error occurred while processing your request')}
        className="rounded bg-red-500 px-4 py-2 text-white"
      >
        Show Error Toast
      </button>
    )
  },
}
