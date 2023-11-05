import { IconAwesomeEnum } from "@console/enums"
import { Button, ButtonSize, EmptyState, Table, useModal } from "@console/ui"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { CreateEnvironmentModalFeature } from '@console/shared'
import { TableRowEnvironments } from "./table-row-environments"
import { SERVICES_GENERAL_URL, SERVICES_URL } from "@console/routes"

export interface PageGeneralProps {
  environments: any[]
  isLoading?: boolean
  clusterAvailable?: boolean
}

export function PageGeneral ({ environments, isLoading, clusterAvailable }: PageGeneralProps) {
  const { organizationId = '', projectId = '' } = useParams()

  const { openModal, closeModal } = useModal()
  const [data, setData] = useState<any[]>([])
  const [filter, setFilter] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean | undefined>(isLoading)

  useEffect(() => {
    setData(environments)
    setLoading(isLoading)
  }, [environments, isLoading])

  const tableHead = [
    {
      title: !loading ? `${data?.length} environment${data?.length && data.length > 1 ? 's' : ''}` : `0 environment`,
      className: 'px-4 py-2',
      filter: [
        {
          search: true,
          title: 'Filter by status',
          key: 'status.state',
        },
        {
          title: 'Filter by provider',
          key: 'cloud_provider.provider',
        },
      ],
    },
    {
      title: 'Update',
      className: 'px-4 text-right',
      sort: {
        key: 'updated_at',
      },
    },
    {
      title: 'Type',
      className: 'px-4 py-2 border-b-neutral-200 border-l h-full',
      filter: [
        {
          search: true,
          title: 'Filter by environment type',
          key: 'mode',
        },
      ],
    },
  ]

  const columnWidth = '30% 25% 40%'

  return (
    <>
     { environments.length ?
     
      (
        <Table
          dataHead={tableHead}
          data={environments}
          setFilter={setFilter}
          filter={filter}
          setDataSort={setData}
          className="mt-2 bg-white rounded-sm flex-grow overflow-y-auto min-h-0"
          columnsWidth={columnWidth}
          defaultSortingKey="name"
        >
          <>
          { data.map((currentData) => (
            <TableRowEnvironments 
              key={currentData.id}
              data={currentData}
              filter={filter}
              dataHead={tableHead}
              link={`${SERVICES_URL(organizationId, projectId, currentData.id)}${SERVICES_GENERAL_URL}`}
              columnsWidth={columnWidth}
              isLoading={loading}
            />
          ))}
          </>
        </Table>
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