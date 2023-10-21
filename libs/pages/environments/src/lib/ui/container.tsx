import {ProjectEntity} from "@console/interfaces";
import {PropsWithChildren} from "react";
import {useLocation, useParams} from "react-router";
import {
  ENVIRONMENTS_DEPLOYMENT_RULES_CREATE_URL,
  ENVIRONMENTS_DEPLOYMENT_RULES_URL,
  ENVIRONMENTS_URL
} from "@console/routes";
import {Icon} from "@console/ui";
import {IconAwesomeEnum} from "@console/enums";

export interface ContainerProps {
  project?: ProjectEntity
  clusterAvailable?: boolean
}

export default function Container ({ children, project, clusterAvailable }: PropsWithChildren<ContainerProps>) {
  const { organizationId = '', projectId = '' } = useParams()
  const { pathname } = useLocation()

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
}