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
import Editpending from "./screens/dashboard/EditPending";
import Deletepage from "./screens/dashboard/Delete";
import Editregistered from "./screens/dashboard/EditRegistered";
import Forgotpage from "./screens/Forgot";
import Resetpage from "./screens/Reset";
import RestrictRoute from "./components/routes/RestrictRoute";

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
        <Route exact path="/dashboard/forgot" component={Forgotpage} />
        <Route exact path="/reset-password" component={Resetpage} />
        <RestrictRoute
          exact
          path="/dashboard/registered"
          component={Registeredpage}
        />
        <RestrictRoute
          exact
          path="/dashboard/registered/delete/:_id"
          component={Deletepage}
        />
        <RestrictRoute
          exact
          path="/dashboard/registered/update/:_id"
          component={Editregistered}
        />
        <RestrictRoute
          exact
          path="/dashboard/pending"
          component={Pendingpage}
        />
        <RestrictRoute
          exact
          path="/dashboard/pending/:_id"
          component={Editpending}
        />
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;
