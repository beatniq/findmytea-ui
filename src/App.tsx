import React from "react";
import { Switch, Router, Route } from "react-router-dom";
import Callback from "./components/callback";
import Home from "./components/home";
import BrandIndex from "./components/brandIndex";

import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const App = () => (
  <main>
    <Switch>
      <Router history={history}>
        <Route exact path="/" component={Home} />
        <Route exact path="/callback" component={Callback} />
        <Route exact path="/brand" component={BrandIndex} />
      </Router>
    </Switch>
  </main>
);

export default App;
