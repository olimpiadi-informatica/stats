import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";

import {
  SearchResult,
  SearchResultRegion,
  SearchResultUser,
  SearchResultContest,
  SearchResultTask,
  loadSearchResults
} from "../remote/search";
import Loading from "./Loading";
import RegionListItem from "./RegionListItem";
import ContestantListItem from "./ContestantListItem";
import ContestListItem from "./ContestListItem";
import TaskListItem from "./TaskListItem";

type Props = RouteComponentProps<any>;
type State = {
  results: SearchResult[] | null;
};

export default class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { results: null };
  }

  async componentDidMount() {
    this.setState({ results: null });
    this.setState({
      results: await loadSearchResults(this.props.match.params.q)
    });
  }

  async componentDidUpdate(prevProps: Props) {
    const q = this.props.match.params.q;
    if (q !== prevProps.match.params.q) {
      this.setState({ results: null });
      this.setState({
        results: await loadSearchResults(this.props.match.params.q)
      });
    }
  }

  renderResult(result: SearchResult) {
    if (result.hasOwnProperty("region")) {
      const region = (result as SearchResultRegion).region;
      return <RegionListItem key={region.id} region={region} />;
    } else if (result.hasOwnProperty("user")) {
      const user = (result as SearchResultUser).user;
      return <ContestantListItem key={user.contestant.id} contestant={user} />;
    } else if (result.hasOwnProperty("contest")) {
      const contest = (result as SearchResultContest).contest;
      return <ContestListItem key={contest.year} contest={contest} />;
    } else if (result.hasOwnProperty("task")) {
      const { year, task } = (result as SearchResultTask).task;
      return (
        <TaskListItem key={`${task.name}-${year}`} task={task} year={year} />
      );
    } else {
      throw Error(`Invalid search result ${result}`);
    }
  }

  render() {
    if (!this.state.results) return <Loading />;
    const { q } = this.props.match.params;
    const num_result = this.state.results.length;
    const results = this.state.results.map(res => this.renderResult(res));
    return (
      <div className="row p-2">
        <h2 className="col-12 text-center text-danger">
          {num_result} {num_result === 1 ? "result" : "results"} for{" "}
          <span className="text-success">{q}</span>
        </h2>
        <div className="col-12">
          <ul className="list-group list-group-flush">{results}</ul>
        </div>
      </div>
    );
  }
}
