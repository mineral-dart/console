import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@console/state/store";
import {useState} from "react";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {CreateProjectModal} from "./create-project-modal";
import {ENVIRONMENTS_GENERAL_URL, ENVIRONMENTS_URL} from "@console/routes";
import { postProject } from "@console/domains/project";

export interface CreateProjectModalFeatureProps {
  onClose: () => void
  organizationId: string
}

export function CreateProjectModalFeature ({ onClose, organizationId }: CreateProjectModalFeatureProps) {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false)

  const methods = useForm({
    mode: 'onChange',
  })

  const onSubmit = methods.handleSubmit((data: FieldValues) => {
    setLoading(true)

    dispatch(
      postProject({
        organizationId: organizationId,
        name: data['name'],
        description: data['description'],
      })
    )
      .unwrap()
      .then((project) => {
        navigate(ENVIRONMENTS_URL(organizationId, project.id) + ENVIRONMENTS_GENERAL_URL)
        setLoading(false)
        onClose()
      })
      .catch(() => setLoading(false))
  })

  return (
    <FormProvider {...methods}>
      <CreateProjectModal closeModal={onClose} onSubmit={onSubmit} loading={loading} />
    </FormProvider>
  )

}