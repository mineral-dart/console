import { ProjectEntity } from "../domains/project.entity";
import { DefaultEntityState } from "./default-entity-state.interface";

export interface ProjectsState extends DefaultEntityState<ProjectEntity> {
  joinOrganizationProject: Record<string, string[]>
}