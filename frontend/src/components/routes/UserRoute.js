import { Navigate } from "react-router-dom";

export const UserRoute = ({ component: Component, roles, ...props }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    // not logged in so redirect to login page with the return url
    return <Navigate to={"/login"} />;
  }
  // check if route is restricted by role
  if (roles && currentUser.role !== "User") {
    // role not authorised so redirect to home page
    return <Navigate to={"/"} />;
  }

  // authorised so return component
  return <Component {...props} />;
};
