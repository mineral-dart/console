import { useLocation } from "react-router"
import { Icon } from "../icons/icon"
import { classNames } from "@console/utils"
import { IconAwesomeEnum } from "@console/enums"
import { Link } from "react-router-dom"
import { NavigationLeftSubLink } from "./navigation-left-sub-link"

export interface NAvigationLeftProps {
  links: NavigationLeftLinkProps[]
  title?: string
  link?: {
    title: string
    onClick: () => void
  }
  className?: string
}

export interface NavigationLeftLinkProps {
  title: string
  icon?: string
  url?: string
  onClick?: () => void
  subLinks?: {
    title: string
    url?: string
    onClick?: () => void
    badge?: string
  }[]
}

export const linkClassName = (pathname: string, url?: string, badge?: string) =>
  `flex items-center py-2 px-3 text-sm rounded font-medium cursor-pointer mt-0.5 transition ease-out duration-300 truncate ${
    url === pathname
    ? 'is-active text-brand-500 bg-brand-50 hover:text-brand-600 hover:bg-brand-100'
    : 'text-neutral-350 hover:text-neutral-400 hover:bg-neutral-150'
  } ${badge ? 'justify-between' : ''}`

export function NavigationLeft ({ title, links, link, className = '' }: NAvigationLeftProps) {
  const { pathname } = useLocation()

  const linkContent = (link: NavigationLeftLinkProps) => (
    <>
      { link.icon && (
        <div>
          <Icon name={link.icon} className="inline-block w-3" />
        </div>
      )}
      {link.title}
    </>
  )

  return (
    <div className={classNames(
      'flex flex-col px-5', className
    )}>
      <div className="flex justify-between items-center mb-4">
        {title && <span className="text-neutral-350 uppercase text-2xs font-bold pl-3">{title}</span>}
        { link &&
          <span className="link cursor-pointer text-sm text-brand-500 font-medium" onClick={() => link.onClick()}>
            { link.title }
            <Icon name={IconAwesomeEnum.CIRCLE_PLUS} className="ml-1" />
          </span>
        }
      </div>

      { links.map((link, index) =>
        !link.onClick && !link.subLinks && link.url ? (
          <Link data-testid="link" key={index} to={link.url} className={linkClassName(link.url, pathname)}>
            { linkContent(link) }
          </Link>
        ) : !link.onClick && link.subLinks ? (
          <NavigationLeftSubLink key={index} link={link} linkClassName={linkClassName} linkContent={linkContent} />
        ) : (
          <div
            data-testid="link"
            key={index}
            onClick={link.onClick}
            className={linkClassName(link.url || '', pathname)}
          >
            { linkContent(link)}
          </div>
        )
      
      )}
    </div>
  )
}

export default NavigationLeft