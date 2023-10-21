import { ReactNode } from "react"
import { useParams } from "react-router-dom"
import {Modal, NavigationLeft, NavigationLeftLinkProps, useModal} from "@console/ui"
export interface ContainerProps {
  children: ReactNode
  organizationLinks: NavigationLeftLinkProps[]
  projectLinks: NavigationLeftLinkProps[]
}

export function Container ({ children, organizationLinks, projectLinks }: ContainerProps) {
  const { organizationId = '' } = useParams()
  const { openModal, closeModal } = useModal()

  return (
    <div className="bg-white flex rounded-t">
      <div className="w-72 border-r border-neutral-200 relative shrink-0 min-h-[calc(100vh-10)] pb-10">
        <div className="sticky top-7">
          <NavigationLeft title="Organization" links={organizationLinks} className="py-6" />
          <NavigationLeft
            title="Projects"
            links={projectLinks}
            className="py-6 border-t border-neutral-200"
            link={{
              title: 'New',
              onClick: () => {
                console.log("OPEN MODAL");
                openModal({
                  content: <CreateProjectModalFeature onClose={closeModal} organizationId={organizationId} />
                  //content: <div>Bonjour</div>
                })
                // TODO OPEN MODAL
              }
            }}
          />
        </div>
      </div>

      <div>{ children }</div>
    </div>
  )
}


function CreateProjectModalFeature ({ onClose, organizationId }) {
  return (
    <div>
      Bonjour
    </div>
  )

}