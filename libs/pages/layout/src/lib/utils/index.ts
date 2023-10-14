export function setCurrentOrganizationIdOnstorage(organizationId: string): void {
  localStorage.setItem('currentOrganizationId', organizationId)
}

export function setCurrentProjectIdOnStorage(projectId: string): void {
  localStorage.setItem('currentProjectId', projectId)
}