import {ProjectEntity} from "@console/interfaces";
import {PropsWithChildren, useEffect} from "react";
import {useLocation, useParams} from "react-router";
import {
  ENVIRONMENTS_DEPLOYMENT_RULES_CREATE_URL,
  ENVIRONMENTS_DEPLOYMENT_RULES_URL,
  ENVIRONMENTS_URL
} from "@console/routes";
import {Button, ButtonSize, Header, Icon, Tabs, useModal} from "@console/ui";
import {IconAwesomeEnum, IconEnum} from "@console/enums";

export interface ContainerProps {
  project?: ProjectEntity
  clusterAvailable?: boolean
}

export default function Container ({ children, project, clusterAvailable }: PropsWithChildren<ContainerProps>) {
  const { organizationId = '', projectId = '' } = useParams()
  const { pathname } = useLocation()
  const { openModal, closeModal } = useModal()

  const isDeploymentRulesTab =
    pathname === `${ENVIRONMENTS_URL(organizationId, projectId)}${ENVIRONMENTS_DEPLOYMENT_RULES_URL}` ||
    pathname === `${ENVIRONMENTS_URL(organizationId, projectId)}${ENVIRONMENTS_DEPLOYMENT_RULES_CREATE_URL}`

  const tabsItems = [
    {
      icon: <Icon name={IconAwesomeEnum.LAYER_GROUP} />,
      name: 'Environments',
      active: pathname === `${ENVIRONMENTS_URL(organizationId, projectId)}/general`,
      link: `${ENVIRONMENTS_URL(organizationId, projectId)}/general`
    },
    {
      icon: <Icon name="icon-solid-browser" className="text-sm text-inherit" />,
      name: 'Deployment Rules',
      active: isDeploymentRulesTab,
      link: `${ENVIRONMENTS_URL(organizationId, projectId)}${ENVIRONMENTS_DEPLOYMENT_RULES_URL}`,
    }

  ]

  const contentTabs = (
    <div className="flex justify-center items-center px-5 border-l h-14 border-neutral-200">
      <Button
        size={ButtonSize.LARGE}
        iconRight={IconAwesomeEnum.CIRCLE_PLUS}
        disabled={!clusterAvailable}
        onClick={() => {
          // openModal({
          //   content: (
          //     <CreateCloneEnvironmentModalFeature
          //       onClose={closeModal}
          //       projectId={projectId}
          //       organizationId={organizationId}
          //     />
          //   ),
          // })
        }}
      >
        New environment
      </Button>
    </div>
  )

  useEffect(() => {
    console.log(project);
    
  }, [project])

  return (
    <>
      <Header title={project?.name} icon={IconEnum.ENVIRONMENT} />
      <Tabs items={tabsItems} contentRight={!isDeploymentRulesTab && contentTabs} />
      <div className="flex-grow flex-col flex">{children}</div>
    </>
  )
}