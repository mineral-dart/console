import { Route, Routes } from "react-router";
import { ROUTER_LOGIN } from "./router";

export function PageLogin () {
  return (
    <Routes>
      { ROUTER_LOGIN.map((route) => (
        <Route key={route.path} path={route.path} element={route.component} />
      ))}
    </Routes>
  )
}