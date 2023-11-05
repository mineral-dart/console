import { useParams } from "react-router";
import { PageGeneral } from "../ui/page-general";
import { ReactNode, useEffect } from "react";
import { useFetchEnvironments } from "@console/domains/environment";

export function PageGeneralFeature () {
  const { organizationId = '', projectId = '' } = useParams()

  const res = useFetchEnvironments(projectId)
  const { data: environments } = res

  return (
    <>
      <PageGeneral 
        environments={environments ||  []}
        clusterAvailable={true}
        isLoading={false}
      />
    </>   
  )
}

export default PageGeneralFeature