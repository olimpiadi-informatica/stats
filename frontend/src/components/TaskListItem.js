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
      <Link to={`/task/${year}/${task.name}`}>
        <h5>{task.name}</h5>
      </Link>
      <dl className="row">
        <dt className="col-sm-7">Max possible score</dt>
        <dd className="col-sm-5">{max_score_possible}</dd>
        <dt className="col-sm-7">Max score</dt>
        <dd className="col-sm-5">{max_score}</dd>
      </dl>
    </li>
  );
};

export default TaskListItem;
