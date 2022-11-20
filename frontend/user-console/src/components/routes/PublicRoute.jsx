import { Outlet, Navigate } from "react-router-dom";

function PublicRoute({ isAuth }) {
  return isAuth ? <Navigate to="/" /> : <Outlet />;
}
export default PublicRoute;
