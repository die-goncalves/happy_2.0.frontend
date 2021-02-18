import React from "react";

import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect
      to={{
        pathname: "/dashboard/login",
        state: { from: props.path },
      }}
    />
  );
};

export default PrivateRoute;
