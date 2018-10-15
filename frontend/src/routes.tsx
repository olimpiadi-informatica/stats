import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Contests from "./components/Contests";
import Contest from "./components/Contest";
import Contestants from "./components/Contestants";
import Contestant from "./components/Contestant";
import Tasks from "./components/Tasks";
import Task from "./components/Task";
import Regions from "./components/Regions";
import Region from "./components/Region";
import Search from "./components/Search";
import Contribute from "./components/Contribute";
import About from "./components/About";

export default function Routes() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/contests" component={Contests} />
            <Route path="/contest/:year" component={Contest} />
            <Route path="/contestants" component={Contestants} />
            <Route path="/contestant/:id" component={Contestant} />
            <Route path="/tasks" component={Tasks} />
            <Route path="/task/:year/:name" component={Task} />
            <Route path="/regions" component={Regions} />
            <Route path="/region/:id" component={Region} />
            <Route path="/search/:q" component={Search} />
            <Route path="/contribute" component={Contribute} />
            <Route path="/about" component={About} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}
