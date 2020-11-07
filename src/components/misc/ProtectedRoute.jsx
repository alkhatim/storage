import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { path, component: Component, allow, ...rest } = props;
  const { isLoggedIn, isLoading, user } = useSelector(
    (store) => store.authReducer
  );

  if (isLoading) return <div></div>;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedIn ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        ) : allow !== "All" && !allow.includes(user.role) ? (
          <Redirect
            to={{
              pathname: "/forbidden",
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default ProtectedRoute;
