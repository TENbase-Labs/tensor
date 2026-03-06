import * as RadixTooltip from '@radix-ui/react-tooltip'
import { forwardRef, type ReactNode } from 'react'

export interface TooltipProps extends RadixTooltip.TooltipContentProps {
  /**
   * Element that triggers the tooltip
   */
  children: ReactNode
  /**
   * Tooltip content to display
   */
  content: ReactNode
  /**
   * Delay before tooltip shows (in milliseconds)
   */
  delayDuration?: number
  /**
   * Whether tooltip should skip delay when moving between triggers
   */
  skipDelayDuration?: number
}

/**
 * Tooltip component - contextual information overlay
 *
 * @example
 * ```tsx
 * <Tooltip content="Click to copy">
 *   <button>Copy</button>
 * </Tooltip>
 * ```
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    { children, content, delayDuration = 200, skipDelayDuration = 300, sideOffset = 4, ...props },
    forwardedRef,
  ) => {
    return (
      <RadixTooltip.Provider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration}>
        <RadixTooltip.Root>
          <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
          <RadixTooltip.Portal>
            <RadixTooltip.Content
              ref={forwardedRef}
              sideOffset={sideOffset}
              className="z-50 overflow-hidden rounded-md bg-[var(--colors-neutral-900)] px-3 py-1.5 text-sm text-white shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
              {...props}
            >
              {content}
              <RadixTooltip.Arrow className="fill-[var(--colors-neutral-900)]" />
            </RadixTooltip.Content>
          </RadixTooltip.Portal>
        </RadixTooltip.Root>
      </RadixTooltip.Provider>
    )
  },
)

Tooltip.displayName = 'Tooltip'
