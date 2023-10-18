import { Route} from "@console/routes";
import {PageLoginFeature} from "./feature/page-login";

export const ROUTER_LOGIN: Route[] = [
  {
    path: '',
    component: <PageLoginFeature />,
  },
 /* {
    path: LOGIN_AUTH_REDIRECT_URL,
    component: <PageRedirectLogin />,
  },*/
]