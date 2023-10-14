import { useLocation, useParams } from "react-router"
import {
  AUDIT_LOGS_URL,
  CLUSTERS_URL,
  CLUSTER_URL,
  INFRA_LOGS_URL,
  ORGANIZATION_AUDIT_LOGS_URL,
  ORGANIZATION_PROJECT_URL,
  ORGANIZATION_URL,
  OVERVIEW_URL,
  SETTINGS_URL,
} from '@console/routes'
import { Icon, Tooltip, ButtonIcon, ButtonIconStyle } from "@console/ui"
import { IconAwesomeEnum, IconEnum } from "@console/enums"
import { Link } from "react-router-dom"
import { classNames } from "@console/utils"
import { MenuAccountFeature } from "../feature/menu-account-feature"

export interface NavigationProps {
  defaultOrganizationId: string
  clusterNotification: boolean
}

export function Navigation ({ defaultOrganizationId, clusterNotification }: NavigationProps) {
  const { organizationId = defaultOrganizationId, clusterId = '', projectId } = useParams()
  const { pathname } = useLocation()

  const matchLogInfraRoute = pathname.includes(INFRA_LOGS_URL(organizationId, clusterId))
  const matchOrganizationRoute = pathname.includes(ORGANIZATION_URL(organizationId) + ORGANIZATION_PROJECT_URL)
  const matchEventsRoute = pathname.includes(ORGANIZATION_URL(organizationId) + ORGANIZATION_AUDIT_LOGS_URL)
  const matchSettingsRoute = pathname.includes(`${SETTINGS_URL(organizationId)}`)
  const matchClusterRoute =
    pathname.includes(CLUSTERS_URL(organizationId)) ||
    matchLogInfraRoute ||
    pathname.includes(CLUSTER_URL(organizationId, clusterId))

  
  const infosMenu = [
    {
      title: 'Need help?',
      items: []
    }
  ]

  return (
    <div className="w-16 h-screen dark:bg-neutral-650 bg-white flex flex-col">
      <Link
        to={matchLogInfraRoute ? INFRA_LOGS_URL(organizationId, clusterId) : ORGANIZATION_URL(organizationId)}
        className="flex w-16 h-16 items-center justify-center border-b z-10 dark:border-neutral-500 border-neutral-200"
      >
        <Icon name={IconEnum.CONSOLE} className="w-9 p-4" />
      
      </Link>

      <div className="flex flex-col justify-between px-2.5 py-5 flex-grow">
        <div className="flex flex-col gap-3">
          <Tooltip content="Environments" side="right">
            <ButtonIcon 
              className={classNames(matchOrganizationRoute ? 'is-active': '')}
              icon={IconEnum.ENVIRONMENT}
              style={ButtonIconStyle.ALT}
              link={projectId ? OVERVIEW_URL(organizationId, projectId) : ORGANIZATION_URL(organizationId)}
            />
          </Tooltip>
        </div>

        <div>
          <div className="flex flex-col gap-3">
            <Tooltip content="Settings" side="right">
              <div>
                <ButtonIcon
                  className={matchSettingsRoute ? 'is-active' : ''}
                  icon={IconAwesomeEnum.WHEEL}
                  style={ButtonIconStyle.ALT}
                  link={SETTINGS_URL(organizationId)}
                />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="flex w-16 h-16 mb-5 items-center justify-center border-t dark:border-neutral-500 border-neutral-200">

        <MenuAccountFeature />
      </div>

    </div>
  )
}