import { IOrganization } from '@console/interfaces'
import { INFRA_LOGS_URL } from '@console/routes'
import { useLocation, useNavigate, useParams } from 'react-router'
import { Navigation } from './navigation'
import { TopBar } from './top-bar'
import { classNames } from '@console/utils'
import { PropsWithChildren } from 'react'

export interface LayoutPageProps {
  defaultOrganizationId: string
  topBar?: boolean
  organzation?: IOrganization
  cluster?: any
}

export function LayoutPage ({ defaultOrganizationId, topBar = true, organzation, cluster, children }: PropsWithChildren<LayoutPageProps>) {
  const { organizationId = '' } = useParams()

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const matchLogInfraRoute = pathname.includes(INFRA_LOGS_URL(organizationId, cluster?.id))

  return (
    <main className='dark:bg-neutral-900 dark:h-full bg-neutral-200'>
      <div className="flex">
        <div className="h-full sticky top-0 z-30">
          <Navigation defaultOrganizationId={defaultOrganizationId} clusterNotification={false} />
        </div>

        <div className='w-full'>
          { topBar && <TopBar />}
          <div className={classNames(
            'relative flex flex-col pt-2 px-2 dark:pt-0 dark:px-0'
          )}>
            { children }
          </div>
        </div>
      </div>

    </main>
  )
}

export default LayoutPage