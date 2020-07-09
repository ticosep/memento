import React from "react";
import { Redirect, Route } from "react-router";

import { useIsAuthorized } from "../stores/hooks/useStore";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthorized = useIsAuthorized();

  console.log(isAuthorized);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthorized ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
};

export default PrivateRoute;
