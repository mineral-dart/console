import { PropsWithChildren, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { setCurrentOrganizationIdOnstorage, setCurrentProjectIdOnStorage } from "../utils"
import LayoutPage from "../ui/layout-page"
import { useAuth } from "@console/auth"
import { updateUserState } from "@console/redux"

export interface LayoutProps {
  topBar?: boolean
}

export function Layout ({ topBar, children }: PropsWithChildren<LayoutProps>) {
  const { organizationId = '', projectId = '', environmentId = '', versionId } = useParams()

  const dispatch = useDispatch()

  const { useMe } = useAuth()
  const { data: user } = useMe()

  useEffect(() => {
    if (user) {
      dispatch(updateUserState(user))
    }
  }, [user])

  const clusters: any[] = []
  const organizations: any[] = []

  const environment = {}

  useEffect(() => {
    setCurrentOrganizationIdOnstorage(organizationId)
    setCurrentProjectIdOnStorage(projectId)
  }, [projectId, organizationId])

  return (
    <LayoutPage 
      topBar={topBar} 
      cluster={clusters[0]} 
      defaultOrganizationId={organizations[0]?.id || ''}
    >
      <>
        { children }
      </>
    </LayoutPage>
  )
}

export default Layout