import { Route, Routes } from "react-router-dom";
import routes, { adminRoutes, organizerRoutes } from "../helper/routes";
import PublicRoute from "./PublicRoute";
import PrivateRoutes from "./PrivateRoute";
import Layout from "../pages/Layout";
export default function AppRoutes({ role, token }) {
  return (
    <>
      <Route
        path="/"
        element={
          role === "ROLE_ADMIN" ? (
            <AdminRoutes token={token} />
          ) : (
            <OrganizerRoutes token={token} />
          )
        }
      />
      <Route element={<PublicRoute isAuth={token} />}>
        {routes.map((route) => (
          <Route path={route.path} element={route.element} />
        ))}
      </Route>
    </>
  );
}

function AdminRoutes({ token }) {
  return (
    <>
      <Route element={<PrivateRoutes isAuth={token} />}>
        <Route element={<Layout />} path="/">
          {adminRoutes.map((route) => (
            <Route path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>
    </>
  );
}

function OrganizerRoutes({ token }) {
  return (
    <>
      <Route element={<PrivateRoutes isAuth={token} />}>
        <Route element={<Layout />} path="/">
          {organizerRoutes.map((route) => (
            <Route path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>
    </>
  );
}
