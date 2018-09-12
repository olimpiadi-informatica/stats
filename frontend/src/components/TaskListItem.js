import React from "react";
import { Link } from "react-router-dom";

const TaskListItem = ({ task, year }) => {
  if (!task) return <div className="Loading">Loading ...</div>;
  const max_score_possible = task.max_score_possible
    ? task.max_score_possible
    : "N/a";
  const max_score = task.max_score ? task.max_score : "N/a";
  return (
    <li className="TaskListItemContainer list-group-item">
      <div className="row align-items-center">
        <div className="col-12">
          <Link to={`/task/${year}/${task.name}`}>
            <h5>{task.title}</h5>
          </Link>
        </div>
        <div className="col-12 col-md-7">
          <dl className="row">
            <dt className="col-sm-5">Year</dt>
            <dd className="col-sm-7">{year}</dd>
            <dt className="col-sm-5">Max possible score</dt>
            <dd className="col-sm-7">{max_score_possible}</dd>
            <dt className="col-sm-5">Max score</dt>
            <dd className="col-sm-7">{max_score}</dd>
          </dl>
        </div>
      </div>
    </li>
  );
};

export default TaskListItem;
