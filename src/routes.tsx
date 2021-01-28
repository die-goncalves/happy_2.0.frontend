import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Homepage from "./screens/Homepage";
import Mappage from "./screens/Map";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/map" component={Mappage} />
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;
