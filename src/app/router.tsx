import {Navigate, Route, Routes} from "react-router"
import { ReactNode } from "react"
import { PageSettings } from '@console/pages/settings'
import {ENVIRONMENTS_URL, SETTINGS_URL} from '@console/routes'
import { Layout } from '@console/pages/layout'
import { PageLogin } from '@console/pages/login'

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
  // {
  //   path: `${ENVIRONMENTS_URL()}/*`,
  //   component: <
  // }
]
export default function Router () {
  return (
    <Routes>


      {/* <Route path={"/"}>
        { routes.map((route) => (
          <Route
            key={route.uid}
            path={route.href}
            element={route.component}
          />
        ))}
      </Route> */}

      <Route path="/login"  element={<PageLogin />} />

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