import {FormEventHandler, ReactNode, useEffect} from "react";
import {useForm, useFormContext} from "react-hook-form";
import {ButtonSize, ButtonStyle, Button} from "@console/ui";

export interface ModalCrudProps {
  children: ReactNode
  title: string
  onClose: () => void
  onSubmit: FormEventHandler<HTMLFormElement>
  isEdit?: boolean
  loading?: boolean
  description?: string
  submitLabel?: string
  onDelete?: () => void
  deleteButtonLabel?: string
  howItWorks?: ReactNode
}

export  function ModalCrud (props: ModalCrudProps) {
  const {
    onSubmit,
    onClose,
    loading,
    children,
    title,
    isEdit,
    description,
    onDelete,
    submitLabel,
    deleteButtonLabel,
    howItWorks = null,
  } = props
  const { formState, trigger } = useFormContext()

  useEffect(() => {
    if (isEdit) trigger().then()
  }, [trigger, isEdit])

  return (
    <div className="p-6">
      <h2 className="h4 text-neutral-400 max-w-sm truncate">{title}</h2>
      {description && <p className="mt-1 text-neutral-350 text-sm">{description}</p>}

      <form className="mt-6" onSubmit={onSubmit}>
        {children}
        <div className="flex gap-3 justify-end mt-6">
          {isEdit && onDelete ? (
            <Button
              dataTestId="delete-button"
              className="btn--no-min-w"
              style={ButtonStyle.ERROR}
              size={ButtonSize.XLARGE}
              onClick={() => onDelete()}
            >
              {deleteButtonLabel || 'Delete'}
            </Button>
          ) : (
            <Button
              dataTestId="cancel-button"
              className="btn--no-min-w"
              style={ButtonStyle.STROKED}
              size={ButtonSize.XLARGE}
              onClick={() => onClose()}
            >
              Cancel
            </Button>
          )}
          <Button
            dataTestId="submit-button"
            className="btn--no-min-w"
            type="submit"
            size={ButtonSize.XLARGE}
            disabled={!formState.isValid}
            loading={loading}
          >
            {submitLabel || (isEdit ? 'Confirm' : 'Create')}
          </Button>
        </div>
      </form>
    </div>
  )
}