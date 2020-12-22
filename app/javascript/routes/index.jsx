import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/home";
import Recipes from "../components/recipes";
import Login from "../components/login";
import Qrcode from "../components/qrcode";
import TFA from "../components/enable_tfa";
import Logout from "../components/logout";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/recipes" exact component={Recipes} />
      <Route path="/login" exact component={Login} />
      <Route path="/qrcode" exact component={Qrcode} />
      <Route path="/enable_tfa" exact component={TFA} />
      <Route path="/logout" exact component={Logout} />
    </Switch>
  </Router>
);
