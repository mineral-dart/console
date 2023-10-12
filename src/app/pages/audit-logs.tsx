import { Icon, Pagination, Table, TableFilterProps, TableHeadProps } from "@console/ui";
import Layout from "../layouts/standard";
import { useState } from "react";
import { IconAwesomeEnum } from "@console/enums";
import { SignalSlashIcon } from "@heroicons/react/20/solid";
import { RowEvent } from "../components/row-event";


export default function AuditLogs () {
  const [filter, setFilter] = useState<TableFilterProps[]>([])
  const [data, setData] = useState([
    {
      "id": "fe277144-bd09-49ac-9bdf-de0a87a6f091",
      "timestamp": "2023-09-21T09:07:10.312138Z",
      "event_type": "CREATE",
      "target_id": "919a97c0-7f68-4603-b6de-70a93807fd09",
      "target_name": "Mineral",
      "target_type": "ORGANIZATION",
      "sub_target_type": "API_TOKEN",
      "change": "{\"id\": \"f5a74427-63a9-40eb-b967-79893aa6d2de\", \"name\": \"test\", \"scope\": \"ADMIN\", \"user_sub\": \"github|64804778\", \"created_at\": 1695287230.307415000, \"description\": \"da\"}",
      "origin": "CONSOLE",
      "triggered_by": "Nathael Bonnal",
      "project_id": null,
      "project_name": null,
      "environment_id": null,
      "environment_name": null,
      "environment_type": null
    },
    {
        "id": "a66d090a-6098-4f84-bad3-937f37dc88c2",
        "timestamp": "2023-09-21T09:07:03.311868Z",
        "event_type": "DELETE",
        "target_id": "2a2d8d23-1452-4119-9b0d-89422236dbf7",
        "target_name": "https://google.Com",
        "target_type": "WEBHOOK",
        "sub_target_type": null,
        "change": "{\"id\": \"2a2d8d23-1452-4119-9b0d-89422236dbf7\", \"kind\": \"STANDARD\", \"events\": [\"DEPLOYMENT_FAILURE\", \"DEPLOYMENT_STARTED\"], \"enabled\": true, \"created_at\": 1695287223.306625000, \"target_url\": \"https://google.Com\", \"updated_at\": 1695287223.306627000, \"description\": \"dazda\", \"target_secret_set\": true, \"project_names_filter\": [], \"environment_types_filter\": [\"STAGING\"]}",
        "origin": "CONSOLE",
        "triggered_by": "Nathael Bonnal",
        "project_id": null,
        "project_name": null,
        "environment_id": null,
        "environment_name": null,
        "environment_type": null
    },
  ])
  const dataHead: TableHeadProps<any>[] = [
    {
      title: 'Timestamp',
      className: 'pl-9'
    },
    {
      title: 'Event',
      filter: [
        {
          title: 'Filter by event',
          key: 'event_type',
          itemsCustom: ["CREATE", "DELETE"],
          hideFilterNumber: true
        }
      ]
    },
    {
      title: 'Target type'
    },
    { title: 'Target' },
    { title: 'Change '},
    { title: 'User'},
    {
      title: 'Source'
    }
  ]

  const columnsWidth = '14% 14% 12% 15% 10% 22% 11%'

  function onPrevious () {

  }

  function onNext () {

  }


  return (
    <Layout layout={{
      label: 'Audit Logs',
      navigation: []
    }}>
      <div className="p-8">
        <div>
          <h1 className="h5">Audit Logs</h1>
        </div>

        <Table
          dataHead={dataHead}
          data={[data]}
          filter={filter}
          setFilter={setFilter}
          className="border border-neutral-200 rounded"
          columnsWidth={columnsWidth}
        >
          { data.length === 0
            ? 
            <div className="flex items-center justify-center text-center py-4 px-5 h-[30vh]">
              <div>
                <SignalSlashIcon className="w-5 text-neutral-350" />
                <p className="text-neutral-350 font-medium text-xs mt-1" data-testid="empty-result">
                  No events found, we retain logs for a maximum of 30 days <br /> Try to change your filters.
                </p>
              </div>
            </div>
            : <>
            { data.map((event, index) => (
              <RowEvent columnsWidth={columnsWidth} event={event} key={index} />
            ))}
            </>
          }

        </Table>
        <Pagination 
          className="pt-4 pb-7"
          onPrevious={onPrevious}
          onNext={onNext}
          nextDisabled={true}
          previousDisabled={false}
          pageSize={"10"}
          onpageSizeChange={(e) => console.log(e)}
        />
        
      </div>
    </Layout>
  )
}