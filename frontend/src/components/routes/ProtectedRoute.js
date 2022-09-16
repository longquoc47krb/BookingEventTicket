import React from "react";
import { Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.object,
  component: PropTypes.func,
  redirect: PropTypes.string,
  restricted: PropTypes.bool,
};

const defaultProps = {
  restricted: false,
  redirect: "/",
};

const ProtectedRoute = ({
  component: Component,
  redirect: pathname,
  restricted,
  children,
  ...rest
}) => {
  if (!children && !Component)
    throw new Error(
      "Please pass component props or children in ProtectedRoute Component."
    );
  return (
    <Route
      {...rest}
      render={(props) =>
        !restricted ? (
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

ProtectedRoute.propTypes = propTypes;
ProtectedRoute.defaultProps = defaultProps;

export default ProtectedRoute;
