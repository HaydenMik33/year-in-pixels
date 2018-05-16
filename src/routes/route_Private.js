import React from "react";
import { Switch, Route } from "react-router-dom";
import Profile from "../components/private/Profile/Profile";
import Start from "../components/private/Start/Start";
import Ilgi from "../components/private/Ilgi/Ilgi";
import Edit from "../components/private/Edit/Edit";
import Setting from "../components/private/Setting/Setting";
import Graph from "../components/private/Graph/Graph";
import Inbox from "../components/MyExtras/Inbox";
import Event_Add from "../components/MyExtras/Event/Event_Add/Event_Add";
import Welcome from "../components/public/Welcome/Welcome";
import Home from "../components/private/Home/Home";
export default (
  <Switch>
    <Route exact path="/" component={Welcome} />
    <Route path="/home" component={Home} />
    <Route path="/home/ilgi/edit" component={Edit} />
    <Route path="/home/ilgi" component={Ilgi} />
    <Route path="/home/setting" component={Setting} />
    <Route path="/home/profile" component={Profile} />
    <Route path="/home/start" component={Start} />
    <Route path="/home/graph" component={Graph} />
    <Route path="/home/inbox/addEvent" component={Event_Add} />
    <Route path="/home/inbox" component={Inbox} />
  </Switch>
);
