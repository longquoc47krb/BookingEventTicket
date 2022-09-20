import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.object,
  component: PropTypes.func,
};

const PublicRoute = ({ component: Component, children, ...rest }) => {
  if (!children && !Component)
    throw new Error(
      "Please pass component props or children in PublicRoute Component."
    );
  return (
    <Route
      {...rest}
      render={(props) => (Component ? <Component {...props} /> : children)}
    />
  );
};

PublicRoute.propTypes = propTypes;

export default PublicRoute;
