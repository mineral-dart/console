import { ENVIRONMENTS_GENERAL_URL, Route } from "@console/routes";
import PageGeneralFeature from './feature/page-general-feature'

console.log(PageGeneralFeature);

export const ROUTER_ENVIRONMENTS: Route[] = [
  {
    path: ENVIRONMENTS_GENERAL_URL,
    component: <PageGeneralFeature />,
  }
]