import {IRouter} from "@console/interfaces";
import {Route, Routes} from "react-router";
import Home from "./pages";
import SettingHome from "./pages/settings";
import SettingsMembers from "./pages/settings/team/members";
import AuditLogs from "./pages/audit-logs";
import LoginPage from "./pages/login";

export default function Router () {
  const routes: IRouter[] = [
    { uid: 'home', href: '/', component: <Home />},
    { uid: 'audit-logs', href: '/audit-logs', component: <AuditLogs />},

    { uid: 'settings/general', href: '/settings/general', component: <SettingHome />},
    { uid: 'settings/members', href: '/settings/members', component: <SettingsMembers />},

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
    </Routes>
  )
}