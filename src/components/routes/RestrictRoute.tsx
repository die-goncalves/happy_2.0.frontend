import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

interface RoutePrivateProps {
  component: React.FC;
  path: string;
  exact: boolean;
}

function RestrictRoute({ component, exact, path }: RoutePrivateProps) {
  const { isLoggedIn, isLoading } = useAuth();

  function definition(loading: boolean, logged: boolean) {
    if (loading === false) {
      if (logged === true) {
        return <Route path={path} exact={exact} component={component} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/dashboard/login",
              state: { from: path },
            }}
          />
        );
      }
    }
  }

  return <>{definition(isLoading, isLoggedIn)}</>;
}

export default RestrictRoute;
