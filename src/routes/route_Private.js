import React from "react";
import { Switch, Route } from "react-router-dom";

import Profile from "../components/private/Profile/Profile";
import Start from "../components/private/Start/Start";
import Ilgi from "../components/private/Ilgi/Ilgi";
import Edit from "../components/private/Edit/Edit";

export default (
  <Switch>
    <Route path="/home/ilgi/edit" component={Edit} />
    <Route path="/home/ilgi" component={Ilgi} />
    <Route path="/home/profile" component={Profile} />
    <Route path="/home/start" component={Start} />
  </Switch>
);
