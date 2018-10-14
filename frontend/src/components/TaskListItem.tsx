import React, { Component } from "react";
import { Link } from "react-router-dom";

import { ContestDetailTask } from "../remote/contest";

type Props = {
  task: ContestDetailTask;
  year: number;
};

export default class TaskListItem extends Component<Props> {
  render() {
    const { task, year } = this.props;
    const max_score_possible = task.max_score_possible || "N/a";
    const max_score = task.max_score || "N/a";

    return (
      <li className="TaskListItemContainer list-group-item">
        <div className="row">
          <div className="col-12">
            <Link className="text-success" to={`/task/${year}/${task.name}`}>
              <h6>{task.title}</h6>
            </Link>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-12 col-md-7">
            <div className="media">
              <Link to={`/task/${year}/${task.name}`}>
                <img
                  className="mr-3 align-self-start img-fluid"
                  src={`/static/tasks/${year}/${task.name}.png`}
                  alt="Region"
                  onError={(event: any) => {
                    event.target.src = "/static/placeholder.jpg";
                  }}
                  width="125"
                />
              </Link>
              <div className="media-body">
                <dl className="row">
                  <dt className="col-sm-6">Year</dt>
                  <dd className="col-sm-6">{year}</dd>
                  <dt className="col-sm-6">Max possible score</dt>
                  <dd className="col-sm-6">{max_score_possible}</dd>
                  <dt className="col-sm-6">Max score</dt>
                  <dd className="col-sm-6">{max_score}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
