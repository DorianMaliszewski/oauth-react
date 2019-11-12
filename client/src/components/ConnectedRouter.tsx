import React from "react";
import { Switch, useLocation, Redirect } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
import { routes } from "../routes";
import Login from "../pages/Login";

const ConnectedRouter = (props: any) => {
  const location = useLocation();
  if (
    !localStorage.getItem(AUTH_TOKEN) &&
    location.pathname !== routes.LOGIN.path
  ) {
    return (
      <Redirect
        to={{
          pathname: routes.LOGIN.path,
          state: { from: location.pathname }
        }}
      />
    );
  }
  return <Switch>{props.children}</Switch>;
};

ConnectedRouter.propTypes = {};

export default ConnectedRouter;
