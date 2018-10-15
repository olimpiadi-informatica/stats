import React, { Component } from "react";
import _ from "lodash";

import { loadContestList, ContestItem } from "../remote/contest";
import Loading from "./Loading";
import ContestListItem from "./ContestListItem";

type Props = {};
type State = {
  contests: ContestItem[] | null;
};

export default class Contests extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { contests: null };
  }

  async componentDidMount() {
    this.setState({ contests: null });
    this.setState({ contests: await loadContestList() });
  }

  render() {
    if (!this.state.contests) return <Loading />;

    let contests = _.orderBy(this.state.contests, ["year"], ["desc"]).map(contest => (
      <ContestListItem key={contest.year} contest={contest} />
    ));

    return (
      <div className="row p-2">
        <h2 className="col-12 title text-center text-danger">Contests</h2>
        <div className="col-12">
          <ul className="list-group list-group-flush">{contests}</ul>
        </div>
      </div>
    );
  }
}
