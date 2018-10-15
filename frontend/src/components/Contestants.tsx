import React, { Component } from "react";
import _ from "lodash";

import Loading from "./Loading";
import { ContestantItem, loadContestantsList } from "../remote/user";
import ContestantListItem from "./ContestantListItem";

type Props = {};
type State = {
  users: ContestantItem[] | null;
  cutoff: number;
};

export default class Contestants extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { users: null, cutoff: 50 };
  }

  async componentDidMount() {
    this.setState({ users: null, cutoff: 50 });
    this.setState({
      ...this.state,
      users: _.orderBy(
        await loadContestantsList(),
        ["num_medals.gold", "num_medals.silver", "num_medals.bronze"],
        ["desc", "desc", "desc"]
      )
    });
  }

  moreContestants() {
    this.setState({ ...this.state, cutoff: this.state.cutoff + 50 });
  }

  render() {
    if (!this.state.users) return <Loading />;
    const show_more_contestants =
      this.state.cutoff < this.state.users.length ? (
        <button
          onClick={this.moreContestants.bind(this)}
          className="btn btn-outline-success mt-2 "
        >
          More contestants
        </button>
      ) : (
        <div />
      );
    const contestant_list = this.state.users
      .slice(0, this.state.cutoff)
      .map(contestant => (
        <ContestantListItem
          key={contestant.contestant.id}
          contestant={contestant}
        />
      ));
    return (
      <div className="row p-2">
        <div className="col-12">
          <h2 className="p-2 text-center text-danger">Hall of Fame</h2>
          <div>
            <ul className="list-group list-group-flush">{contestant_list}</ul>
          </div>
          <div className="text-center">{show_more_contestants}</div>
        </div>
      </div>
    );
  }
}
