import React from "react";
import { Switch, Route } from "react-router-dom";

import Welcome from "../components/public/Welcome/Welcome";
import Home from "../components/private/Home/Home";

export default (
  <Switch>
    <Route exact path="/" component={Welcome} />
    <Route path="/home" component={Home} />
  </Switch>
);
