import { FormProvider, useForm } from "react-hook-form"
import { CreateEnvironmentModal } from "./create-environment-modal"
import { useState } from "react"
import { useCreateEnvironment } from "@console/domains/environment"
import { useModal } from "@console/ui"
import { useNavigate } from "react-router"
import { Environment } from "@console/interfaces"
import { SERVICES_GENERAL_URL, SERVICES_URL } from "@console/routes"

export interface CreateEnvironmentModalFeatureProps {
  onClose: () => void
  projectId: string
  organizationId: string
}

export function CreateEnvironmentModalFeature ({ onClose, projectId, organizationId }: CreateEnvironmentModalFeatureProps) {
  const [loading, setLoading] = useState(false)

  const { enableAlertClickOutside } = useModal()

  const clusters: any[] = []

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      cluster: 'automatic',
      mode: 'automatic'
    }
  })

  methods.watch(() => enableAlertClickOutside(methods.formState.isDirty))

  const navigate = useNavigate()
  const createEnvironment = useCreateEnvironment(
    (result: Environment) => {
      //navigate(SERVICES_URL(organizationId, projectId, result.id) + SERVICES_GENERAL_URL)
      onClose()
    },
    () => setLoading(false)
  )

  const onSubmit = methods.handleSubmit(async (data) => {
    const dataFormatted: { name: string; cluster?: string; mode?: string } = {
      name: data.name,
      cluster: data.cluster,
      mode: data.mode,
    }

    if (dataFormatted.cluster === 'automatic') delete dataFormatted.cluster

    if (dataFormatted.mode === 'automatic') delete dataFormatted.mode

    setLoading(true)

    createEnvironment.mutate({
      projectId: projectId,
      data: {
        name: dataFormatted.name
      }
    })
  })

  return (
    <FormProvider {...methods}>
      <CreateEnvironmentModal 
        loading={loading}
        closeModal={onClose}
        onSubmit={onSubmit}
        clusters={clusters}
      />
    </FormProvider>
  )
}