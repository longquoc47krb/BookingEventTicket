import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes({ isAuth }) {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoutes;
