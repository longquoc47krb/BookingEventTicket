import { Navigate } from "react-router-dom";
import { isEmpty } from "../../utils/utils";

const ProtectedRoute = ({ user, children }) => {
  if (isEmpty(user)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default ProtectedRoute;
