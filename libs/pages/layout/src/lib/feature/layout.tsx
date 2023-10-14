import { PropsWithChildren, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { setCurrentOrganizationIdOnstorage, setCurrentProjectIdOnStorage } from "../utils"
import LayoutPage from "../ui/layout-page"
import { useAuth } from "@console/auth"
import { updateUserState } from "@console/redux"
import { fetchOrganization, selectAllOrganization } from '@console/domains/organization'
import { type AppDispatch, type RootState } from '@console/state/store'

export interface LayoutProps {
  topBar?: boolean
}

export function Layout ({ topBar, children }: PropsWithChildren<LayoutProps>) {
  const { organizationId = '', projectId = '', environmentId = '', versionId } = useParams()

  const dispatch = useDispatch<AppDispatch>()

  const { useMe } = useAuth()
  const { data: user } = useMe()

  useEffect(() => {  
    dispatch(fetchOrganization())
      .unwrap()
      .then((data) => {
        console.log(data);
        
      })    
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(updateUserState(user))
    }
  }, [user])

  const clusters: any[] = []
  const organizations: any[] = useSelector(selectAllOrganization)

  const environment = {}

  useEffect(() => {
    setCurrentOrganizationIdOnstorage(organizationId)
    setCurrentProjectIdOnStorage(projectId)
  }, [projectId, organizationId])

  useEffect(() => {
    console.log(organizations);
  }, [organizations])

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