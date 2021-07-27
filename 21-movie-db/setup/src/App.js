import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Home from "./Home";
import Movie from "./SingleMovie";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/movie/:id" component={Movie} />
        <Route path="*" children={Home} />
      </Switch>
    </Router>
  );
}

export default App;
