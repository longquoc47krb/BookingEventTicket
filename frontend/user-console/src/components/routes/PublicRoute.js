import { Navigate } from "react-router-dom";

const PublicRoute = ({ user, children }) => {
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default PublicRoute;
