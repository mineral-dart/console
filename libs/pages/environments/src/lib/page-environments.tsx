import {Navigate, Route, Routes, useParams} from "react-router";
import Container from "./ui/container";
import { ROUTER_ENVIRONMENTS } from "./router";
import { ENVIRONMENTS_GENERAL_URL, ENVIRONMENTS_URL } from "@console/routes";
import { useSelector } from "react-redux";
import { type RootState } from "@console/state/store";
import { ProjectEntity } from "@console/interfaces";
import { getProjectsState  } from "@console/domains/project";

export function PageEnvironments () {
  const { organizationId = '', projectId = '' } = useParams()

  const project = useSelector<RootState, ProjectEntity | undefined>((state) => getProjectsState(state).entities[projectId])
  return (
    <Container project={project} clusterAvailable={true}>
      <Routes>
        {ROUTER_ENVIRONMENTS.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}

        <Route
          path="*"
          element={<Navigate replace to={ENVIRONMENTS_URL(organizationId, projectId) + ENVIRONMENTS_GENERAL_URL} />}
        />
      </Routes>
    </Container>
  )
}