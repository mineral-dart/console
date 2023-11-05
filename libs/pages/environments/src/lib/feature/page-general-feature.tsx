import { useParams } from "react-router";
import { PageGeneral } from "../ui/page-general";
import { ReactNode } from "react";

export function PageGeneralFeature () {
  const { organizationId = '', projectId = '' } = useParams()

  return (
    <>
      <PageGeneral 
        environments={[]}
        clusterAvailable={true}
        isLoading={false}
      />
    </>   
  )
}

export default PageGeneralFeature