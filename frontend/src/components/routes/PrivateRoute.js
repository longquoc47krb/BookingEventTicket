import React from "react";
import { Navigate, useLocation } from "react-router-dom";
const PrivateRoute = ({ children }, props) => {
  const { isAuthenticated } = props;
  const location = useLocation();

  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default PrivateRoute;
