import { Routes, useParams, Route, Navigate } from "react-router"
import { Container } from "./ui/container"
import { ROUTER_SETTINGS } from "./router"
import {
  SETTINGS_GENERAL_URL,
  SETTINGS_MEMBERS_URL, SETTINGS_PROJECT_DANGER_ZONE_URL, SETTINGS_PROJECT_GENERAL_URL,
  SETTINGS_PROJECT_URL,
  SETTINGS_ROLES_URL,
  SETTINGS_URL
} from "@console/routes"
import {useSelector} from "react-redux";
import {selectAllProjects} from "@console/domains/project";
import {IconAwesomeEnum} from "@console/enums";

export function PageSettings () {
  const { organizationId = '' } = useParams()

  const pathSettings = SETTINGS_URL(organizationId)
  const projects = useSelector(selectAllProjects)

  const organizationLinks: any[] = [
    {
      title: 'General',
      icon: IconAwesomeEnum.WHEEL,
      url: pathSettings + SETTINGS_GENERAL_URL,
    },
    {
      title: 'Team',
      icon: IconAwesomeEnum.USER_GROUP,
      subLinks: [
        {
          title: 'Members',
          url: pathSettings + SETTINGS_MEMBERS_URL,
        },
        {
          title: 'Roles & permissions',
          url: pathSettings + SETTINGS_ROLES_URL,
        },
      ],
    },
  ]

  const projectLinks: any[] = projects.map((project) => ({
    title: project.name,
    subLinks: [
      {
        title: 'General',
        url: pathSettings + SETTINGS_PROJECT_URL(project.id) + SETTINGS_PROJECT_GENERAL_URL,
      },
      {
        title: 'Danger zone',
        url: pathSettings + SETTINGS_PROJECT_URL(project.id) + SETTINGS_PROJECT_DANGER_ZONE_URL,
      },
    ]
  }))

  return (
    <Container organizationLinks={organizationLinks} projectLinks={projectLinks}>
      <Routes>
        { ROUTER_SETTINGS.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.component}
          />
        ))}

        <Route path="*" element={<Navigate replace to={pathSettings + SETTINGS_GENERAL_URL} />} />
      </Routes>
    </Container>
  )
}

export default PageSettings 