export interface IOrganization {
  id: string
  owner_id: string
  name: string
  description?: string
  logo_url?: string
  created_at: string
}

export interface OrganizationsState {
  organizations: IOrganization[]
  selectedOrganization?: IOrganization
}