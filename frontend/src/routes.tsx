import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import List from "./pages/List";
import Logon from "./pages/Logon";
import Register from "./pages/Register";
import Event from "./pages/CreateEvent";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />

        <Route path="/list" exact component={List} />
        <Route path="/create" component={Event} />
      </Switch>
    </BrowserRouter>
  );
}
