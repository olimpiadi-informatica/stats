import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import HomeComponent from "./components/Home";
import ContestsComponent from "./components/Contests";
import ContestComponent from "./components/Contest";
import ContestantsComponent from "./components/Contestants";
import ContestantComponent from "./components/Contestant";
import TasksComponent from "./components/Tasks";
import TaskComponent from "./components/Task";
import RegionsComponent from "./components/Regions";
import RegionComponent from "./components/Region";
import SearchComponent from "./components/Search";
import ContributeComponent from "./components/Contribute";
import AboutComponent from "./components/About";

export default function Routes() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/contests" component={ContestsComponent} />
            <Route path="/contest/:year" component={ContestComponent} />
            <Route path="/contestants" component={ContestantsComponent} />
            <Route path="/contestant/:id" component={ContestantComponent} />
            <Route path="/tasks" component={TasksComponent} />
            <Route path="/task/:year/:name" component={TaskComponent} />
            <Route path="/regions" component={RegionsComponent} />
            <Route path="/region/:id" component={RegionComponent} />
            <Route path="/search/:q" component={SearchComponent} />
            <Route path="/contribute" component={ContributeComponent} />
            <Route path="/about" component={AboutComponent} />
            <Route path="/" component={HomeComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}
