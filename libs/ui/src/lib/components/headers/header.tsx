import { IconEnum } from "@console/enums"
import { ReactNode } from "react"
import { Icon } from "../icons/icon"
import Skeleton from "../skeleton/skeleton"
import { Truncate } from "../truncate/truncate"

export interface HeaderProps {
  title?: string
  icon?: IconEnum | string
  iconClassName?: string
  buttons?: ReactNode
  copyTitle?: boolean
  copyContent?: boolean
  actions?: ReactNode
}

export function Header (props: HeaderProps) {
  const { title, icon, buttons, actions, iconClassName = '' } = props

  return (
    <div className="flex h-32 border-b border-neutral-200 items-center justify-between bg-white rounded-t p-5 shrink-0">
      <div className="flex gap-4 ml-2 items-center">
        { icon && <Icon name={icon} className={`w-16 ${iconClassName}`} />}

        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center max-w-3xl">
            <Skeleton height={36} width={150} show={!title}>
              <h1 className="font-bold text-neutral-400 text-3xl max-w-3xl truncate">
                {title && <Truncate text={title} truncateLimit={50} />}
              </h1>
            </Skeleton>
          </div>

          { actions && <div className="flex gap-3 items-start">{actions}</div> }
        </div>
      </div>
      {buttons && <div className="flex self-end gap-2">{buttons}</div>}
    </div>
  )
}

export default Header