import React, { Component } from "react";
import _ from "lodash";

import { Stats, StatsRegion, StatsUser, StatsTask, StatsContest, loadHome } from "../remote/home";
import Loading from "./Loading";
import RegionTile from "./home/RegionTile";
import UserTile from "./home/UserTile";
import TaskTile from "./home/TaskTile";
import ContestTile from "./home/ContestTile";
import Error from "./Error";

type Props = {};
type State = {
  stats: Stats | null;
  error: XMLHttpRequest | null;
};

const NUM_CARDS = {
  region: 2,
  user: 2,
  task: 2,
  contest: 2,
};

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { stats: null, error: null };
  }

  async componentDidMount() {
    this.setState({ stats: null, error: null });
    try {
      this.setState({ stats: await loadHome(), error: null });
    } catch (error) {
      this.setState({ stats: null, error: error.request });
    }
  }

  renderRegion(stats: StatsRegion[]) {
    return _.sampleSize(stats, NUM_CARDS.region).map((stat, i) => <RegionTile key={`region-${i}`} stat={stat} />);
  }

  renderUser(stats: StatsUser[]) {
    return _.sampleSize(stats, NUM_CARDS.user).map((stat, i) => <UserTile key={`user-${i}`} stat={stat} />);
  }

  renderTask(stats: StatsTask[]) {
    return _.sampleSize(stats, NUM_CARDS.task).map((stat, i) => <TaskTile key={`task-${i}`} stat={stat} />);
  }

  renderContest(stats: StatsContest[]) {
    return _.sampleSize(stats, NUM_CARDS.contest).map((stat, i) => <ContestTile key={`contest-${i}`} stat={stat} />);
  }

  render() {
    if (this.state.error) return <Error error={this.state.error} />;
    if (!this.state.stats) return <Loading />;
    return (
      <div className="HomeContainer p-2">
        <div className="row">
          <div className="col-12">
            <div className="card-columns">
              {this.renderRegion(this.state.stats.region)}
              {this.renderUser(this.state.stats.user)}
              {this.renderTask(this.state.stats.task)}
              {this.renderContest(this.state.stats.contest)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
