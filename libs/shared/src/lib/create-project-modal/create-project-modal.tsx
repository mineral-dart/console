import { ModalCrud, InputText } from '@console/ui'
import {Controller, useFormContext} from "react-hook-form";

export interface CreateProjectModalProps {
  onSubmit: () => void
  closeModal: () => void
  loading: boolean
}

export function CreateProjectModal ({ onSubmit, closeModal, loading }: CreateProjectModalProps) {
  const { control } = useFormContext()

  return (
    <ModalCrud
      title="New project"
      description="You will have the possibility to modify the parameters once created"
      onClose={closeModal}
      onSubmit={onSubmit}
      submitLabel="Create"
      loading={loading}
    >
      <Controller
        name="name"
        control={control}
        rules={{
          required: 'Please enter a name.',
        }}
        render={({ field, fieldState: { error } }) => (
          <InputText
            className="mb-3"
            dataTestId="input-name"
            label="Project name"
            name={field.name}
            onChange={field.onChange}
            value={field.value}
            error={error?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <InputText
            className="mb-6"
            dataTestId="input-description"
            label="Description"
            name={field.name}
            onChange={field.onChange}
            value={field.value}
          />
        )}
      />

    </ModalCrud>
  )
}