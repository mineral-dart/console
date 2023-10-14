import {IRouter} from "@console/interfaces";
import {Navigate, Route, Routes} from "react-router";
import Home from "./pages";
import SettingHome from "./pages/settings";
import SettingsMembers from "./pages/settings/team/members";
import AuditLogs from "./pages/audit-logs";
import LoginPage from "./pages/login";
import { ReactNode } from "react";
import { PageSettings } from '@console/pages/settings'
import { SETTINGS_URL } from '@console/routes'
import { Layout } from '@console/pages/layout'

interface RouterProps {
  path: string
  component: ReactNode
  protected: boolean
  layout: boolean
  darkMode?: boolean
  topBar?: boolean
}

export const ROUTER: RouterProps[] = [
  {
    path: `${SETTINGS_URL()}/*`,
    component: <PageSettings />,
    protected: true,
    layout: true,
    topBar: false,
  },
]
export default function Router () {
  const routes: IRouter[] = [
    { uid: 'home', href: '/', component: <Home />},
    { uid: 'audit-logs', href: '/audit-logs', component: <AuditLogs />},

    //{ uid: 'settings/general', href: '/settings/general', component: <SettingHome />},
    //{ uid: 'settings/members', href: '/settings/members', component: <SettingsMembers />},

    //{ uid: 'organization', href: '/organization/:organizationId/settings/general', component: <SettingHome />},

    { uid: 'login', href: '/login', component: <LoginPage />},
  ]

  return (
    <Routes>


      <Route path={"/"}>
        { routes.map((route) => (
          <Route
            key={route.uid}
            path={route.href}
            element={route.component}
          />
        ))}
      </Route>

      { ROUTER.map((route) =>
        route.layout ?

        <Route 
          key={route.path}
          path={route.path}
          element={
            <Layout>{ route.component }</Layout>
          }
        />

        : 
        <Route
          key={route.path}
          path={route.path}
          element={route.component}
        />
      )}

      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  )
}