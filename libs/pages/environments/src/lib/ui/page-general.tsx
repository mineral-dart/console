import { IconAwesomeEnum } from "@console/enums"
import { Button, ButtonSize, EmptyState, useModal } from "@console/ui"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { CreateEnvironmentModalFeature } from '@console/shared'

export interface PageGeneralProps {
  environments: any[]
  isLoading?: boolean
  clusterAvailable?: boolean
}

export function PageGeneral ({ environments, isLoading, clusterAvailable }: PageGeneralProps) {
  const { organizationId = '', projectId = '' } = useParams()

  const { openModal, closeModal } = useModal()
  const [data, setData] = useState<any[]>([])
  const [filter, setFilter] = useState([])
  const [loading, setLoading] = useState<boolean | undefined>(isLoading)

  useEffect(() => {
    setData(environments)
    setLoading(isLoading)
  }, [environments, isLoading])

  const tableHead = []

  const columnsWidth = '30% 25% 40%'

  return (
    <>
     { environments.length ?
     
      (
        <div>
          Environnements
        </div>
      ) : (
        !isLoading && (
          <EmptyState
            className="bg-white rounded-t-sm mt-2 p-10"
            title="Create your first environment 💫"
            description="Please create your environment to start using Mineral and create your first service"
            imageWidth="w-[160px]"
          >
            <Button
              className="mt-5"
              size={ButtonSize.LARGE}
              iconRight={IconAwesomeEnum.CIRCLE_PLUS}
              onClick={() => {
                console.log("open modal");
                
                openModal({
                  content: (
                    <CreateEnvironmentModalFeature
                      onClose={closeModal}
                      projectId={projectId}
                      organizationId={organizationId}
                    />
                  )
                })
              }}
            >
              New environment
            </Button>
          </EmptyState>
        )
      )
    }
    </>
  )
}