import { ReactNode, useEffect, useState } from "react";
import { NavigationLeftLinkProps } from "./navigation-left";
import { useLocation } from "react-router";
import { classNames } from "@console/utils";
import { Icon } from "../icons/icon";
import { Link } from "react-router-dom";

export interface NavigationLeftSubLinkProps {
  linkContent: (link: NavigationLeftLinkProps) => ReactNode
  link: NavigationLeftLinkProps
  linkClassName: (pathname: string, url?: string, badge?: string) => string
}

export function NavigationLeftSubLink ({ linkContent, link, linkClassName }: NavigationLeftSubLinkProps) {
  const { pathname } = useLocation()

  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    link.subLinks?.forEach((currentLink) => {
      if (linkClassName(pathname, currentLink.url)?.includes('is-active')) {
        setOpen(true)
      }
    })
  }, [])

  const badge = (text: string) => {
    return (
      <span
        data-testid="sub-link-badge"
        className="bg-brand-500 text-neutral-50 rounded-xs text-3xs rounded-sm px-1 uppercase"
      >
        { text }
      </span>
    )
  }

  return (
    <>
      <div
        data-testid="link"
        onClick={() => setOpen(!open)}
        className={classNames(
          'justify-between select-none', linkClassName(pathname, link.url, link.url)
        )}
      >
        <span className="flex truncate">{linkContent(link)}</span>
        <Icon
          name="icon-solid-angle-down"
          className={classNames(
            'transition-transform ease-out duration-200',
            open ? 'rotate-180' : ''
          )}
        />
      </div>
      { link.subLinks && (

        <div
          data-testid="sub-links"
          className={classNames(
            'w-full', open ? 'opacity-100 h-full' : 'opacity-0 h-0 pointer-events-none'
          )}
        >
          { link.subLinks.map((subLink, index) => 
            subLink.onClick ? (
              <div
                data-testid="sub-link"
                key={index}
                onClick={() => subLink.onClick?.()}
                className={classNames(
                  'flex pl-[37px]', linkClassName(pathname, subLink.url, subLink.badge)
                )}
              >
                { subLink.title }
                { subLink.badge && badge(subLink.badge)}
              </div>
            ) : (
              <Link
                data-testid="sub-link"
                key={index}
                to={subLink.url || ''}
                className={classNames(
                  'flex pl-[37px]', linkClassName(pathname, subLink.url, subLink.badge)
                )}
              >
                { subLink.title }
                { subLink.badge && badge(subLink.badge)}
              
              </Link>
            )
          )}

        </div>
      )}
    </>
  )
}