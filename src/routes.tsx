import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Homepage from "./screens/Homepage";
import Mappage from "./screens/Map";
import Createpage from "./screens/Create";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/map" component={Mappage} />
        <Route exact path="/map/create" component={Createpage} />
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;
