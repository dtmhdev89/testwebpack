import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/home";
import Recipes from "../components/recipes";
import Login from "../components/login";
import Qrcode from "../components/qrcode";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/recipes" exact component={Recipes} />
      <Route path="/login" exact component={Login} />
      <Route path="/qrcode" exact component={Qrcode} />
    </Switch>
  </Router>
);
