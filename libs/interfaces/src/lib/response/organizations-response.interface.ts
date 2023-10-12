import {IOrganization} from '../organization.interface'
import {PaginationMeta} from '../pagination.interface'

export interface OrganizationsResponse {
  meta: PaginationMeta
  data: IOrganization
}