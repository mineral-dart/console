import { EnvironmentModeEnum } from "@console/enums"
import { InputSelect, InputText, ModalCrud } from "@console/ui"
import { FormEvent, useEffect, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"

export interface CreateEnvironmentModalsProps {
  onSubmit: () => void
  clusters?: any[]
  closeModal: () => void
  loading: boolean
}

export function CreateEnvironmentModal({ onSubmit, clusters, closeModal, loading }: CreateEnvironmentModalsProps) {
  const { control } = useFormContext()

  const [environmentModes] = useState([
    { value: 'automatic', label: 'Automatic' },
    { value: EnvironmentModeEnum.DEVELOPMENT, label: 'Development' },
    { value: EnvironmentModeEnum.STAGING, label: 'Staging' },
    { value: EnvironmentModeEnum.PRODUCTION, label: 'Production' },
  ])

  const [clusterItems, setClusterItems] = useState<any[]>([])

  useEffect(() => {
    if (clusters && clusters.length) {
      setClusterItems([
        { label: 'Automatic', value: 'automatic' },
        ...clusters.map((c) => ({ value: c.id , label: c.name })),
      ])
    }
  }, [clusters])

  return (
    <ModalCrud
      title="Create Environment"
      description="Create a new environment and deploy your application on the selected cluster. Cluster can't be changed after creation"
      onClose={closeModal}
      onSubmit={onSubmit}
      loading={loading}
      submitLabel="Create"
    >
      <>

        <Controller 
          name="name"
          control={control}
          rules={{
            required: 'Please enter a value',
          }}
          render={({ field, fieldState: { error }}) => (
            <InputText 
              className="mb-6"
              name={field.name}
              onChange={(event: FormEvent<HTMLInputElement>) => {
                field.onChange(
                  event.currentTarget.value
                    .replace(/[^\w\s\\/]/g, '-') // remove special chars but keep / and \
                    .toLowerCase()
                    .replace(/ /g, '-')
                )
              }}
              value={field.value}
              label="Environment name"
              error={error?.message}
            />
          )}
        />

        {/* <Controller 
          name="mode"
          control={control}
          rules={{
            required: 'Please select a value',
          }}
          render={({ field, fieldState: { error }}) => (
            <InputSelect 
              className="mb-6"
              dataTestId="input-select-mode"
              options={environmentModes}
              onChange={field.onChange}
              value={field.value}
              label="Type"
              portal={true}
            />
          )}
        /> */}
      </>

    </ModalCrud>
  )
} 