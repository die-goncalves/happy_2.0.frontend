import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Homepage from "./screens/Homepage";
import Mappage from "./screens/Map";
import Createpage from "./screens/Create";
import Successpage from "./screens/Success";
import Detailpage from "./screens/Detail";
import Loginpage from "./screens/dashboard/Login";
import Registeredpage from "./screens/dashboard/Registered";
import Pendingpage from "./screens/dashboard/Pending";
import PrivateRoute from "./components/routes/PrivateRoute";
import Editpending from "./screens/dashboard/EditPending";
import Deletepage from "./screens/dashboard/Delete";
import Editregistered from "./screens/dashboard/EditRegistered";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/map" component={Mappage} />
        <Route exact path="/map/create" component={Createpage} />
        <Route exact path="/map/create/success" component={Successpage} />
        <Route exact path="/orphanage/:_id" component={Detailpage} />
        <Route exact path="/dashboard/login" component={Loginpage} />
        <PrivateRoute
          exact
          path="/dashboard/registered"
          component={Registeredpage}
        />
        <PrivateRoute
          exact
          path="/dashboard/registered/delete/:_id"
          component={Deletepage}
        />
        <PrivateRoute
          exact
          path="/dashboard/registered/update/:_id"
          component={Editregistered}
        />
        <PrivateRoute exact path="/dashboard/pending" component={Pendingpage} />
        <PrivateRoute
          exact
          path="/dashboard/pending/:_id"
          component={Editpending}
        />
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;
