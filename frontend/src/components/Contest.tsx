import React, { Component } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import _ from "lodash";

import {
  ContestDetail,
  ContestResults,
  loadContestDetail,
  loadContestResults
} from "../remote/contest";
import ContestantLink from "./ContestantLink";
import Loading from "./Loading";
import TaskListItem from "./TaskListItem";
import Medals from "./Medals";
import ScoreBadge from "./ScoreBadge";
import MedalIcon from "./MedalIcon";
import { round } from "../utils/math";

type Props = RouteComponentProps<any>;
type State = {
  contest: ContestDetail | null;
  results: ContestResults | null;
};

export default class Contest extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { contest: null, results: null };
  }

  async componentDidMount() {
    this.setState({ contest: null, results: null });
    this.setState({
      contest: await loadContestDetail(this.props.match.params.year),
      results: await loadContestResults(this.props.match.params.year)
    });
  }

  renderInfo(contest: ContestDetail) {
    const num_contestants = contest.num_contestants || "N/a";
    const max_score_possible = contest.max_score_possible || "N/a";
    const max_score = contest.max_score || "N/a";
    const avg_score = contest.avg_score ? round(contest.avg_score, 2) : "N/a";

    return (
      <div className="media m-3">
        <img
          className="mr-3 align-self-start img-fluid"
          src={`/static/contests/${contest.navigation.current}.jpg`}
          alt="Contest"
          onError={(event: any) => {
            event.target.src = "/static/placeholder.jpg";
          }}
          width="125"
        />
        <div className="media-body">
          <dl className="row">
            <dt className="col-sm-6 ">Contestants</dt>
            <dd className="col-sm-6">{num_contestants}</dd>
            <dt className="col-sm-6">Max possible score</dt>
            <dd className="col-sm-6">{max_score_possible}</dd>
            <dt className="col-sm-6">Max score</dt>
            <dd className="col-sm-6">{max_score}</dd>
            <dt className="col-sm-6">Avg score</dt>
            <dd className="col-sm-6">{avg_score}</dd>
          </dl>
        </div>
      </div>
    );
  }

  renderTasks(contest: ContestDetail) {
    const { tasks, navigation } = contest;
    const year = navigation.current;

    const tasks_list = tasks.map(task => {
      return <TaskListItem key={task.name} task={task} year={year} />;
    });
    return (
      <div>
        <h3 className="text-center m-3 text-danger">Tasks</h3>
        <div className="row">
          <div className="col-12">
            <ul className="list-group list-group-flush">{tasks_list}</ul>
          </div>
        </div>
      </div>
    );
  }

  renderResults(contest: ContestDetail, results: ContestResults) {
    const tasks = contest.tasks;
    const contestants = _.sortBy(results.results, "rank").map(res => {
      const scores = _.zip(tasks, res.scores).map(([task, score]) => {
        return (
          <td key={res.contestant.id + task!.name}>
            <Link
              to={`/task/${contest.navigation.current}/${task!.name}`}
              className=""
            >
              <ScoreBadge score={score} max_score={task!.max_score_possible} />{" "}
              {task!.name}
            </Link>
          </td>
        );
      });
      return (
        <tr key={res.contestant.id}>
          <th>{res.rank || "N/a"}</th>
          <td>
            <ContestantLink contestant={res.contestant} ioi={res.ioi} />
          </td>
          <td>{round(res.score, 2)}</td>
          {scores}
          <td className="text-center">
            <MedalIcon color={res.medal} fontSize="25px" />
          </td>
          <td>
            <Link className="" to={`/region/${res.region}`}>
              {res.region}
            </Link>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <h3 className="text-center m-3 text-danger">Results</h3>
        <table className="table table-responsive-xs">
          <thead className="bg-success text-white">
            <tr>
              <th>#</th>
              <th>Contestant</th>
              <th>Score</th>
              <th colSpan={tasks.length}>Tasks</th>
              <th className="text-center">Medal</th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>{contestants}</tbody>
        </table>
      </div>
    );
  }

  render() {
    if (!this.state.contest || !this.state.results) return <Loading />;

    const { contest, results } = this.state;
    return (
      <div>
        <div className="row p-2">
          <div className="col-12 ">
            <h2 className="title text-center  text-danger">
              {contest.location.location} {contest.navigation.current}
            </h2>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-12 col-md-7">{this.renderInfo(contest)}</div>
          <Medals medals={contest.medals} cutoffs={true} />
          <div className="col-12">{this.renderTasks(contest)}</div>
          <div className="col-12">{this.renderResults(contest, results)}</div>
        </div>
      </div>
    );
  }
}
