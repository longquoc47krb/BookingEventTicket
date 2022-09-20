import React from "react";
import { Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.object,
  component: PropTypes.func,
  redirect: PropTypes.string,
  restricted: PropTypes.bool,
};

const defaultProps = {
  restricted: false,
  redirect: "/login",
  isAuthenticated: false,
};

const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  redirect: pathname,
  restricted,
  children,
  ...rest
}) => {
  if (!children && !Component)
    throw new Error(
      "Please pass component props or children in PrivateRoute Component."
    );
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && !restricted ? (
          Component ? (
            <Component {...props} />
          ) : (
            children
          )
        ) : (
          <Navigate to={{ pathname, state: { from: props.location } }} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = propTypes;
PrivateRoute.defaultProps = defaultProps;

export default PrivateRoute;
