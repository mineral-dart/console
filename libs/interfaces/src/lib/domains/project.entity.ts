import { OrganizationEntity } from "./organization.entity"

export interface ProjectEntity {
  id: string
  name: string
  description: string
  organizationId: string
  organization: OrganizationEntity
}