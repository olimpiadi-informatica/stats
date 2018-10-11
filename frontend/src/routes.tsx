import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import HomeContainer from "./components/HomeContainer";
import ContestsContainer from "./components/ContestsContainer";

function Routes() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/contests" component={ContestsContainer} />
            <Route path="/" component={HomeContainer} />
          </Switch>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default Routes;

// import React from "react";
// import { ContestsContainer, ContestContainer } from "../containers";
// import { ContestantsContainer, ContestantContainer } from "../containers";
// import { TasksContainer, TaskContainer } from "../containers";
// import { RegionsContainer, RegionContainer } from "../containers";
// import {
// HomeContainer,
// SearchContainer,
// ContributeContainer
// } from "../containers";
// import { Header, About } from "../components/";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import styled from "styled-components";

// const Container = styled.div`text-align: center;`

// import ReactGA from "react-ga";
// ReactGA.initialize("UA-126101681-1");

// function fireTracking() {
// ReactGA.pageview(window.location.hash);
// }

// function Routes() {
//   return (
//     <div>
//       <BrowserRouter onUpdate={fireTracking}>
//         <div>
//           <Header />
//           <Switch>
//             <Route path="/contests" component={ContestsContainer} />
//             <Route path="/contest/:year" component={ContestContainer} />
//             <Route path="/contestant/:id" component={ContestantContainer} />
//             <Route path="/contestants" component={ContestantsContainer} />
//             <Route path="/tasks" component={TasksContainer} />
//             <Route path="/task/:year/:name" component={TaskContainer} />
//             <Route path="/regions" component={RegionsContainer} />
//             <Route path="/region/:id" component={RegionContainer} />
//             <Route path="/search/:q" component={SearchContainer} />
//             <Route path="/contribute" component={ContributeContainer} />
//             <Route path="/about" component={About} />
//             <Route path="/" component={HomeContainer} />
//           </Switch>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// }
//
// export default Routes;
