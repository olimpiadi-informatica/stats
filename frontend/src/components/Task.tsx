import React, { Component } from "react";
import _ from "lodash";
import { RouteComponentProps } from "react-router-dom";

import { TaskDetail, loadTaskDetail } from "../remote/task";
import Loading from "./Loading";
import Error from "./Error";
import ContestantLink from "./ContestantLink";
import { round } from "../utils/math";

type Props = RouteComponentProps<any>;
type State = {
  task: TaskDetail | null;
  error: XMLHttpRequest | null;
};

export default class Task extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { task: null, error: null };
  }

  async componentDidMount() {
    const { year, name } = this.props.match.params;
    this.setState({ task: null });
    try {
      this.setState({ task: await loadTaskDetail(year, name), error: null });
    } catch (error) {
      this.setState({ task: null, error: error.request });
    }
  }

  renderRanking(task: TaskDetail) {
    const scores_lists = task.scores.map(score => {
      const score_point = score.score !== null ? round(score.score, 2) : "N/a";
      return (
        <tr key={score.contestant.id}>
          <th scope="row">{score.rank || "N/a"}</th>
          <td>
            <ContestantLink contestant={score.contestant} ioi={score.ioi} />
          </td>
          <td>{score_point}</td>
        </tr>
      );
    });
    return (
      <div>
        <h3 className="text-center p-2 text-danger">Ranking</h3>
        <table className="table table-responsive-xs">
          <thead className="bg-success text-white">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Contestant</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>{scores_lists}</tbody>
        </table>
      </div>
    );
  }

  render() {
    if (this.state.error) return <Error error={this.state.error} />;
    if (!this.state.task) return <Loading />;

    const { task } = this.state;
    const { year, name } = task.navigation.current;

    const link = task.link ? (
      <a target="_blank" href={task.link}>
        {task.link}
      </a>
    ) : (
      <em>Not available yet</em>
    );
    const max_score_possible = task.max_score_possible || "N/a";

    return (
      <div>
        <div className="row p-2">
          <div className="col-12 ">
            <h2 className="title text-center text-danger">{task.title}</h2>
          </div>
        </div>
        <div className="row ">
          <div className="col-12 col-md-7">
            <div className="media">
              <img
                className="mr-3 align-self-start img-fluid"
                src={`/static/tasks/${year}/${name}.png`}
                alt="Task"
                onError={(event: any) => {
                  event.target.src = "/static/placeholder.jpg";
                }}
                width="125"
              />
              <div className="media-body">
                <dl className="row">
                  <dt className="col-sm-6">Try this Problem</dt>
                  <dd className="col-sm-6">{link}</dd>
                  <dt className="col-sm-6">Max possible score</dt>
                  <dd className="col-sm-6">{max_score_possible}</dd>
                  <dt className="col-sm-6">Number of Contestants</dt>
                  <dd className="col-sm-6">{task.scores.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">{this.renderRanking(task)}</div>
        </div>
      </div>
    );
  }
}
