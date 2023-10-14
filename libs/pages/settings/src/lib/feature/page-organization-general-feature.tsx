import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { RootState } from "@console/redux"
import { useEffect, useState } from "react"
import { PageOrganizationGeneral } from "../ui/page-organization-general"


export function PageOrganizationGeneralFeature() {
  const { organizationId = '' } = useParams()

  const test = useSelector((state: RootState) => state.organizations)
  console.log(test);
  

  const organization = useSelector((state: RootState) => state.organizations.organizations[0])

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()


  function onSubmit () {}

  useEffect(() => {

  }, [organization?.name])


  return (
    <div>
      <PageOrganizationGeneral 
        onSubmit={onSubmit}
        loading={loading}
        created_at={organization?.created_at || ''}
      />
    </div>
  )
}

export default PageOrganizationGeneralFeature