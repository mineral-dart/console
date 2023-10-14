import {
    SETTINGS_GENERAL_URL,
    type Route
} from '@console/routes'

import { PageOrganizationGeneralFeature } from './feature/page-organization-general-feature'

export const ROUTER_SETTINGS: Route[] = [
  {
    path: SETTINGS_GENERAL_URL,
    component: <PageOrganizationGeneralFeature />
  }
]