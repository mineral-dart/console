export interface PageOrganizationGeneralProps {
  onSubmit: any
  loading: boolean
  created_at: string
}

export function PageOrganizationGeneral ({ onSubmit, loading, created_at }: PageOrganizationGeneralProps) {
  return (
    <div className="flex flex-col justify-between w-full">
      <div className="p-8 max-w-content-with-navigation-left">
        <h1 className="h5 mb-10 text-neutral-400">General</h1>

      </div>

    </div>
  )
}