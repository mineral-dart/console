import { classNames } from "@console/utils"
import { ReactNode } from "react"

export interface EmptyStateProps {
  title: string
  description?: string
  className?: string
  imageWidth?: string
  dataTestId?: string
  children?: ReactNode
}

export function EmptyState({ title, description, className, imageWidth, dataTestId, children }: EmptyStateProps) {
  return (
    <div className={classNames(
      'flex flex-grow items-center justify-center', className || ''
    )}>
      <div
        className="text-center flex flex-col items-center justify-center w-[420px] m-auto mt-10"
        data-testid={dataTestId || 'placeholder-settings'}
      >
        <img src="/assets/images/event-placeholder-light.svg" alt="Event Placeholder" className={classNames('pointer-events-none user-none mb-5', imageWidth || 'w-[48px]')} />
        <p className="text-neutral-400 font-medium">{ title }</p>
        { description && 
          <p data-testid="placeholder-settings-description" className="text-sm text-neutral-350 mt-1">
            { description }
          </p>
        }
        { children }
      </div>
    </div>
  )
}