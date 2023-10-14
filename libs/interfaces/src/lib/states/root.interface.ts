import { OrganizationState } from "./organizations.interface"

export type RootState = {
  entities: {
    organization: OrganizationState
  }
}