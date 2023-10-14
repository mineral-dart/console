import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState } from "@console/redux"
import { useEffect, useState } from "react"
import { PageOrganizationGeneral } from "../ui/page-organization-general"
import { type AppDispatch } from '@console/state/store'
import { selectAllOrganization } from "@console/domains/organization"

export function PageOrganizationGeneralFeature() {
  const { organizationId = '' } = useParams()
  
  //const organization = useSelector((state: RootState) => state.organizations.organizations[0])

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const organization = useSelector(selectAllOrganization)

  function onSubmit () {}

  useEffect(() => {
    console.log(organization);
    
  }, [organization])

  // useEffect(() => {

  // }, [organization?.name])


  return (
    <div>
      <PageOrganizationGeneral 
        onSubmit={onSubmit}
        loading={loading}
        created_at={''}
      />
    </div>
  )
}

export default PageOrganizationGeneralFeature