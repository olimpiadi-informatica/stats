import React, { Component } from "react";

import { ContestantCard } from "../components";
import { NewsCard } from "../components";
import { RegionCard } from "../components";
import { TaskCard } from "../components";
import { ContestCard } from "../components";

class HomeContainer extends Component {
  render() {
    return (
      <div className="HomeContainer p-2">
        <div className="row">
          <div className="col-12">
            <div className="card-columns">
              <NewsCard />
              <ContestantCard />
              <RegionCard />
              <TaskCard />
              <ContestCard />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContainer;
