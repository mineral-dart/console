import {IRouter} from "@console/interfaces";
import {Route, Routes} from "react-router";
import Home from "./pages";

export default function Router () {
  const routes: IRouter[] = [
    { uid: 'home', href: '/', component: <Home />},
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