import { Routes, useParams, Route, Navigate } from "react-router"
import { Container } from "./ui/container"
import { ROUTER_SETTINGS } from "./router"
import { SETTINGS_GENERAL_URL, SETTINGS_URL } from "@console/routes"

export function PageSettings () {
  const { organizationId = '' } = useParams()

  const pathSettings = SETTINGS_URL(organizationId)
  const projects = []

  const organizationLinks: any[] = []
  const projectLinks: any[] = []

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