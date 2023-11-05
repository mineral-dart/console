import { Environment } from "@console/interfaces";
import { TableFilterProps, TableHeadProps, TableRow, Tooltip, Skeleton, TagMode } from "@console/ui"


export interface TableRowEnvironmentsProps {
  data: Environment
  filter: TableFilterProps[]
  dataHead: TableHeadProps<Environment>[]
  link: string
  columnsWidth?: string
  isLoading?: boolean
}

export function TableRowEnvironments(props: TableRowEnvironmentsProps) {
  const {
    data,
    dataHead,
    columnsWidth = `repeat(${dataHead.length},minmax(0,1fr))`,
    link,
    filter,
    isLoading = false,
  } = props

  return (
    <TableRow data={data} filter={filter} columnsWidth={columnsWidth} link={link} disabled={isLoading}>
      <> 
      <div className="flex items-center px-4">
          {/* <EnvironmentStateChip mode="running" environmentId={data.id} /> */}

          <Skeleton show={isLoading} width={400} height={16} truncate>
            <span className="text-sm text-neutral-400 font-medium truncate">{data.name}</span>
          </Skeleton>
        </div>
        <div className="flex justify-end justify-items-center px-3">
          <Skeleton show={isLoading} width={200} height={16}>
            <div className="flex items-center gap-3">
              {/* <EnvironmentDeploymentStatusLabel environmentId={data.id} />
              <EnvironmentButtonsActions environment={data} hasServices={true} /> */}
            </div>
          </Skeleton>
        </div>
        <div className="flex items-center px-4 border-b-neutral-200 border-l h-full">
          <Skeleton show={isLoading} width={30} height={16}>
            <TagMode status={data.mode} />
          </Skeleton>
        </div> 
      </>
    </TableRow>
  )
}