import {IRouter} from "@console/interfaces";
import {Route, Routes} from "react-router";
import Home from "./pages";
import SettingHome from "./pages/settings";
import SettingsMembers from "./pages/settings/team/members";
import AuditLogs from "./pages/audit-logs";

export default function Router () {
  const routes: IRouter[] = [
    { uid: 'home', href: '/', component: <Home />},
    { uid: 'audit-logs', href: '/audit-logs', component: <AuditLogs />},

    { uid: 'settings/general', href: '/settings/general', component: <SettingHome />},
    { uid: 'settings/members', href: '/settings/members', component: <SettingsMembers />},
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
    </Routes>
  )
}