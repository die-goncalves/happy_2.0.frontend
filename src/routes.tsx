import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Homepage from "./screens/Homepage";
import Mappage from "./screens/Map";
import Createpage from "./screens/Create";
import Successpage from "./screens/Success";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/map" component={Mappage} />
        <Route exact path="/map/create" component={Createpage} />
        <Route exact path="/map/create/success" component={Successpage} />
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;
