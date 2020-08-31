import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../helpers/auth";

const VendorRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && isAuthenticated().user.role === 5 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default VendorRoute;
