import { useParams } from "react-router";

// TODO: Implement breadcrumb feature
export function BreadcrumbFeature () {
  const { organizationId = '', projectId = '', environmentId = '' } = useParams()


  return (
    <>
    </>
  )
}