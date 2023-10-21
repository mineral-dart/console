import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@console/state/store";
import {useEffect} from "react";
import {IOrganization, ProjectEntity} from "@console/interfaces";
import {fetchOrganization} from "@console/domains/organization";
import {fetchProjects} from "@console/domains/project";
import { getUserState } from '@console/domains/users'
import {
  ENVIRONMENTS_GENERAL_URL,
  ENVIRONMENTS_URL,
  ORGANIZATION_URL,
  OVERVIEW_URL,
  SETTINGS_GENERAL_URL,
  SETTINGS_URL
} from "@console/routes";
import { getCurrentOrganizationIdFromStorage, getCurrentProjectIdFromStorage, getRedirectLoginUriFromStorage } from "./utils";

export function useRedirectIfLogged () {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const user = useSelector(getUserState)

  useEffect(() => {
   async function fetchData () {
     let organizations: IOrganization[] = []

     try {
       organizations = await dispatch(fetchOrganization()).unwrap()
     } catch (error) {
       console.warn(error)
     }

     if (organizations.length > 0) {
       const organizationId = organizations[0].id
       const projects: ProjectEntity[] = await dispatch(fetchProjects({ organizationId })).unwrap()

       if (projects.length > 0) navigate(ENVIRONMENTS_URL(organizationId, projects[0].id) + ENVIRONMENTS_GENERAL_URL)
       else navigate(SETTINGS_URL(organizationId) + SETTINGS_GENERAL_URL)
     } else {
       // Cas pas d'organization
     }
   }


    console.log(user.isAuthenticated)
   if (user.isAuthenticated) {
      const currentOrganization = getCurrentOrganizationIdFromStorage()
      const currentProject = getCurrentProjectIdFromStorage()
      const redirectLoginUri = getRedirectLoginUriFromStorage()

      if (redirectLoginUri) {
        navigate(redirectLoginUri)
        localStorage.removeItem('redirectLoginUri')
        return
      }

      if (currentOrganization && currentProject) {
        navigate(OVERVIEW_URL(currentOrganization, currentProject))
        return
      }

      fetchData()
   }
  }, [user]);
}