import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Homepage from "./screens/Homepage";
import Mappage from "./screens/Map";
import Createpage from "./screens/Create";
import Successpage from "./screens/Success";
import Loginpage from "./screens/dashboard/Login";
import Registeredpage from "./screens/dashboard/Registered";
import Pendingpage from "./screens/dashboard/Pending";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/map" component={Mappage} />
        <Route exact path="/map/create" component={Createpage} />
        <Route exact path="/map/create/success" component={Successpage} />
        <Route exact path="/dashboard/login" component={Loginpage} />
        <Route exact path="/dashboard/registered" component={Registeredpage} />
        <Route exact path="/dashboard/pending" component={Pendingpage} />
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;
